import React from "react";
import { formatCurrency } from "../../utils/functions";

const incomeEntries = [
    { id: 1, amount: 25000, date: '2026-05-10', source: 'Salary', remarks: 'Monthly salary deposit' },
    { id: 2, amount: 8500, date: '2026-05-03', source: 'Freelance', remarks: 'Website development project' },
    { id: 3, amount: 3200, date: '2026-04-28', source: 'Investment', remarks: 'Dividend payment from stocks' },
    { id: 4, amount: 1500, date: '2026-04-25', source: 'Side Business', remarks: 'Product sales' },
    { id: 5, amount: 4200, date: '2026-04-20', source: 'Freelance', remarks: 'Logo design work' },
  ];


function IncomeCard({ title, value, icon, iconBg, iconCol,footer }) {
    const Icon = icon
  return (
    <div className={ `h-30 rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6`}>
        
        <div className=" mt-4 flex justify-between  text-gray-400">
            <p>{title}</p>
            <div  className={`w-10  rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className={iconCol}/>
            </div>
        </div>
        <div className="mt-3 font-bold text-2xl">
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
