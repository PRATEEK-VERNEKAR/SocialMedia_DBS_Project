import axios from "axios"
import { useState } from "react"
import Cookies from 'js-cookie';

export default function RegisterPage(){
    const [user,setUser]=useState({"username":"","password":""});

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:8000/api/users/login",user);
            console.log(res.data);
            setUser({"username":"","password":""});

            console.log(res.status);

            if(res.status===200){
                Cookies.set("accessToken",res.data.token,{expires:30,path:'/'});
            }
        }
        catch(err){
            console.error('Error during Login:', err);
        }
    }

    
    return(
      <div className="bg-red-100 h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl py-5">Socio King</h1>
        <p>Feel The Friends Vibe</p>
        <form className="flex flex-col mt-5 gap-4 w-[90%] items-center border-2 border-black">
          <h2>Login Here!!</h2>
          <input type="text" id="username" name="username" onChange={handleChange} value={user.username} placeholder="username"></input>
          <input type="password" id="password" name="password" onChange={handleChange} value={user.password} placeholder="password"></input>
          <button onClick={handleSubmit} className="bg-blue-200 p-2 my-2">Login</button>
        </form>
      </div>
    )
  }