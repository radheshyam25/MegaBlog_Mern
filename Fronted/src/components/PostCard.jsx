import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getFilePreview } from '../appwrite/backconfig';
import { useState } from 'react';

function PostCard({_id, title, featuredImage}) {
  const [image,setimage]=useState(null);
  useEffect(()=>{
    getFilePreview(featuredImage).then(response=>setimage(response))
  },[featuredImage])
    
  return (
    <Link to={`/post/${_id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={image} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard