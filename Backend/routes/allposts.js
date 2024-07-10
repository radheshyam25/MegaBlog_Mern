const express=require("express");
const router=express.Router();
const allpostsController=require("../controller/allpostsController");

router.route('/').get(allpostsController.handleposts);

module.exports=router;