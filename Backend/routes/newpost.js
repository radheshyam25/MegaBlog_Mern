const express=require('express');
const router=express.Router();
const newpostController=require('../controller/newpostController');

router.route('/').post(newpostController.handleNewPost);

module.exports=router;