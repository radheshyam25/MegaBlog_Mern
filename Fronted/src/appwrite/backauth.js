import axios from "../api/axios";

const createaccount=async({email,password,name})=>{
    try{
    return  await axios.get('/signin',{
        params:{
        "user":name,
        "email":email,
        "pwd":password,
        
}})
    .then(response=>Login({email,password}));
}

catch(err){
    throw err;
}}

const Login=async({email,password})=>{
    try{
        return await axios.post('/login',{
            "email":email,
            "pwd":password
        },{
            withCredentials:true,
        })
        .then(response=> response);
    }
    catch(err){
        
        throw err;
    }
}

const refresh=async()=>{
    try{
        return await axios.get('/refresh',{
            withCredentials: true,
        }
        )
    }
    catch(err){
        throw err;
    }
}

const Logout=async()=>{
    try{
        return await axios.get('/logout',{
            withCredentials:true,
        })
    }
    catch (err){
        throw err;
    }
}
        
   
    


export  {createaccount,Login,refresh,Logout};
