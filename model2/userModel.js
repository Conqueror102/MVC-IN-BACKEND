const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name:{type:String, lowercase:true,},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true}
});

module.exports = userModel = model("user2", userSchema);
 