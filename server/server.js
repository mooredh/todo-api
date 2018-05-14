require('./../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');
const { authenticate } = require('./middleware/auth');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.post('/todos', authenticate, async(req, res) => {
    try {
        let todo = new Todo({
            text: req.body.text,
            _creator: req.user._id
        })
        let doc = await todo.save();

        res.send(doc)
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/todos', authenticate, async(req, res) => {
    try {
        let todos = await Todo.find({
            _creator: req.user._id
        })
        res.send({
            todos
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/todos/:id', authenticate, async(req, res) => {
    try {
        let _id = req.params.id;
        let _creator = req.user._id;
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send();
        }

        let todo = await Todo.findOne({ _id, _creator });
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (e) {
        res.status(400).send();
    }
})

app.delete('/todos/:id', authenticate, async(req, res) => {
    try {
        let _id = req.params.id;
        let _creator = req.user._id;
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send();
        }
        let todo = await Todo.findOneAndRemove({ _id, _creator });
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (e) {
        res.status(400).send();
    }
});

app.patch('/todos/:id', authenticate, async(req, res) => {
    try {
        let _id = req.params.id;
        let _creator = req.user._id;
        let body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(_id)) {
            res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
        let todo = await Todo.findOneAndUpdate({ _id, _creator }, { $set: body }, { new: true });
        if (!todo) {
            res.status(404).send();
        }

        res.send({
            todo
        });
    } catch (e) {
        res.status(400).send();
    }

});

app.post("/users", async(req, res) => {
    try {
        let body = _.pick(req.body, ['email', 'password']);
        let user = new User(body);
        let doc = await user.save();
        let token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/users/login', async(req, res) => {
    try {
        let body = _.pick(req.body, ['email', 'password']);
        let user = await User.findByCredentials(body.email, body.password);
        let userToken = await user.generateAuthToken();
        res.header('x-auth', userToken).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, async(req, res) => {

    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
})

module.exports = { app };