import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {  
  const navigate = useNavigate() ;
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState(" "); 
  const handleSubmit=(e)=>{
    e.preventDefault() ; 
    const urlParams = new URLSearchParams(window.location.search) ;  
    urlParams.set('searchTerm', searchTerm) ; 
    const searchQuery = urlParams.toString() ;   
    navigate( `/search?${searchQuery}`)

  } 
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search) ; 
    const SearchTermfromUrl = urlParams.get('searchTerm') ;  
    if(SearchTermfromUrl){
      setsearchTerm(SearchTermfromUrl)
    }

  },[location.search])
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">StellarNest</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form 
        onSubmit={handleSubmit}
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none" 
            value = {searchTerm} 
            onChange={(e)=>setsearchTerm(e.target.value)}
          /> 
          <button> 
          <FaSearch className="text-slate-500"></FaSearch>
          </button>
        </form>
        <ul className="flex gap-4">
          <Link
            to="/"
            className="hidden sm:inline text-slate-700 hover:underline cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline text-slate-700 hover:underline cursor-pointer"
          >
            About
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 cursor-pointer">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
 
