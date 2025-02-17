const express = require("express");
const { getAllUsers, getUserById, postUser, } = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/post-user", postUser)

module.exports = userRouter;
