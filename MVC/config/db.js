const { connect } = require("mongoose")

const {MONGODB_URL} = process.env

const connectdb = async()=>{
    try{
        await connect(MONGODB_URL.toString());
        console.log("Connected to the database")
    }catch(error){
        console.log("An error occured", error)
        process.exit(1)
    }
}

module.exports = connectdb;