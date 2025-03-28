const userModel = require('../model/user.model');
const jwt =  require('json');
class userService{
    static async registerUser (email,password){
        try{
            const createUser = new userModel({email,password});
            return await createUser.save();

        }catch(err){
            throw err;
        }
    }

    static async checkUser(email){
        try{
            return await userModel(email);
        }catch(err){
            throw err;

        }
    }

    static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    }

}
module.exports = userService;