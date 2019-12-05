let mongoose = require('mongoose');

let schema = new mongoose.Schema({
name: {type: String , required : true},
email: {type: String , required : true},
username: {type: String , required : true},
password: {type: String , required : true},
phone: {type: String , required : true},
address: {type: String , required : true},
photo: {type: String , required : true},
type: {type: String , required : true},
});

const user = mongoose.model("user",schema);
module.exports = user;