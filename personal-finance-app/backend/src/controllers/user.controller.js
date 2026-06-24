import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"; 
import cookieParser from "cookie-parser"

const generateAccessAndRefreshTokens =  async (userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message||"something went wrong at access and refresh token generation")
    }
}

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


const loginUser = asyncHandler(async(req,res)=>{
    const { email, password} = req.body;
    // validate input
    if(!password) throw new ApiError(400,"password is required to login")
    if(!email) throw new ApiError(400,"email is required to login")


    // check if user exist
    const user = await User.findOne({email}).select("+password")  // as password field in user model had select: false it need to be explicitely selected here

    if(!user) throw new ApiError(404,"User not found")

    //check if password correct
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect) throw new ApiError(401,"Invalid password")

    //generate access and refresh token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser =  await User.findById(user._id).select("-password -refreshToken");
    //send tokens in cookie in cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    return  res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {User: loggedInUser, accessToken, refreshToken},
            "User login successful"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            returnDocument: "after"    //used in place of new:true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logout successful"
        )
    )
})


export {registerUser, loginUser, logoutUser}

