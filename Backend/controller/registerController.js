const User=require('../model/User')
const bcrypt=require('bcryptjs');

const handleNewUser=async(req,res)=>{
  
    const {user,email,pwd}=req.query;

    if(!user || !email || !pwd) return  res.status(400).json({message:"All fields are required"});


    const duplicate=await User.findOne({email:email}).exec();

    if(duplicate) return  res.sendStatus(409);

    try{
    const hashedpwd=await bcrypt.hash(pwd,10);
    const result=await User.create({
        name:user,
        email:email,
        password:hashedpwd
    });
    
    res.status(201).json({$id:result._id,name:result.name});
}
  catch(err){
  }

}
module.exports={handleNewUser};