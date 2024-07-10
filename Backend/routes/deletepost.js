const express=require("express");
const router=express.Router();
const deletepostController=require("../controller/deletepostController");

router.route('/').post(deletepostController.handledeletepost);

module.exports=router;