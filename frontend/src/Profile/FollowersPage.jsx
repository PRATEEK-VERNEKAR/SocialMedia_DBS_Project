import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FollowersPage() {
  const navigate = useNavigate();
  const [followings,setFollowings]=useState([])

  useEffect(() => {
    async function authenticateUser() {
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken);

    //   if (!accessToken) {
    //     return navigate('/login');
    //   }
    
    try {

        const verify=await axios.get("http://localhost:8000/api/users/protectedRoute",{withCredentials:true});
        console.log(verify);

        if(!verify.data.success){
            return navigate('/login');
        }

        const response = await axios.get('http://localhost:8000/api/users/relationship/getAllFollowers',{withCredentials:true});
        console.log(response);

        // if(response.data.length!=0){
        //     const desc=response.data[0].desc;
        //     console.log(desc);
        // }

        setFollowings(response.data)
      } catch (error) {
        console.log(error.message);
        // navigate('/login');
      }
    }

    authenticateUser();
  }, []);


  const convertBufferToDataURL = (buffer) => {
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };


  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] items-center ">
        <h1 className="m-4 text-4xl underline mb-[50px]">Your Followers</h1>
        <div className="flex-grow overflow-auto w-[90%] ">
            {
                followings.map((data,index)=>{
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
      </div>
    </>
  );
}
