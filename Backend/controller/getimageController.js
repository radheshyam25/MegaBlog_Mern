const Imagedetail=require("../model/Imagedetail");
const handlegetimage=async(req,res)=>{
   const  {featuredImage} =req.body;
   if(!featuredImage) return res.sendStatus(404);

   const response=await Imagedetail.findOne({_id:featuredImage}).exec();
   
   res.status(200).json(response);
}
module.exports={handlegetimage};





