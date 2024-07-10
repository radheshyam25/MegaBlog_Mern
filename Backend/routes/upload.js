const multer=require("multer");
const fileUpload=multer();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const express=require("express");
const router=express.Router();
const Imagedetail=require("../model/Imagedetail")

router.route('/').post(fileUpload.single('file'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let response = await streamUpload(req);
        const result=await Imagedetail.create({
            imageurl:response.secure_url,
        });
        console.log(result);
        res.json({$id:result._id})
    }

    upload(req);
});

module.exports=router;

