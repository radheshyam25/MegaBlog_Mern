const User=require('../model/User');

const handleLogout=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.status(401).json({"message": req.cookies});
    const refreshtoken=cookies.jwt;

    const founduser=await User.findOne({refreshtoken:refreshtoken}).exec();
    if(!founduser){
        res.clearCookie('jwt',{httpOnly:false});
        return res.sendStatus(204);
    }
    await User.updateOne({refreshtoken:refreshtoken},{
        $set:{
            refreshtoken:''
        }
    });
    res.clearCookie('jwt',{httpOnly:false})
    res.status(202).json({message:"User are logged out"});
}

module.exports={handleLogout};
