const Post=require("../model/Post");

const handlemyposts=async(req,res)=>{
    const {userid}=req.body;
   if(!userid) res.sendStatus(401);
    

    const posts=await Post.find({userid:userid}).exec();
    return res.status(202).send(posts);
}
module.exports={handlemyposts};