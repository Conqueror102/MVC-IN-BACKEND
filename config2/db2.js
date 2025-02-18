const mongoose = require("mongoose")
require("dotenv/config")

const {MONGODB_URL} = process.env

const connectDb = async ()=>{
    try{
        await
        mongoose.connect(MONGODB_URL?.toString())
        console.log("mongodb connected")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb