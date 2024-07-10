const express=require("express");
const router=express.Router();
const getpostController=require("../controller/getpostController");

router.route('/').post(getpostController.handlegetpost);

module.exports=router;