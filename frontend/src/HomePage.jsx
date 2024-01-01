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
    <div>
      <div>
        <h1 style={fonts.appName} className="text-2xl py-5 text-4xl font-bold">CHADDI GANG</h1>
        <p style={fonts.subtitleName} className='capitalize'>Share Your Dirty Raaz</p>
      </div>

      <div className=''>
          <button className='w-[100px] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/register')}}>Register</button>
          <button className='w-[100px] m-2 p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 rounded-xl border-red-400' onClick={()=>{navigate('/login')}}>Login</button>
      </div>
    </div>
  )
}