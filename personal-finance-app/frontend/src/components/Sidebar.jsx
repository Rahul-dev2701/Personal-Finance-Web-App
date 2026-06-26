import React from "react";
import SidebarItem from "./SidebarItem";
import authContext from "../context/authContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutGrid,
  BadgeDollarSign,
  TrendingUp,
  TrendingDown,
  HandCoins,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    to: "/",
    icon: LayoutGrid,
    label: "Overview",
  },
  {
    to: "transactions",
    icon: BadgeDollarSign,
    label: "Transactions",
  },
  {
    to: "income",
    icon: TrendingUp,
    label: "Income",
  },
  {
    to: "expenses",
    icon: TrendingDown,
    label: "Expenses",
  },
  {
    to: "loans",
    icon: HandCoins,
    label: "Loans",
  },
  {
    to: "settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar = () => {
  const { user, loading, setUser } = useContext(authContext);
    if(loading){
        return <div>Loading...</div>
    }
  const userName = user.username || "User Name"
  const userMail = user.email || "useremail@example.com"
  const navigate = useNavigate()
  return (
    <aside className="fixed top-0 w-70 min-h-screen bg-[#0F1519] border-r border-white/10 flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-[#01D5AB] text-[20px] font-bold tracking-wide">
            WealthTrack
          </h1>
        </div>

        <nav className="px-4 py-6 flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
      </div>

      <button className="cursor-pointer" onClick={()=>{navigate("/settings")}}>
        <div className="border-t border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#01D5AB] flex items-center justify-center text-[#0F1519] font-semibold text-sm">
            <img className="rounded-full" src={user.profilePicture} alt="" />
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium leading-none">
              {user.fullName}
            </h3>

            <p className="text-[#7C8794] text-[13px] mt-1">
              {user.email}
            </p>
          </div>
        </div>
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;