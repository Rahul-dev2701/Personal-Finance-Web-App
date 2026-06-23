import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            isUnique: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            isUnique: true,
        },
        password: {
            type: String,
            required: true,
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
            required: true,
        },
    }, 
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);