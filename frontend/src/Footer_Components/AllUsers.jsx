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
        <div key={index} className="flex border-2 border-gradient-red rounded-xl mb-4 p-4 h-[140px] overflow-hidden">
          <div className="flex-shrink-0 ">
            <img
              src={convertBufferToDataURL(data.profilepic?.data)}
              className="rounded-full w-24 h-24 object-cover border-2 border-gradient-blue mx-auto"
              alt="Profile Pic"
            />
          </div>
          <div className="flex-grow pl-4 ">
            <div className="flex flex-col items-start  mb-1">
              <p className="text-3xl text-green-800 font-bold overflow-hidden whitespace-nowrap">
                {data.name}
              </p>
              <p className="ml-2 text-md font-bold text-blue-900">
                @{data.username}
              </p>
            </div>
            <p className="text-sm mb-1 text-right">
              City:<span className="font-bold"> {data.city}</span>
            </p>
            <p className="text-sm mb-1 text-right">
              Website : <span className="font-bold"> {data.website}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllUsers;