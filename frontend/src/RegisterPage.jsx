import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage(){
    const [user,setUser]=useState({"name":"","email":"","username":"","password":""})

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setUser({...user,[name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const res = await axios.post('http://localhost:8000/api/users/auth/register', user);
          console.log(res.data); // Assuming you want to log the response data
          setUser({"name":"","email":"","username":"","password":""})
        }
        catch (error) {
          console.error('Error during registration:', error);
        }
    };

    return(
      <div className="w-full flex flex-col justify-center items-center">
        <form className="flex flex-col mt-5 gap-4 w-[90%] items-center ">
          <h2 className='text-3xl'>Register Here!!</h2>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent placeholder-white text-white' onChange={handleChange} type="text" name='name' id='name' value={user.name} placeholder="Name"></input>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent placeholder-white text-white' onChange={handleChange} type="email" name='email' id='email' value={user.email} placeholder="Email"></input>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent placeholder-white text-white' onChange={handleChange} type="text" name='username' id='username' value={user.username} placeholder="Username"></input>
          <input className='border-4 border-red-800 rounded-2xl w-[90%] text-2xl p-2 bg-transparent placeholder-white text-white' onChange={handleChange} type="password" name='password' id='password' value={user.password} placeholder="Password"></input>
          
          <div>
            <button onClick={handleSubmit} className="text-2xl border-2 border-black rounded-xl p-2 m-2">Register</button>
            <a href="/login" className='text-red-900 text-xl text-bold'>Login??</a>
          </div>
        </form>
      </div>
    )
}