import React, {useEffect, useState} from 'react'
import {Container, PostCard} from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getposts,getcurrentuser } from '../appwrite/backconfig';
import { login } from '../store/authSlice';

function Home() {
    const [posts, setPosts] = useState([])
    const dispatch=useDispatch();
    const [auth,setauth]=useState(useSelector((state)=>state.auth.status));
    const user=useSelector((state)=>state.auth.status);
    
    

    useEffect(() => {
        const helper=async()=>{
            const session=await getcurrentuser();
            if(session){
            const userData=session.data;
            if(userData){
                setauth(true);
                dispatch(login({userData}));
                
            }
            }
        }
        if(!auth){
            helper();
        }
        
        getposts().then((posts)=>{
            if(posts){
                setPosts(posts.data);
            }
        })
        
    }, [])
  
    if (posts.length === 0 || !auth || !user) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                    
                      
                        
                        <div key={post._id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                      
                        
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
