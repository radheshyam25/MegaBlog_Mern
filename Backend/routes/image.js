const express=require('express');
const multer=require('multer');
const router=express.Router();
const uploadStorage=require('../controller/multerstorage');
const cloudinary=require('../utilities/cloudinary');

router.route('/').post(uploadStorage.single("file"),async(req,res)=>{ const resw=await cloudinary.handleUpload(`./files/${req.file.originalname}`);
   res.json({$id:resw._id});
  });

module.exports=router;