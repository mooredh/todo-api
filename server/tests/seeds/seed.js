const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const { Todo } = require('./../../models/Todo');
const { User } = require('./../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
        _id: userOneId,
        email: "one@test.com",
        password: "testpass",
        tokens: [{
            access: "auth",
            token: jwt.sign({ _id: userOneId, access: "auth" }, secret).toString()
        }]
    },
    {
        _id: userTwoId,
        email: "two@test.com",
        password: "testpass",
        tokens: [{
            access: "auth",
            token: jwt.sign({ _id: userTwoId, access: "auth" }, secret).toString()
        }]
    }
];

const todos = [{
        _id: new ObjectID(),
        text: "First test todo",
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: "Second test todo",
        completed: true,
        completedAt: 333,
        _creator: userTwoId
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
        done();
    });
};

const populateUsers = function(done) {
    this.timeout(5000);
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done())
}

module.exports = { todos, populateTodos, users, populateUsers }