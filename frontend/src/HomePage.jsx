import { useNavigate } from 'react-router-dom';

export default function HomePage(){

  const fonts = {
    appName:{
      fontFamily: "Gill Sans Extrabold",
    },
    subtitleName:{
      fontFamily: 'Bebas Neue, sans-serif', 
    }
  };


  const navigate=useNavigate();

  
  return(
    <div className='h-[100%] flex flex-col justify-evenly w-full'>
      <div>
        <h1 style={fonts.appName} className="text-2xl py-5 text-4xl font-bold">RCBians </h1>
        <p style={fonts.subtitleName} className='capitalize'>Share Your Days</p>
      </div>

      <div className='flex flex-col justify-center items-center m-4'>
        <button className='w-[90%] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/photos')}}>Your Profile</button>
        <button className='w-[90%] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/followings')}}>You Follow</button>
      </div>


      <div className='flex-grow flex items-center justify-center'>
          <button className='w-[100px] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/register')}}>Register</button>
          <button className='w-[100px] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/login')}}>Login</button>
      </div>

    </div>
  )
}