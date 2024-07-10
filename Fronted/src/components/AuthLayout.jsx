import React, {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,useLocation} from 'react-router-dom'
import { getcurrentuser } from '../appwrite/backconfig'
import { login } from '../store/authSlice'

export default function Protected({children, authentication = true}) {
    

    const navigate = useNavigate()
    const location=useLocation();
    const dispatch=useDispatch();
    const [loader, setLoader] = useState(true)
    const authStatus=useSelector((state)=>state.auth.status);
    

    useEffect(() => {
        const helper=async()=>{
            const session=await getcurrentuser();
            if(session){
            const userData=session.data;
            if(userData){
                dispatch(login({userData}));
                
                
        
            }
        }
            
        }
        if(!authStatus){
            helper();
        }
        

       if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}