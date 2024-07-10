const Post=require("../model/Post");

const handlegetpost=async(req,res)=>{
    const {slug}=req.body;
    if(!slug) res.sendStatus(404);
    const post=await Post.findOne({_id:slug}).exec();
    res.status(200).json(post);

}

module.exports={handlegetpost};