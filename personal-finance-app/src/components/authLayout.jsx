import React from "react";

const AuthLayout = ({
  title,
  subtitle,
  cardTitle,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[#00d4aa] text-4xl font-bold">
            {title}
          </h1>

          <p className="text-[#8B92A0] mt-3">
            {subtitle}
          </p>
        </div>

        <div className="bg-[#141920] border border-white/10 rounded-2xl p-8">
          <h2 className="text-[#E8ECF0] text-3xl font-semibold mb-6">
            {cardTitle}
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;