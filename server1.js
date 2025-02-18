const express = require("express")
const app = express()
const dataBase = require("./config2/db2")
const mainRouter = require("./routes2/userRoutes")
require("dotenv/config")

const { PORT } = process.env
const port = PORT
dataBase()
app.use(express.json())
app.use("/api", mainRouter)

app.listen(port,()=>{
    console.log(new Date().toLocaleDateString(),port)
})

