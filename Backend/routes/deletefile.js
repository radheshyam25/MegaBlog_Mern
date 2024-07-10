const express=require("express");
const router=express.Router();

const delelefileController=require("../controller/deletefileController");

router.route('/').post(delelefileController.handlefile);

module.exports=router;