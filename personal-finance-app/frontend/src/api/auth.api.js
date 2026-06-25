import api from "./axios.js";

 const registerUser = (data)=>{
    return api.post("/user/register",data)
}

const loginUser = (data)=>{
    return api.post("/user/login",data)
}

const logoutUser = (data) =>{
    return api.post("/user/logout",data)
}

export {registerUser, loginUser, logoutUser}


