import api from "./axios.js";

export const registerUser = (data)=>{
    return api.post("/user/register",data)
}
