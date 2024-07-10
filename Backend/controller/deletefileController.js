const Imagedetail=require("../model/Imagedetail");
const cloudinary=require("../utilities/cloudinary");

const handlefile=async(req,res)=>{
    const {featuredImage}=req.body;

    if(!featuredImage) return res.status(402).json("no file id");

    const image=await Imagedetail.findOne({_id:featuredImage}).exec();
    await cloudinary.handledelete(image.imageurl);
    await Imagedetail.deleteOne({_id:featuredImage});
    res.sendStatus(202);

}

module.exports={handlefile};
