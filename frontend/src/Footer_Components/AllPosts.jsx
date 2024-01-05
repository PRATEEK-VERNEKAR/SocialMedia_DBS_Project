import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [allPosts,setAllPosts]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    const getAllUsers=async()=>{

      try{
        axios.defaults.withCredentials=true;
        const res=await axios.get("http://localhost:8000/api/user/posts/allPosts");
        console.log(  Object.values(res.data));
        setAllPosts(Object.values(res.data) || []);
      }
      catch(err){
        console.log(err);
      }
    }

    getAllUsers();
    
  },[])

  const goToPost=(postid)=>{
    try{
      navigate(`/postDesc/${postid}`)
    }
    catch(err){
      console.log(err);
    }
  }


  const convertBufferToDataURL = (buffer) => {
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };

  const formatDateString = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  
  return (
    <div className='h-full  overflow-y-auto overflow-x-hidden grid grid-cols-2 w-full items-start justify-start'>
      {
      allPosts.map((post, index) => {
        return (
            <div onClick={()=>{goToPost(post.postid)}} className="border-2 border-red-400 m-2 rounded-xl overflow-hidden">
                {post.img && (
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <img
                            src={convertBufferToDataURL(post.img.data)}
                            className="w-full h-full object-cover"
                            alt="Post Pic"
                        />
                    </div>
                )}
                <div className="p-4 bg-gradient-to-r text-black from-yellow-500 via-orange-200 via-green-500 to-blue-500">
                    <p className="text-left text-sm">{post.desc}</p>
                    <p className="text-left text-sm mb-2">{formatDateString(post.createddate)}</p>
                </div>
            </div>
      );
      })
      }
    </div>
  )
}

export default AllPosts;