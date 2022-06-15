import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();
const userController = new UserController();

//create user
userRouter.post("/create", userController.createUser);
