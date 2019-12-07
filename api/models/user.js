let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let schema = new mongoose.Schema({
name: {type: String , required : true},
email: {type: String , required : true},
username: {type: String , required : true},
password: {type: String , required : true},
phone: {type: String , required : true},
address: {type: String , required : true},
photo: {type: String , required : true},
userType: {type: Number},
});

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id,username : this.username,email : this.email,
        phone : this.phone,address : this.address,photo : this.photo,
        userType : this.userType},'jwtPrivateKey');
    return token;
}
const user = mongoose.model("user",schema);
module.exports = user;