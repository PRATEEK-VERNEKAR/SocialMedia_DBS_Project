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
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };

  return (
    <div>
      {
        allUsers.map((data,index)=>{
            return(
                <div className="border-2 border-red-400  rounded-xl w-full ">
                    {data.coverpic && data.coverpic.img && data.coverpic.img.data && (
                        <img
                            src={convertBufferToDataURL(data.coverpic.img.data)}
                            width={500}
                            height={500}
                            className="rounded-t-xl"
                            alt="Cover Pic"
                        />
                    )}          
                    {data.profilepic && data.profilepic.img && data.profilepic.img.data && (
                        <img
                            src={convertBufferToDataURL(data.coverpic.img.data)}
                            width={500}
                            height={500}
                            className="rounded-t-xl"
                            alt="Cover Pic"
                        />
                    )}             
                    <p className="text-left text-2xl  pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">Name :- {data.name}</p>
                    <p className="text-left text-2xl  pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">Username :- {data.username}</p>
                    <p className="text-left text-2xl  pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">City :- {data.city}</p>
                    <p className="text-left text-2xl  pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">Webisite :- {data.website}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default AllUsers;