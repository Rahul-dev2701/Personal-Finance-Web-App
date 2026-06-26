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

const updateProfilePicture = (data) =>{
    return api.post("/user/updatepfp",data)
}

const deleteProfilePicture = (data) =>{
    return api.post("/user/dltpfp",data)
}

const refAccessToken = () =>{
    return api.post("/user/get-new-token")
}

const updateProfile = (data)=>{
    return api.post("/user/update-profile",data)
}

const changePassword = (data)=>{
    return api.post("/user/change-password",data)
}


export {registerUser, loginUser, logoutUser, updateProfilePicture, deleteProfilePicture, refAccessToken, updateProfile, changePassword}


