let userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async function(req,res){
    let user = await userModel.findOne({email: req.body.email});
    if (user)  return res.status(400).json({data : null, message : "Email already registered" , errors : null});
     user = await userModel.findOne({username: req.body.username});
    if (user)  return res.status(400).json({data : null, message : "Username already exists" , errors : null});
    
     user = new userModel({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body. phone,
        address: req.body.address,
        photo: req.body.photo,
        type: req.body.type,
    });
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(user.password,salt);
    user.password = hasedPassword;
   await user.save();
   const token = user.generateAuthToken();
   return res.header('x-auth-token',token).status(200).json({data : user, message : null , errors : null});
}

exports.retrieveAllUsers = async function(req,res){
    let users = await userModel.find();
    if (users)  return res.status(200).json({data : users, message : null , errors : null});
}

exports.retrieveUser = async function(req,res){
    let user = await userModel.findOne({_id : req.user._id});
    if (user)  return res.status(200).json({data : user, message : null , errors : null});
}

/*exports.updateUser = async function(req,res){
    let user = await userModel.findOneAndUpdate({_id : req.user._id},{});
    if (user)  return res.status(200).json({data : user, message : null , errors : null});
}*/



//module.exports = createUser;