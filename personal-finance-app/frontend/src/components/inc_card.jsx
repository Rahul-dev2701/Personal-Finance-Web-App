import React from "react";
import { formatCurrency } from "../../utils/functions";

function IncomeCard({ title,color="", value, icon, iconBg, iconCol="",footer }) {
    const Icon = icon
  return (
    <div className={ `h-30 rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6`}>
        
        <div className=" mt-4 flex justify-between  text-gray-400">
            <p>{title}</p>
            <div  className={`w-10  rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className={iconCol}/>
            </div>
        </div>
        <div  style={{ color }} className="mt-3 font-bold text-2xl">
            {formatCurrency(value)}
        </div>
        {footer && (
        <footer className="mb-4 mt-0">
                <span className="text-gray-400 text-xs">{footer} </span>
        </footer>
      )}
    </div>
  );
}

export  {IncomeCard};
