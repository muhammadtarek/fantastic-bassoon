let userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async function(req,res){
    let user = await userModel.findOne({email: req.body.email});
    if (!user)  return res.status(400).json({data : null, message : "Invalid email or password" , errors : null});

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if (!validPassword)  return res.status(400).json({data : null, message : "Invalid email or password" , errors : null});
    
    const token = user.generateAuthToken();
   return res.header('x-auth-token',token).status(200).json({data : user, message : null , errors : null});
}