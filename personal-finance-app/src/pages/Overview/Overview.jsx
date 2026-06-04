import React from "react";
import { useState, useEffect } from "react";
import Topcard from "../../components/ovw_card";
import { CreditCard,ArrowUp, ArrowDown }  from "lucide-react";

const month = new Date().toLocaleString("default", {
  month: "long",
});
const year = new Date().getFullYear()
const moreIncomeThanLastMonth = 12.00
const moreExpenseThanLastMonth = 12.00
const moreBalanceThanLastMonth = 12.00

const balanceFooter = {
  icon: moreBalanceThanLastMonth > 0 ? ArrowUp : ArrowDown,
  value: Math.abs(moreIncomeThanLastMonth),
  color: moreBalanceThanLastMonth > 0 ? "text-green-400" : "text-red-400",
};
const incomeFooter = {
  icon: moreIncomeThanLastMonth > 0 ? ArrowUp : ArrowDown,
  value: Math.abs(moreIncomeThanLastMonth),
  color: moreIncomeThanLastMonth > 0 ? "text-green-400" : "text-red-400",
};

const expenseFooter = {
    icon:   moreExpenseThanLastMonth > 0 ? ArrowDown : ArrowUp,
    value: Math.abs(moreExpenseThanLastMonth),
    color:  moreExpenseThanLastMonth > 0 ? "text-green-400" : "text-red-400",
};

function Overview(){
    const [user,setUser] = useState("Default");
    return(
        <div className="relative p-8">
            <div className="  absolute top-10 mb-4">
                <p className="text-3xl font-bold text-white pb-2">Hello {user}</p>
                <p className="text-gray-400">Here's your financial overview for {month} {year}</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-30">
                <Topcard title="Total Balance" value="$12,345.67"
                    icon={CreditCard} iconBg="bg-emerald-500/10" iconCol="text-[#00D9B5]"
                    footer={balanceFooter}
                />
                <Topcard title="Income" value="$5,000.00"
                 icon={ArrowUp} iconBg="bg-green-500/10" iconCol="text-[#13cf65]"
                 footer = {incomeFooter}
                />
                <Topcard title="Expenses" value="$3,000.00"
                 icon={ArrowDown} iconBg="bg-red-500/10" iconCol="text-[#e61c15]"
                 footer = {expenseFooter}
                />
            </div>
            
        </div>  

    )
}

export default Overview;