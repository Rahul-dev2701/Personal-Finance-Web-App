import api from "./axios.js";

 const registerUser = (data)=>{
    return api.post("/user/register",data)
}

const loginUser = (data)=>{
    return api.post("/user/login",data)
}

export {registerUser, loginUser}


