import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        personName: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
        },
        interestRate: {
            type: Number,
            default: 0,
        },
        totalEmis: {
            type: Number,
            default: 0,
        },
        payments: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                paidAt: {
                    type: Date,
                    required: true
                }
            }
        ],
        dueDate: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
        },
    },
    {
    timestamps: true
    }
)

export const Loans = mongoose.model("Loans", loanSchema);