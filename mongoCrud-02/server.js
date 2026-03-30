import connectDb from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/userRouter.js";


dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api",userRouter);

app.listen(port,()=>{
    console.log("Server is running",port);
    
})