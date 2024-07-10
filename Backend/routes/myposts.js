const express=require("express");

const router=express.Router();
const mypostsController=require("../controller/mypostsController");

router.route('/').post(mypostsController.handlemyposts);

module.exports=router;