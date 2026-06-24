import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, res, next)=>{
   try {
     //get accestoken from cookies or header
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")  //replace the bearer keyword with emty string to get auth token if access to cookies not available
 
     if(!token) throw new ApiError(401,"unauthorized request")
 
     //decode token to get payload
     const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user) throw new ApiError(401,"invalid access token")
 
     // add a new object in req that is available for next routes
     req.user = user;
 
     next()
   } catch (error) {
     throw new ApiError(401, error?.message||"error at auth middleware")
   }
})