const mongoose = require('mongoose');
mongoose
    .connect("mongodb://127.0.0.1:27017/todo_database")
    .then( ()=> {
        console.log("DB Connected!");
    })
    .catch( e => {
        console.log("Internal Server error!" , e);
    })

const todoSchema = new mongoose.Schema({
    id : Number,
    task : String
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;