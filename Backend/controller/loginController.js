const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config()
const handleLogin=async(req,res)=>{
    const {email,pwd}=req.body;

    if(!email || !pwd) return res.status(400).json({message:"Enter Email and password"})

    const founduser=await User.findOne({email:email}).exec();
    if(!founduser) return res.status(401).json({message:"Account not found,please signup to continue"});
    const match=await bcrypt.compare(pwd,founduser.password);
    
    if(!match) return res.status(401).json({message:"password is incorrect"});

    const accessToken=jwt.sign(
        {
            email:email,
            password:pwd,
        },
        process.env.ACCESS_TOKEN_URI,
        {expiresIn:'60s'}
    )
    const refreshtoken=jwt.sign(
        {
            email:email,
            password:pwd,
        },
        process.env.REFRESH_TOKEN_URI,
        {expiresIn:'1d'}
    )
    const result=await User.updateOne({email:founduser.email},{
        $set:{
            refreshtoken:refreshtoken
        },
    });
    
    const founduser1=await User.findOne({email:email}).exec();
    res.cookie('jwt',refreshtoken,{httpOnly:true,secure:true,sameSite:'lax',maxAge:24*60*60*1000});
    res.send({
        
            "name":founduser.name,
            "email":founduser.email,
            "userid":founduser._id,
            "accesstoken":accessToken
        
    });
   // res.cookie('jwt',refreshtoken,{httpOnly:true,path:'/',domain:'localhost',maxAge:3600000});
    
  // res.json({$id:founduser._id,name:founduser.name,refreshtoken:refreshtoken});
    
    
}

module.exports={handleLogin};
