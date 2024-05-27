import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate() ;
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); 
      try{

        setLoading(true);
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false); 
        setError(null) ; 
        navigate('/signin')
      }
      catch (error) {
       setLoading(false);
       setError(error.message);
     }
    }; 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign-up</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="text-white p-3 rounded-lg bg-slate-700 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button> 
        <Oauth c/>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div> 
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div> 
  );
}

export default SignUp;
