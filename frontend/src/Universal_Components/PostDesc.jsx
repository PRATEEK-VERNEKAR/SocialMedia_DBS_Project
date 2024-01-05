import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDesc = () => {
  const params = useParams();
  const [postid, setPostid] = useState(params.postid);
  const [postData, setPostData] = useState({ desc: "", createddate: "", like_count: 0, img: { type: "", data: "" }, userid: 0 });
  const [comments, setComments] = useState([{ desc: "", createdat: "", commenteduserid: 1 }]);
  const [user, setUser] = useState({ img: { type: "", data: "" }, name: '', userid: "" });

  useEffect(() => {
    const fetchPostDesc = async () => {
      try {
        axios.defaults.withCredentials = true;
        const postRes = await axios.get(`http://localhost:8000/api/user/posts/post/${postid}`);
        setPostData(postRes.data[0]);

        const commentsRes = await axios.get(`http://localhost:8000/api/users/comments/getPostComments/?postid=${postid}`);
        setComments(commentsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostDesc();
  }, [postid]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const userRes = await axios.post('http://localhost:8000/api/user/posts/getUserByPosts', { postid: postid });
        setUser({ img: userRes.data.img, name: userRes.data.name, userid: userRes.data.id });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [postid]);

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
    <div className='flex-grow overflow-y-auto'>
      <h1 className='text-4xl m-4'>{user.name}</h1>
      
      {user.img ? (
        <img
          src={convertBufferToDataURL(user.img.data)}
          className="object-cover w-full h-[40%]"
          alt="Profile Pic"
          height={20}
        />
      ) : (<></>)}


      <div className='w-[70%] mx-auto border-2 border-red-800 rounded-2xl'>
        {postData.img ? (
          <img
          src={convertBufferToDataURL(postData.img.data)}
          className="w-[100%] h-[40%] object-cover rounded-t-xl"
          alt="Post Pic"
          />
          ) : (<></>)}

        <div className='flex justify-between p-4 bg-white rounded-b-xl'>
          <p className='text-4xl font-bold text-red-900 '>{postData.desc}</p>
          <div>
            <p>Likes :- {postData.like_count}</p>
            <p>{formatDateString(postData.createddate)}</p>
          </div>
        </div>
      </div>

        <br/><hr/><br/><hr/><br/><hr/>

      <div className='w-[90%] mx-auto mt-5'>
        <h1 className='text-2xl'>Comments</h1>
        {comments.map((data, index) => (
          <div key={index} className='flex bg-green-400 border-4 border-dashed border-yellow rounded-3xl m-3 p-3 justify-between'>
            <p>{data.desc}</p>
            <p>{formatDateString(data.createdat)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDesc;
