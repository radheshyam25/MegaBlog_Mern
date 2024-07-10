const  Post=require("../model/Post");

const handleposts=async(req,res)=>{
    const response=await Post.find({}).exec();

    
    res.status(202).json(response);
    

}

module.exports={handleposts};