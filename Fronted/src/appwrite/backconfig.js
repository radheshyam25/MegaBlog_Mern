import axios from "../api/axios";



const createpost=async({title, slug, content, featuredImage, status, userid})=>{
    try{
        return await axios.post('/newpost',{
            
                title,
                slug,
                content,
                featuredImage,
                status,
                userid,
            
        }).then(response=>response);
    }
    catch(err){
        throw err;
    }

}

const updatePost=async(_id,{title,slug,content,featuredImage, status})=>{
    try{
        return axios.post("/update",{
            _id,
            title,
            slug,
            content,
            featuredImage,
            status
        }).then(response=>response);
    }
    catch(err){
        throw err;
    }
}
const uploadfile=async(File)=>{
    const formData=new FormData();
    formData.append('file',File);
    try{
        return await axios.post('/upload',formData).then(response=>response.data);
    }
    catch(err){
       throw err; 
    }
}

const getpost=async(slug)=>{
    try{
        return await axios.post('/getpost',{slug}).then(response=>response);
    }
    catch(err){
        throw err;
    }
}

const getFilePreview=async(featuredImage)=>{
    try{
        const response=await axios.post("/getimage",{featuredImage}).then(response=>response.data.imageurl);
        
        return response;
    }
    catch(err){
        throw err;
    }

}

const myposts=async(userid,axiosPrivate)=>{
    try{
        return await axiosPrivate.post("/myposts",{
                userid
        }
        ).then(response=>response);
    }
    catch(err){
        throw err;
    }
}

const getposts=async()=>{
    try{
        return await axios.get("/allposts").then(response=>response);
    }
    catch(err){
        throw err;
    }
}

const getcurrentuser=async()=>{
    try{
        const result=await axios.get("/getuser",{
            withCredentials:true
        }).then(response=>response)
        .catch((err)=>{
            if(err.response.status==401){
                return null;
            }
        })
        return result;
    }
    catch(err){
        throw err;
    }
}

const deletePost=async(_id)=>{
    try{
        return await axios.post("/deletepost",{_id}).then(response=>response);
    }
    catch(err){
        throw err;
    }
}

const deleteFile=async(featuredImage)=>{
    try{
        return await axios.post("/deletefile",{featuredImage}).then(response=>response);
    }
    catch(err){
        throw err;
    }
}



export {createpost,uploadfile,getpost,getFilePreview,myposts,getposts,getcurrentuser,deleteFile,deletePost,updatePost};