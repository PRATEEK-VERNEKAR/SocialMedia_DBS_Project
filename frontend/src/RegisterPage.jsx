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
          const res = await axios.post('http://localhost:8000/api/users/register', user);
          console.log(res.data); // Assuming you want to log the response data
          setUser({"name":"","email":"","username":"","password":""})
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };

    return(
      <div className="bg-red-100 h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl py-5">Socio King</h1>
        <p>Feel The Friends Vibe</p>
        <form className="flex flex-col mt-5 gap-4 w-[90%] items-center border-2 border-black">
          <h2>Register Here!!</h2>
          <input onChange={handleChange} type="text" name='name' id='name' value={user.name} placeholder="name"></input>
          <input onChange={handleChange} type="email" name='email' id='email' value={user.email} placeholder="email"></input>
          <input onChange={handleChange} type="text" name='username' id='username' value={user.username} placeholder="username"></input>
          <input onChange={handleChange} type="password" name='password' id='password' value={user.password} placeholder="password"></input>
          <button onClick={handleSubmit} className="bg-blue-200 p-2 my-2">Register</button>
        </form>
      </div>
    )
}