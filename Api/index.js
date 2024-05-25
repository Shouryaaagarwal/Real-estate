import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv"  ; 
dotenv.config() ;

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to database")
}) 
.catch((error)=>{
console.log(error)
});
// type = "module"
// const express  =  require("express")

const app = express();

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
