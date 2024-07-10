const Post=require("../model/Post");

const handledeletepost=async(req,res)=>{
    const {_id}=req.body;

    if(!_id) return res.status(402).json("no post id");

    const result= await Post.deleteOne({_id:_id}).exec();
    console.log(result);
    res.status(202).json("success");

}

module.exports={handledeletepost};