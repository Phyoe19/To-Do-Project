import express from "express"
import dotenv from "dotenv"
import connectToDB from "./database/db.js"
import TodoRouter from "./router/TodoRouter.js"
import AuthRouter from "./router/AuthRouter.js"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express()


//middleware
app.use(express.json())
app.use(cookieParser())

connectToDB();

// todo api
app.get('/',async (req, res) => {
    res.redirect('/todos');
})
app.use(TodoRouter);

app.use( AuthRouter);


app.listen(3000, () => {
    console.log("server listening on port 3000")
});