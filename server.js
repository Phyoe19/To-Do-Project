import express from "express"
import dotenv from "dotenv"
import connectToDB from "./database/db.js"
import TodoRouter from "./router/TodoRouter.js"
import UserRouter from "./router/UserRouter.js"


dotenv.config();
const app = express()


//middleware
app.use(express.json())

connectToDB();

// todo api
app.get('/',async (req, res) => {
    res.redirect('/todos');
})
app.use(TodoRouter);

app.use('/user', UserRouter);


app.listen(3000, () => {
    console.log("server listening on port 3000")
});