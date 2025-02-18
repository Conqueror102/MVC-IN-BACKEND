const userModel = require("../model2/userModel")
const bcrypt = require("bcrypt")

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
   return res.status(200).json({data: allUsers});
  } catch (err) {
   return res.status(500).json({message: "An error occured", error: err});
  }
}

const createUser = async (req,res)=>{
    try{
        const {name, email, password}= req.body
        const encrypt = await bcrypt.hash(password, 10)

        const checkForExist = await userModel.findOne({email})
        if(checkForExist){
            return res.status(401).json({message:"user already exist", });
        }
        const makeUser = await userModel.create({name, email, password:encrypt});
        res.status(201).json({message:"user created", data:makeUser})
    }catch(err){
        return res.status(500).json({status:false, error:err.message})
    }
};

const getOneUser = async (req,res)=>{
    try{
        const findOne =  await userModel.findById(req.params.id);
        if(!findOne){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({message:"user founded",data:findOne})
    }catch(err){
        return res.status(500).json({status:false, error:err.message})
    }
};

const updateUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body
        const update = await userModel.findByIdAndUpdate(req.params.id,{name, email, password},{new:true});
        if(!update){
            return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json({message:"user updated", data:update});
    }catch(err){
        return res.status(500).json({message:"internal server err", error:err.message});
    }
};

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        const login = await userModel.findOne({email})
        if (!login || !login.password === password){
            return res.status(401).json({message:" invalid email or password"});
        }
        // check password
        const matchPassword = await bcrypt.compare(password,login.password);
        if(!matchPassword){
            return res.status(401).json({message:'invalid username or password'})
        }
        return res.status(200).json({status:true, data:[login.email, login.name] });

    }catch(err){
        return res.status(500).json({message:"internal server err", error:err.message});
    }
};

const deleteUser = async (req,res)=>{
    try{
        const deleteTheUser = await userModel.findByIdAndDelete(req.params.id);
        if(!deleteTheUser){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({message:"user deleted"})
    }catch(err){
        return res.status(500).json({message:"internal server err", error:err.message});
    }
}



module.exports = {getAllUsers, createUser, getOneUser, updateUser, loginUser, deleteUser}