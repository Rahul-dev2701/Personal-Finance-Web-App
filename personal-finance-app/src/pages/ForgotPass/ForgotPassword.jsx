import { Link } from "react-router-dom";

import AuthInput from "../../components/authInput.jsx";
import AuthDivider from "../../components/authDivider.jsx";
import AuthLayout from "../../components/authLayout.jsx";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="FINEconix"
      subtitle="Enter your email address and we'll send you a password reset link."
      cardTitle="Forgot Password"
    >
      <form className="space-y-5">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="john@example.com"
        />

        <button
          type="submit"
          className="w-full bg-[#01D5AB] text-[#0F1519] font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-center text-[#8B92A0] mt-6">
        Remember your password?{" "}
        <Link
          to="/login"
          className="text-[#01D5AB] hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}