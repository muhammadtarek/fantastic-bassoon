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
isAdmin: {type: Boolean , required : false},
});

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id,username : this.username,isAdmin : this.isAdmin},'jwtPrivateKey');
    return token;
}
const user = mongoose.model("user",schema);
module.exports = user;