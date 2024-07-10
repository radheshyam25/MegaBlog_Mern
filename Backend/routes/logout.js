const express=require('express');
const router=express.Router();
const loginController=require('../controller/logoutController');

router.route('/').get(loginController.handleLogout);

module.exports=router;
