import React from "react";
import {
  LayoutGrid,
  BadgeDollarSign,
  TrendingUp,
  TrendingDown,
  HandCoins,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    icon: LayoutGrid,
    active: true,
  },
  {
    name: "Transactions",
    icon: BadgeDollarSign,
  },
  {
    name: "Income",
    icon: TrendingUp,
  },
  {
    name: "Expenses",
    icon: TrendingDown,
  },
  {
    name: "Borrow/Lend",
    icon: HandCoins,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <aside className=" fixed top-0 w-70 h-screen bg-[#0F1519] border-r border-white/10 flex flex-col justify-between">
      
      <div>
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-[#01D5AB] text-[20px] font-bold tracking-wide">
            Finance App 
          </h1>
        </div>

        <nav className="px-4 py-6 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left
                  ${
                    item.active
                      ? "bg-[#151D22] text-[#01D5AB]"
                      : "text-[#A3AAB5] hover:bg-[#151D22] hover:text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span className="text-[15px] font-medium tracking-[0.2px]">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 rounded-full bg-[#01D5AB] flex items-center justify-center text-[#0F1519] font-semibold text-sm">
            MG
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium leading-none">
              Manasvi Gehlot
            </h3>

            <p className="text-[#7C8794] text-[13px] mt-1">
              manasvi@iitj.ac.in
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;