

const cloudinary=require('cloudinary').v2;
require('dotenv').config();
const Imagedetail=require('../model/Imagedetail');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


/*const handleUpload=async (path)=>{
    try{
        if(!path) return null;
    const response=await cloudinary.uploader.upload(path
    )
    const result=await Imagedetail.create({
        imageurl:response.secure_url,
    });


 return result; 
}
catch(err){
    console.log(err);
    
}}*/

const handledelete=async(url)=>{
    if(!url) return null;
    const imagearray=url.split('/');
    console.log(imagearray);
    const image=imagearray[imagearray.length-1];
    const imagename=image.split('.')[0];

    await cloudinary.uploader.destroy(imagename).then(result=>console.log(result));



}

module.exports={handledelete}