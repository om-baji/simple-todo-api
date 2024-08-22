const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./db/db');

const app = express();

app.use(express.json());

app.get('/todo',async (req,res) => {
    const n = Math.floor(Math.random() * 100) + 1;
    try {
        const todo = await Todo.findOne({id : n})
        res.json({
            todo
        })
    } catch (e){
        res.status(403).json({
            msg : e
        })
    }
})

app.listen(9000, ()=>{
    console.log("server running")
})