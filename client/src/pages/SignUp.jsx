import React from "react"; 
import {Link} from "react-router-dom"

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign-up</h1> 
      <form action="" className="flex flex-col gap-4 "> 
        <input type="text" placeholder="username" className="border p-3 rounded-lg focus:outline-none" id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg focus:outline-none" id="email" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg focus:outline-none" id="password" /> 
        <button className="text-white p-3 rounded-lg bg-slate-700 uppercase hover:opacity-95 disabled:opacity-80">Sign up</button>
      </form> 
      <div className="flex gap-3 mt-5"> 
       <p>Have an account ?</p>
       <Link to={"/signin"}> 
       <span className="text-blue-600">Sign in</span>
       </Link>
       </div>
    </div>
  );
}

export default SignUp;
