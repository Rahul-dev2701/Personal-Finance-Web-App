import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-4 px-4 py-3 rounded-xl ${
          isActive
            ? "bg-[#151D22] text-[#01D5AB]"
            : "text-[#A3AAB5] hover:bg-[#151D22] hover:text-white"
        } transition-all duration-200 text-left`
      }
    >
      <Icon size={18} strokeWidth={1.8} className="shrink-0" />
      <span className="text-[15px] font-medium tracking-[0.2px]">
        {label}
      </span>
    </NavLink>
  );
};

export default SidebarItem;