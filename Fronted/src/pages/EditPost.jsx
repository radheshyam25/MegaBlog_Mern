import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import { useNavigate,  useParams } from 'react-router-dom';
import { getpost } from '../appwrite/backconfig';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
        getpost(slug).then((post)=>{
            if(post){
                setPosts(post.data);
            
            }
            else navigate("/");
        });
    }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost