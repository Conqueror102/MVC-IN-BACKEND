const  taskModel  = require("../../MVC/model/model");
const bcrypt = require("bcrypt")

const handleError = (res, error)=>{
    return res.status(500).json({message:"an error occured", error: error || error.message});
};

const register = async (req, res)=>{
    try{
        const {userName, email, password} = req.body;
        
        if(!password || !email){
            return res.status(400).json({message:"invalid email or password"});
        }
        const hashpassword = await bcrypt.hash(password, 10);

        const createUser = await taskModel.create({userName, email, password:hashpassword, task:[]})
        return res.status(200).json({success:true, data:createUser});
    }catch(error){
        handleError(res, error)
    }
};

const login = async (req, res)=>{
    try{
        const {password, email} = req.body;

        const checkForExist = await taskModel.findOne({email});

        if(!checkForExist ){
            return res.status(404).json({message:"invalid email or password"});
        }

        // compare  password
        const comparePass = await bcrypt.compare( password,checkForExist.password)

        if(!comparePass){
            return res.status(404).json({message:"incorrect password"});
        }
        return res.status(200).json({success:true, data:[checkForExist.userName, checkForExist.email]})
    }catch(error){
        handleError(res, error)
    }
};

const addTask = async (req, res)=>{
    try{
       const userId = req.params.id

       if(!userId){
        return res.status(400).json({message:"user id is required in the URL"})
       }

       const {title, description} = req.body
       if(!title || !description){
        return res.status(400).json({message:"title and description are required"})
       }

    //    ffind the user by id
    const user = await taskModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        //  to add a new task to the user task
        user.task.push({title, description, complete:false})
        await user.save()
        return res.status(201).json({message:"task added successfully",task:user.task})
    }catch(error){
        handleError(res, error)
    }
}

// update task

const updateTask = async (req, res)=>{
    try{
        const {userId, taskId} = req.params;
        const {title, description, complete} = req.body

        if(!title && !description && complete === undefined){
            return res.status(400).json({message:"at least one field is required"})
        }

       const user = await taskModel.findById(userId)
       if(!user){
        return res.status(404).json({message:"user not found"})
       }

    //    find the specific task by id and update
    const task = user.task.id(taskId)
    if(!task){
        return res.status(404).json({message:"task not found"})
    }

    if(title) task.title = title
    if( description) task.description =  description
    if(complete !== undefined)task.complete = complete

    await user.save();
    return res.status(200).json({message:"task update successfully",task})
    }catch(error){
        handleError(res, error)
    }
}

module.exports = {register,login, addTask, updateTask};