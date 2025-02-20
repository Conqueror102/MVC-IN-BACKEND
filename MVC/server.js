const express = require("express");
require("dotenv/config");
const database = require("../MVC/config/db");
const routes  = require("./routes/routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

database();


app.listen(process.env.PORT, ()=>{
    console.log(new Date().toLocaleDateString(), process.env.PORT);
})