const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

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
            token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
        }]
    },
    {
        _id: userTwoId,
        email: "two@test.com",
        password: "testpass",
    }
];

const todos = [{
        _id: new ObjectID(),
        text: "First test todo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo",
        completed: true,
        completedAt: 333
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