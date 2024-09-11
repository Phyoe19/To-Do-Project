import express from "express"
import dotenv from "dotenv"
import connectToDB from "./database/db.js"
import { Todo } from "./models/todo.js";
dotenv.config();
const app = express()


//middleware
app.use(express.json())

connectToDB();

// todo api
app.get("/todos", async (req, res) => {
    try {
        const result = await Todo.find();
        res.send({
            success: true,
            message: "Todo lists Success",
            data: result,

        });
    } catch (error) {
        res.send({
            success: false,
            message: "Todo lists Failed",
            data: result,

        });
    }

})

//createtodos
app.post("/create-todo", async (req, res) => {
    const todos = req.body
    try {
        const result = await Todo.create(todos)
        res.send({
            success: true,
            message: "Todo Create Success",
            data: result,

        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed Todo Created ",
            data: result,
        })
        
    }
})

//retrieve
app.get("/:todoId", async (req, res) => {
    const todoId = req.params.todoId
    try {
        const result = await Todo.findById(todoId)
        res.send({
            success: true,
            message: "Retrieved Todo is success",
            data: result,
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Retrieved Todo is Failed",
            data: result,
        })
    }
})

//update
app.patch("/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodo = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true,});
        res.send({
            success: true,
            message: "Updated Todo success",
            data: result,
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to Updated Todo",
            data: result,
        })

        
    }

})


//delete
app.delete("/delete/:todoId", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        res.send({
            success: true,
            message: "Deleted Todo success",
            data: null,

        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to Deleted Todo",
            data: null,

        })
        
    }
})


app.listen(3000, () => {
    console.log("server listening on port 3000")
});