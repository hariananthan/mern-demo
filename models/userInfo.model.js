var mongoose = require('mongoose');

var userInfoSchema = mongoose.Schema({
firstName : String,
lastName : String,
email : String ,
password : String
},
{
    timestamps:true
})

module.exports = mongoose.model('userInfo',userInfoSchema,'userInfo')