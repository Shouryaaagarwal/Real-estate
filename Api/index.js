import express from 'express'  ;  
    // type = "module" 
// const express  =  require("express")

const app = express() ; 

app.listen(3000, ()=>{
    console.log('Server is running on 3000')
})