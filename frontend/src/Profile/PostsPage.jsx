import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostsPage() {
  const navigate = useNavigate();
  const [allPosts,setAllPosts]=useState([{"desc":"","img":""}])

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

        const response = await axios.get('http://localhost:8000/api/user/post',{withCredentials:true});
        console.log(response);

        // if(response.data.length!=0){
        //     const desc=response.data[0].desc;
        //     console.log(desc);
        // }

        setAllPosts(response.data)
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
      <div className="flex flex-col h-[100%]">
        <h1 className="m-4 text-4xl underline mb-[50px]">Your Photos</h1>
        <div className="flex-grow overflow-auto">
            {
                allPosts.map((data,index)=>{
                    return(
                        <div className="border-2 border-red-400 m-6 rounded-xl">
                            <img src={convertBufferToDataURL(data.img.data)} width={500} height={500} className="rounded-t-xl"></img>
                            <p className="text-left text-2xl rounded-b-xl pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">{data.desc}</p>
                        </div>
                    )
                })
            }
        </div>
      </div>

    </>
  );
}
