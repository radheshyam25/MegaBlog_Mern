const User=require("../model/User");
const jwt=require("jsonwebtoken");

const handleUser=async(req,res)=>{
    const cookies=req.cookies;

    if(!cookies?.jwt) return res.status(401).json("nocookies");

    const refreshtoken=cookies.jwt;
    console.log(refreshtoken);
    const user=await User.findOne({refreshtoken:refreshtoken}).exec();
    if(!user) return res.sendStatus(403);
    console.log(user);

    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_URI,
        (err,decoded)=>{
            if(err){
                return res.sendStatus(403);
            }
            const accessToken=jwt.sign(
                {
                    email:user.email,
                    password:user.password,
                },
                process.env.ACCESS_TOKEN_URI,
                {expiresIn:'60S'},

            );

            res.send({
                "name":user.name,
                "email":user.email,
                "userid":user._id,
                "accesstoken":accessToken
            });

            }

        
    )
}




   

module.exports={handleUser};