import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"; 
import cookieParser from "cookie-parser"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"


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

    const { username, fullName, mobile, email, password, profilePicture} = formdata;

    if(!username || !fullName ||!mobile || !email || !password) throw new ApiError(400, "All fields are required");

    if ([username, fullName,mobile, email, password].some(
            field => !field?.trim()
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    // mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        throw new ApiError(400, "Please enter a valid 10-digit mobile number");
    }

    //check if user alresdy exists
    const existingUser = await User.findOne({
        $or:[{ email: lowercaseEmail }, {username: lowercaseEmail},{mobile}]
    })
    

    if(existingUser){
        throw new ApiError(400,"User already exists")
    }

    const newUser = await User.create({
        username: lowercaseUsername,
        fullName,
        email: lowercaseEmail,
        mobile,
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

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully"
        )
    )
})

const changeProfilePhoto = asyncHandler(async(req,res)=>{
    // check if image exist
    if (!req.file) {
        throw new ApiError(400, "Profile photo is required");
    }

    //upload on cloudinary
    const uploadedImage = await uploadOnCloudinary(req.file.path)

    if(!uploadedImage) throw new ApiError(500,"Error in uploading file to cloud")

    //set url in db
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                profilePicture: uploadedImage.secure_url,
                profilePicturePublicId: uploadedImage.public_id
            }
           
        },
        {
            returnDocument: "after"
        }
    )
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            uploadedImage.secure_url,
            "Image uploaded successfully"
        )
    )
    
})


const dltProfilePhoto = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if (user.profilePicturePublicId) {
        await cloudinary.uploader.destroy(user.profilePicturePublicId);
    }
    const defaultpfp = "https://res.cloudinary.com/dhdrljlsi/image/upload/v1782215305/WhatsApp_Image_2026-06-23_at_16.38.40_ta89wp.jpg"
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                profilePicture: defaultpfp,
                profilePicturePublicId: null
            }
        }
    )
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            defaultpfp,
            "Profile photo deleted successfully"
        )
    )
    
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const receivedToken = req.cookies?.refreshToken || req.body?.refreshToken //replace the bearer keyword with emty string to get auth token if access to cookies not available

    if(!receivedToken) throw new ApiError(401,"unauthorized request")

    const decodedToken = await jwt.verify(receivedToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)

    if(!user) throw new ApiError(401,"refresh token invalid")

    if(receivedToken!==user?.refreshToken) throw new ApiError(401,"refresh token expired")
    
    const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return  res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponse(
            200,
            { accessToken, refreshToken: newRefreshToken},
            "Access token refreshed successfully"
        )
    )
    
    
})

const updateProfile= asyncHandler(async (req, res) => {
    const { username, fullName, email, mobile } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updateFields = {};

    // Username changed?
    if (username && username !== user.username) {
        const existingUser = await User.findOne({ username, _id: { $ne: req.user._id } });

        if (existingUser) {
            throw new ApiError(409, "Username already exists");
        }

        updateFields.username = username;
    }

    // Email changed?
    if (email && email !== user.email) {
        const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        updateFields.email = email;
    }

    // Mobile changed?
    if (mobile && mobile !== user.mobile) {
        const existingUser = await User.findOne({ mobile,_id: { $ne: req.user._id }  });

        if (existingUser) {
            throw new ApiError(409, "Mobile number already exists");
        }

        updateFields.mobile = mobile;
    }

    // Full name doesn't need uniqueness
    if (fullName && fullName !== user.fullName) {
        updateFields.fullName = fullName;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: updateFields,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});

const changePassword= asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if(!currentPassword) throw new ApiError(400,"please enter current password")
    if(!newPassword) throw new ApiError(400,"new password field empty")
    if(!confirmNewPassword) throw new ApiError(400,"confirm new password field empty")
    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)
    if(!isPasswordCorrect) throw new ApiError(401,"Invalid password")
        
    user.password = newPassword;
    await user.save();

    const updatedUser = await User.findById(req.user._id)
    .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Password changed successfully")
    );
});


export {registerUser, loginUser, logoutUser, getCurrentUser, changeProfilePhoto, dltProfilePhoto, refreshAccessToken, updateProfile, changePassword}

