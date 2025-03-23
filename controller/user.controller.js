const userService = require('../services/user.services');

exports.register = async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        const successRegister = await userService.registerUser(email,password);
        res.json({status:true,success:"User registration successfull"})
    }catch(err){
        throw err;
    }
}