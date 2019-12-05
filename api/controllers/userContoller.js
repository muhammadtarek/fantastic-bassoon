let userModel = require('../models/user');

exports.createUser = async function(req,res){
    let user = new userModel({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        photo: req.body.photo,
        type: req.body.type,
    });
   await user.save();
   return res.status(200).json({data : user, message : null , errors : null});
}

//module.exports = createUser;