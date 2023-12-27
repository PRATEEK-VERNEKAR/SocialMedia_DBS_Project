import { useNavigate } from 'react-router-dom';

export default function HomePage(){
  const navigate=useNavigate();

  
  return(
    <div className="bg-red-100 h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl py-5">Socio King</h1>
      <p>Feel The Friends Vibe</p>
      <button onClick={()=>{navigate('/register')}}>Register Here</button>
    </div>
  )
}