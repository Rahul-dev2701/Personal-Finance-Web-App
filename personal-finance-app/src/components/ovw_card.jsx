import React from "react";
import { CreditCard,ArrowUp, ArrowDown }  from "lucide-react";
function Topcard({ title, value, icon, iconBg, iconCol,footer }) {
    const Icon = icon
    const Footicon = footer?.icon;
  return (
    <div className=" h-50 rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6">
        
        <div className=" mt-4 flex justify-between  text-gray-400">
            <p>{title}</p>
            <div  className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className={iconCol}/>
            </div>
        </div>
        <div className="mt-3 font-bold text-2xl">
            {value}
        </div>
        {footer && (
        <footer className="mb-4 mt-6">
            <div className="flex items-center gap-2">
                    <Footicon size={20} className={`${footer.color} mt-1`}/> 
                    {footer.value}%
                <span className="text-gray-400">vs last month</span>
            </div>
        </footer>
      )}
    </div>
  );
}

export default Topcard;