const express=require("express");
const router=express.Router();

const currentuserController=require("../controller/currentuserController");

router.route('/').get(currentuserController.handleUser);

module.exports=router;