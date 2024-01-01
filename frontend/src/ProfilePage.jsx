import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
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
      <div>
        <h1>Your Photos</h1>
        {
            allPosts.map((data,index)=>{
                return(
                    <>
                        <img src={convertBufferToDataURL(data.img.data)} width={500} height={500}></img>
                        {data.desc}
                    </>
                )
            })
        }
      </div>
      <div>
        <h1>Your Followers</h1>
      </div>
    </>
  );
}
