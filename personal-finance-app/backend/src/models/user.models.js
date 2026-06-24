import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/dhdrljlsi/image/upload/v1782215305/WhatsApp_Image_2026-06-23_at_16.38.40_ta89wp.jpg"
        },
        currency: {
            type: String,
            default:"INR" 
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(this.password, enteredPassword)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
         _id: this._id,   
         email: this.email,
         username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
         _id: this._id,   
         email: this.email,
         username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);