const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/Todo");
const { User } = require("./../server/models/User");

Todo.remove({}).then((result) => {
    console.log(result);
})

Todo.findByIdAndRemove(new ObjectID("5ae0d7309871943110277f95")).then(todo => {
    console.log(todo);
});