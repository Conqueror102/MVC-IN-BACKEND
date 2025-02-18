const express = require("express")
const { createUser, getOneUser, updateUser, loginUser, deleteUser, getAllUsers,  } = require("../controller2/userController")

const mainRouter = express.Router()

mainRouter.get("/get-all-user", getAllUsers);
mainRouter.post("/post", createUser );
mainRouter.get("/getOne/:id", getOneUser);
mainRouter.patch("/updateUser/:id", updateUser);
mainRouter.post("/login", loginUser);
mainRouter.delete("/deleteUser/:id", deleteUser );

module.exports = mainRouter;

