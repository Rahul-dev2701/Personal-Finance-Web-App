import { Link } from "react-router-dom";

import AuthInput from "../../components/authInput.jsx";
import AuthDivider from "../../components/authDivider.jsx";
import AuthLayout from "../../components/authLayout.jsx";
import { registerUser } from "../../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Signup() {

  
const [username,setUsername] = useState("")
const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [profilePicture,setProfilePicture] = useState()



  const navigate = useNavigate();

  

  const register = async(e)=>{
    
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

  try {

    const res = await registerUser({
      username,
      fullName,
      email,
      password,
      profilePicture
    })

    if (res.data.success) {
      navigate("/login");
    }
  } catch (error) {
      console.log(error)
  }
}

  return (
    <AuthLayout
      title="FINEconix"
      subtitle="Create your account and start tracking your finances."
      cardTitle="Sign Up"
    >
      <form onSubmit={register} className="space-y-5">

        <AuthInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          type="text"
          placeholder="rahul123"
        />

        <AuthInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          type="text"
          placeholder="John Doe"
        />

        <AuthInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          type="email"
          placeholder="john@example.com"
        />

        <AuthInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="••••••••"
        />

        <AuthInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
        />

        <button
        type="submit"
          className="w-full bg-[#01D5AB] text-[#0F1519] font-semibold py-3 rounded-xl"
        >
          Create Account
        </button>
        
      </form>

      <AuthDivider />

      <button className="w-full bg-[#0F1519] border border-white/10 text-[#E8ECF0] py-3 rounded-xl">
        Continue with Google
      </button>

      <p className="text-center text-[#8B92A0] mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#01D5AB]"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}