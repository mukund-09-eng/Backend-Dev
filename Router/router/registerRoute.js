import express from "express"

const router = express.Router();

router.get("/login",(res,req)=>{
    res.send("login route")
})

router.get("/signup",(res,req)=>{
    res.send("sign up route")
})

export default router;