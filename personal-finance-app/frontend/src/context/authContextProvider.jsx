import authContext from "./authContext.js";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/axios.js";
import {refAccessToken } from "../api/auth.api.js";

const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true);
  
    const refreshAccessToken = async () => {
        try {
            await refAccessToken();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await api.get("/user/current-user");
                setUser(res.data.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    const refreshed = await refreshAccessToken();

                    if (refreshed) {
                        try {
                            const res = await api.get("/user/current-user");
                            setUser(res.data.data);
                        } catch {
                            setUser(null);
                            navigate("/login", {
                                state: {
                                    message: "Session expired. Please log in again."
                                }
                            });
                        }
                    } else {
                        setUser(null);
                    }
                }
                else {
                   console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);
    return (
        <authContext.Provider value={{user, loading, setLoading, setUser}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider