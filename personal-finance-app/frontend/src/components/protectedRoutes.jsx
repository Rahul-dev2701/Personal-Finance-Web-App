import {useEffect} from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import authContext  from "../context/authContext.js";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const {user, loading} = useContext(authContext)

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return (
       <Outlet/>
    )
}

export default ProtectedRoutes