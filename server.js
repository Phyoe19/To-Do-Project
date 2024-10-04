import express from "express"
import dotenv from "dotenv"
import connectToDB from "./database/db.js"
import TodoRouter from "./router/TodoRouter.js"
import AuthRouter from "./router/AuthRouter.js"
import UserRouter from "./router/UserRouter.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import AuthMiddlewares from "./middlewares/AuthMiddlewares.js"

dotenv.config();
const app = express()


//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

connectToDB();

// todo api
app.get('/',async (req, res) => {
    res.redirect('/todos');
})
app.use("/todos",AuthMiddlewares,TodoRouter);

app.use("/auth",AuthRouter);

app.use("/user",UserRouter);

app.listen(3000, () => {
    console.log("server listening on port 3000")
});