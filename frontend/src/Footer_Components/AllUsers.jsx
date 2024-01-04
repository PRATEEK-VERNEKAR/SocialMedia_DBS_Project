import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllUsers = () => {
  const [allUsers,setAllUsers]=useState([]);
  useEffect(()=>{
    const getAllUsers=async()=>{

      try{
        axios.defaults.withCredentials=true;
        const res=await axios.get("http://localhost:8000/api/users/getAllUsers");
        console.log(  Object.values(res.data));
        setAllUsers(Object.values(res.data) || []);
      }
      catch(err){
        console.log(err);
      }
    }

    getAllUsers();
    
  },[])

  const convertBufferToDataURL = (buffer) => {
    if (!buffer) {
      // Default image if undefined
      return 'https://via.placeholder.com/150';
    }

    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };


  return (
    <div className="flex-grow overflow-y-auto">
      <h1 className="text-4xl font-bold mb-8">Find Your Buddies</h1>
      {allUsers.map((data, index) => (
        <div key={index} className="flex border-2 border-gradient-red rounded-xl mb-4 p-4">
          <div className="flex-shrink-0">
            <img
              src={convertBufferToDataURL(data.profilepic?.img?.data)}
              className="rounded-full w-16 h-16 object-cover border-2 border-gradient-blue mx-auto"
              alt="Profile Pic"
            />
          </div>
          <div className="flex-grow pl-4">
            <div className="flex items-center mb-1">
              <p className="text-lg text-blue-800 font-bold">
                {data.name}
              </p>
              <p className="text-sm ml-2 text-blue-500">
                {data.username}
              </p>
            </div>
            <p className="text-sm mb-1">
              <span className="font-bold">City:</span> {data.city}
            </p>
            <p className="text-sm mb-1">
              <span className="font-bold">Website:</span> {data.website}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllUsers;