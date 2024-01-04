import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const PostDesc = () => {
  const params = useParams();
  
  const [postid, setPostid] = useState(params.postid);
  const [postData,setPostData]=useState({desc:"",createddate:"",like_count:0,img:{type:"",data:""},userid:0});
  const [comments,setComments]=useState([{desc:"",createdat:"",commenteduserid:1}])
  const [user,setUser]=useState({img:{type:"",data:""},name:'',userid:""})

  // useEffect(() => {
  //   setPostid(apostid);
  // }, [apostid]);

  useEffect(()=>{
    const fetchPostDesc=async()=>{
      try{

        axios.defaults.withCredentials=true;
        
        const res=await axios.get(`http://localhost:8000/api/user/posts/post/${postid}`);
        console.log(res);
        setPostData(res.data[0]);
        
        
        const newres=await axios.get(`http://localhost:8000/api/users/comments/getPostComments/?postid=${postid}`);
        setComments(newres.data);
        console.log(newres);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchPostDesc();
  },[])

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        axios.defaults.withCredentials=true;
        const res=await axios.post('http://localhost:8000/api/user/posts/getUserByPosts',{postid:postid});
        console.log(res.data);
        setUser({img:res.data.img,name:res.data.name,userid:res.data.id})
      }
      catch(err){
        console.log(err);
      }
    }
    
    fetchUser();
  },[postData])

  const convertBufferToDataURL = (buffer) => {
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };

  return (
    <div className=''>

      <h1>{user.name}</h1>

      {
        user.img? (
           <img
            src={convertBufferToDataURL(user.img.data)}
            className="object-cover"
            alt="Profile Pic"
           />
        ):(<></>)
      }

      {
        postData.img? (
           <img
            src={convertBufferToDataURL(postData.img.data)}
            className="w-full h-full object-cover"
            alt="Post Pic"
           />
        ):(<></>)
      }


      <p>{postData.desc}</p>
      <p>{postData.like_count}</p>
      <p>{postData.createddate}</p>

      {
        comments.map((data,index)=>{
          return (
            <>
              <p>{data.desc}</p>
              <p>{data.createdat}</p>
            </>
          )
        })
      }
    </div>
  )
}

export default PostDesc