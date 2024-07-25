import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app =express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(cookieParser())
// router importing

// import userRouter from './route/user.routes.js'
import userRouter from './route/user.routes.js'

app.use("/api/v1/users", userRouter)
export {app}