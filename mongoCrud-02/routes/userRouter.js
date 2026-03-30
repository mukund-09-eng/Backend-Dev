import express from "express";
import {getAll} from "../controllers/userController.js";

const router = express.Router();

router.get("/user",getAll);

export default router;
