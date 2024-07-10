const express=require("express");
const router=express.Router();
const updatepostController=require("../controller/updatepostController");

router.route('/').post(updatepostController.handleUpdatePost);

module.exports=router;