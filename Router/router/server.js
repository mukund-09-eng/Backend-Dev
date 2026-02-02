import express from "express"
import userRoute from "./userRouter.js"
import registerRouter from "./registerRoute.js"

const port = 3000;

const app = express();

app.use("/api",userRoute)
app.use("/aqi",registerRouter)
// app.get("/",(req,res)=>{
//     res.send("server is running")
// })

// app.get("user",(req,res)=>{
//     res.send("user route")
// })

app.listen(port,()=>{
    console.log("server is running on port"+port);
})