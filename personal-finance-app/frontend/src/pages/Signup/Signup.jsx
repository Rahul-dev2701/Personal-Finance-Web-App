import { Link } from "react-router-dom";

import AuthInput from "../../components/authInput.jsx";
import AuthDivider from "../../components/authDivider.jsx";
import AuthLayout from "../../components/authLayout.jsx";

export default function Signup() {
  return (
    <AuthLayout
      title="FINEconix"
      subtitle="Create your account and start tracking your finances."
      cardTitle="Sign Up"
    >
      <form className="space-y-5">
        <AuthInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="john@example.com"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
        />

        <button
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