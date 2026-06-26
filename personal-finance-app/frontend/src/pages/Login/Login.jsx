import { Link } from "react-router-dom";

import AuthInput from "../../components/authInput.jsx";
import AuthDivider from "../../components/authDivider.jsx";
import AuthLayout from "../../components/authLayout.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api.js";

import authContext from "../../context/authContext.js";
import { useContext } from "react";
import api from "../../api/axios.js";



export default function Login() {
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate();
  const {setUser} = useContext(authContext)
  const login = async(e) =>{
    e.preventDefault();
    try {
      const res = await loginUser({email,password})

      if (res.data.success) {
        const currentUser = await api.get("/user/current-user");
        setUser(currentUser.data.data)
        navigate("/");
      }
    } catch (error) {
        console.log(error?.message)
    }
}


  return (
    <AuthLayout
      title="WealthTrack"
      subtitle="Welcome back. Sign in to manage your finances."
      cardTitle="Login"
    >
      <form onSubmit={login}  className="space-y-5">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-[#8B92A0]">
            <input
              type="checkbox"
              className="accent-[#01D5AB]"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-[#01D5AB]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full bg-[#01D5AB] text-[#0F1519] font-semibold py-3 rounded-xl"
        >
          Sign In
        </button>
      </form>

      <AuthDivider />

      <button className="w-full bg-[#0F1519] border border-white/10 text-[#E8ECF0] py-3 rounded-xl">
        Continue with Google
      </button>

      <p className="text-center text-[#8B92A0] mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-[#01D5AB]"
        >
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
}