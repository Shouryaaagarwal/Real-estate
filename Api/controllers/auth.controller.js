//  import User from "../models/user.model.js"

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; 
import { errorHandler } from "../utils/error.utils.js"; 
import jwt from "jsonwebtoken";
// import { errorHandler } from "../utils/error.utils.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (error) {
    // res.status(500).json(error.message); 
    next(error) 
    // next(errorHandler(550 , "Error from the errorHandler"))
  }
};
 


export const signin= async (req , res , next)=>{
    const {email, password} = req.body ;  
    try{
        const validuser = await User.findOne({email}) ;
        if(!validuser){
            return next(errorHandler(404, "User not found"));
        } 
        const validPassword = bcryptjs.compareSync(password, validuser.password) 
        if(!validPassword){
            return next(errorHandler(404, "Wrong Credentials"))
        } 
        const token  = jwt.sign({id:validuser._id}, process.env.JWT_SECRET) 
        const {password:pass , ...rest}  = validuser._doc
        res.cookie('access_token', token , {httpOnly:true}).status(200).json({rest}) 
    }catch(error){
        next(error) ;
    }
}