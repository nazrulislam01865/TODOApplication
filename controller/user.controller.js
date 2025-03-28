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
exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user =await userService.checkUser(email);

        if(!user){
            throw new Error('User not exits');
        }
        const isMatched = await user.comparePass(password);
        if(!isMatched){
            throw new Error('Invalid password');
        }

        let tokenData = { _id: user._id, email: user.email };
        const token = await userService.generateToken(tokenData,"secretKey",'1h');
        res.status(200).json({status:true,token:token});
    }catch(err){
        throw err;
    }
}