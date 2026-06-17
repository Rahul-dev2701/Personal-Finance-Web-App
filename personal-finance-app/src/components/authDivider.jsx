import React from "react";

const AuthDivider = () => {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-white/10" />

      <span className="px-4 text-[#8B92A0] text-sm">
        OR
      </span>

      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
};

export default AuthDivider;