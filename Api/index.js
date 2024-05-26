import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv"  ;  
import userRouter from "./routes/user.route.js" 
import authRouter from  "./routes/auth.route.js"
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
app.use(express.json()) ;

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)  
app.use((err, req , res , next )=>{
  const statusCode = err.statusCode||500  ;
  const message  = err.message||'Internal Message Error' ;
  return  res.status(statusCode).json({
    success:false  , 
    message ,
    statusCode
  })
})

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
 