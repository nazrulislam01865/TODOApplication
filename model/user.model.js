const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const { Schema }= mongoose;

const userSchema =  new Schema({
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', async function() {
    try{
        var user = this;
        const salt = await(bcrypt.genSalt(12));
        const hashPass = await bcrypt.hash(user.password,salt);
        user.password = hashPass;

    }catch(err){
        throw err;
    }
    
});

userSchema.method.comparePass = async function(userPassword){
    try{
        const isMatched = await bcrypt.compare(userPassword,this.password);
        return isMatched;
    }catch(err){
        throw err;
    }

}

const userModel = db.model('user',userSchema);

module.exports = userModel;