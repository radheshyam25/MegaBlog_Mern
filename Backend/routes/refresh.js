const express=require('express');
const router=express.Router();
const refreshtokenController=require('../controller/refreshtokenController');

router.get('/',refreshtokenController.handleRefreshToken);

module.exports=router;