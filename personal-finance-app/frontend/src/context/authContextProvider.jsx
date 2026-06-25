import authContext from "./authContext.js";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/axios.js";

const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchCurrentUser = async () => {
            try {
                const res = await api.get("/user/current-user");
                setUser(res.data.data);
            } catch (err) {
                console.log(err?.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    },[])

    return (
        <authContext.Provider value={{user, loading, setLoading, setUser}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider