import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.utils.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.send("Hello World");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    ); 
const {password , ...rest } = updateUser._doc; 
res.status(200).json(rest)

  } catch (error) {
    next(error);
  }
};
 


export const deleteUser =async (req, res, next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401, 'You can only delete your account!')) 
      try{ 
    await User.findByIdAndDelete(req.params.id) ; 
    res.clearCookie("access_token") ;
    res.status(200).json('User has been Deleted !') ;
    } catch(error){
      next(error) ;
    }
} ; 


export const getUserListings =async(req, res, next)=>{
  if(req.user.id===req.params.id){
  try{
 const listings = await Listing.find({UserRef:req.params.id}) ; 
 res.status(200).json(listings) ;

  } catch(error){
    next(error) ;
  } 
}
else{
  return next(errorHandler(401, 'You can only view your own listings'))
}
}