const Post=require("../model/Post");

const handleUpdatePost=async(req,res)=>{
    console.log(req.body);
    const {_id}=req.body;
    const {title,slug,content,featuredImage,status}=req.body;

    const result=await Post.updateOne({_id:_id},{
        $set:{
            title:title,
            slug:slug,
            content:content,
            featuredImage:featuredImage,
            status:status
        }
    });
    const user=await Post.findOne({_id:_id}).exec();
    res.status(202).json(user);
}

module.exports={handleUpdatePost};
