import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {Transaction} from '../models/transactions.models.js';
import {User} from '../models/user.models.js';

const createTransaction = asyncHandler (async (req, res) => {
    const { amount, type, category, transactionTime, description } = req.body;
    const userId = req.user._id;

    if (!amount || !type || !category || !transactionTime || !description) {
        throw new ApiError(400, 'All fields are required');
    }
    
    if ([amount, type, category, transactionTime, description].some(
                field => typeof field === 'string' ? field.trim() === "" : !field
            )
        ) {
            throw new ApiError(400, "All fields are required");
        }

    const newTransaction = await Transaction.create({
        amount,
        type,
        category,
        transactionTime,
        description,
        userId
    });

    if(!newTransaction){
        throw new ApiError(500, "Transaction creation failed");
    }
    
    return res.status(201).json(new ApiResponse(201, "Transaction created successfully", newTransaction));
})

const getTransactions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId });

    res.status(200).json(new ApiResponse(200, transactions,"Transactions fetched successfully",));
});


export { createTransaction, getTransactions};