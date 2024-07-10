const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../model/User');
const handleRefreshToken=async (req,res)=>{
    const cookies=req.cookies;
    
    if(!cookies?.jwt) return res.status(401).json({mess:"All are required"});

    const refreshtoken=cookies.jwt;

    const founduser=await User.findOne({refreshtoken:refreshtoken}).exec();
    if(!founduser) return res.sendStatus(403);
    
    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_URI,
        (err,decoded)=>{
            if(err || founduser.email!== decoded.email )
                return res.sendStatus(403);
            const accessToken=jwt.sign(
                {
                    email:founduser.email,
                    password:founduser.password,
                },
                process.env.ACCESS_TOKEN_URI,
                {expiresIn:'60s'}
            );
            res.json({accessToken});
        }
    );
}

module.exports={handleRefreshToken};