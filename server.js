const express = require('express');
require("dotenv/config")
const dataBase = require('./config/db');
const userRouter = require('./routes/userRoutes');

const {PORT} = process.env;

const port = PORT
const app = express();
dataBase()

app.use(express.json())
app.use("/api",userRouter)


app.listen(port,()=>{
    console.log(new Date().toLocaleDateString(),port)
})

