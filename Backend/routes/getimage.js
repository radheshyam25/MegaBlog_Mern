const express=require("express");
const router=express.Router();
const getimageController=require("../controller/getimageController");

router.route('/').post(getimageController.handlegetimage);

module.exports=router;