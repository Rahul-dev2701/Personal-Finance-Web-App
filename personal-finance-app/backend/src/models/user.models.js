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
            required: true,
        },
        currency: {
            type: String,
            required: true,
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