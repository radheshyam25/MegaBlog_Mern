const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const fileupload=new Schema({
    
    imageurl:String
})

module.exports=mongoose.model('Imagedetail',fileupload);