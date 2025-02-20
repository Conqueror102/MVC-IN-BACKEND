const { Router } = require("express");
const { register, login, addTask, updateTask } = require("../controller/controller");

const routers = Router();

routers.post("/auth", register);
routers.post("/login", login);
routers.post("/create_task/:id", addTask);
routers.patch("/updatet_task/:userId/:taskId", updateTask);

module.exports= routers;
