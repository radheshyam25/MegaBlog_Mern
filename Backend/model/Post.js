const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postdetail=new Schema({
    userid:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    content:String,
    featuredImage:{
        type:String,
        required:true
    },
    status:String,
});

module.exports=mongoose.model('Post',postdetail);