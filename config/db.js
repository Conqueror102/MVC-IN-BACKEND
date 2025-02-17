const mongoose = require('mongoose');
require("dotenv/config")

const {MONGODB_URL} = process.env;

const  dataBase = async()=>{
    try{
        await mongoose.connect(MONGODB_URL?.toString())
        console.log("Connected to the database")
    }catch(err){
        console.log("an error occured",err)
    }
}

module.exports = dataBase