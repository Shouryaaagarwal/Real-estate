import React from 'react' 
import {BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import Signin from './pages/SignnnIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'

const App = () => {
  return (
   <BrowserRouter> 
   <Routes> 
    <Route path='/' element={<Home/>}></Route>
    <Route path='/signin' element={<Signin/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
