import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSelector } from 'react-redux';
import { myposts } from '../appwrite/backconfig';

function AllPosts() {
    const axiosPrivate=useAxiosPrivate();
    const userData=useSelector((state)=>state.auth.userData);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        
        myposts(userData.userid,axiosPrivate).then((posts)=>{
            if(posts){
                setPosts(posts.data);
            }
        })
        
    }, [])
    
    
  return posts.length!=0?(
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
  ):(<div className="w-full py-8 mt-4 text-center">
      <Container>
       <div className="flex flex-wrap">
          <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                  No posts yet
              </h1>
          </div>
      </div>
   </Container>
 </div>)
}

export default AllPosts
