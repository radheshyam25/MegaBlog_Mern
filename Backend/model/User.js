const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userschema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshtoken:String

});
module.exports=mongoose.model('User',userschema);