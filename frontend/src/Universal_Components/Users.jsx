import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Users = () => {
  const params=useParams();
	const navigate=useNavigate();
	const [userid,setUserid]=useState(params);
	const [user,setUser]=useState({name:"",username:"",city:"",website:""})

	// useEffect(()=>{
  //   if(!Cookies.get('accessToken')){
  //     navigate('/login');
  //   }
  // },[])

	useEffect(()=>{
		const fetchUser=async()=>{
			axios.defaults.withCredentials=true;
			const res=await axios.get(`http://localhost:8000/api/users/getSearchedUser/${userid.userid}`);
			console.log(res);
			setUser({name:res.data.name,username:res.data.username,city:res.data.city,website:res.data.website})
		}
		fetchUser();
	},[userid]);


  return (
    <div className='flex-grow'>
        {
					<div>
						<p>Name :- {user.name}</p>
						<p>Username :- {user.username}</p>
						<p>Website :- {user.website}</p>
						<p>City :- {user.city}</p>
					</div>
				}

    </div>
  )
}

export default Users