import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"; 

const registerUser = asyncHandler(async(req,res)=>{
    const formdata = req.body;

    const { username, fullName, email, password, profilePicture} = formdata;

    if(!username || !fullName || !email || !password) throw new ApiError(400, "All fields are required");

    if ([username, fullName, email, password].some(
            field => !field?.trim()
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    //check if user alresdy exists
    const existingUser = await User.findOne({
        $or:[{ email: lowercaseEmail }, {username: lowercaseEmail}]
    })
    

    if(existingUser){
        throw new ApiError(400,"User already exists")
    }

    const newUser = await User.create({
        username: lowercaseUsername,
        fullName,
        email: lowercaseEmail,
        password,
        profilePicture,
    }) 
    
    if(!newUser){
        throw new ApiError(500,"User registration failed")
    }
    
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

    return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"))
})

export {registerUser}