export default function RegisterPage(){
    return(
      <div className="bg-red-100 h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl py-5">Socio King</h1>
        <p>Feel The Friends Vibe</p>
        <form className="flex flex-col mt-5 gap-4 w-[90%] items-center border-2 border-black">
          <h2>Register Here!!</h2>
          <input placeholder="name"></input>
          <input placeholder="email"></input>
          <input placeholder="username"></input>
          <input placeholder="password"></input>
          <button className="bg-blue-200 p-2 my-2">Register</button>
        </form>
      </div>
    )
  }