import api from "./axios.js";

export const createTransaction = (data)=>{
    return api.post("/transactions",data)
}

export const getTransactions = ()=>{
    return api.get("/transactions")
}   