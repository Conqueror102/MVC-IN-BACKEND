const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
   return res.status(201).json({data: allUsers});
  } catch (err) {
   return res.status(500).json({message: "An error occured", error: err});
  }
}

const getUserById = async (req, res) => {
    try{
        const oneUser = await userModel.findById(req.params.id);

        if(!oneUser){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"this is the user", data:oneUser});
    }catch(err){
        res.status(500).json({message:"internal error", error: err.message})
    }
}

const postUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        
        const ifUserExist = await userModel.findOne({email})
        if(ifUserExist){
            return res.status(401).json({message:"user not found"});
        }
        const createUser = await userModel.create({name, email, password:hashPassword});
        res.status(201).json({message:"user created", data:createUser})
    }catch(err){
        return res.status(500).json({message:"an error occured", error:err.message})
    }
}


module.exports = {getAllUsers, getUserById, postUser};