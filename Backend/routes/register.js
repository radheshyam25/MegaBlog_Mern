const express=require("express");
const router=express.Router();
const registerController=require('../controller/registerController');

router.route('/').get(registerController.handleNewUser);

module.exports=router;