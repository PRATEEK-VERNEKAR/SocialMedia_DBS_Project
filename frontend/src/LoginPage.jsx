import axios from "axios"
import { useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const navigate=useNavigate();
    const [user,setUser]=useState({"username":"","password":""});

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:8000/api/users/auth/login",user);
            console.log(res.data);
            setUser({"username":"","password":""});

            console.log(res.status);

            if(res.status===200){
                Cookies.set("accessToken",res.data.token,{expires:30,path:'/'});
                navigate('/profile')
            }
        }
        catch(err){
            console.error('Error during Login:', err);
        }
    }

    
    return(
      <div className="w-full flex flex-col justify-center items-center">
        <form className="flex flex-col mt-5 gap-4 w-[90%] items-center ">
          <h2 className='text-3xl'>Login Here!!</h2>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent text-white placeholder-white' onChange={handleChange} type="text" name='username' id='username' value={user.username} placeholder="Name"></input>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent text-white placeholder-white' onChange={handleChange} type="password" name='password' id='password' value={user.password} placeholder="Password"></input>
          
          <div>
            <button onClick={handleSubmit} className="text-2xl border-2 border-black rounded-xl p-2 m-2">Login</button>
            <a href="/register" className='text-red-900 text-xl text-bold'>Dont Have an Account??</a>
          </div>
        </form>
      </div>
    )
  }