const Post=require('../model/Post');

const handleNewPost=async(req,res)=>{
    console.log(req.body)
    const {title,slug,content,featuredImage,status,userid}=req.body;

    if(!userid || !title || !slug) return res.status(402).json({message:"Invalid answer"});
    try{

    
    const response=await Post.create({
        userid,
        title,
        slug,
        featuredImage,
        content,
        status
    });

    res.status(200).json(response);

}
catch(err){
    res.sendStatus(400);
}
}

module.exports={handleNewPost};