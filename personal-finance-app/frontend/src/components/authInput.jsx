import React from "react";

const AuthInput = ({
  value,
  onChange,
  label,
  type,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm text-[#8B92A0] mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#0F1519] border border-white/10 rounded-xl px-4 py-3 text-[#E8ECF0] placeholder-[#6B7280] focus:outline-none focus:border-[#00d4aa]"
      />
    </div>
  );
};

export default AuthInput;