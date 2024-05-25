import React from 'react' 
import {FaSearch} from 'react-icons/fa' 
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>  
    <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>  
    <Link to="/">  
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> 
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
        </h1> 
    </Link>

        
        <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64'> 
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none' />  
            <FaSearch className='text-slate-500'></FaSearch>
         </form> 
         <ul className='flex gap-4'> 
            <Link to="/" className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</Link>
            <Link to="/about" className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</Link>
            <Link to="/signin" className=' text-slate-700 cursor-pointer'>SignIn</Link>
         </ul>
    </div>

    </header>
  )
}

export default Header
