import React from "react";
import { useState, useEffect } from "react";
import {Topcard,Transaction} from "../../components/ovw_card";
import { CreditCard,ArrowUp, ArrowDown }  from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BarGraph from "../../components/barGraph";
import { Link } from "react-router-dom";


const TotalBalance = 5000.00
const MonthlyIncome = 5000.00
const MonthlyExpense = 5000.00
const year = new Date().getFullYear()
const incomeChange = 12.00
const expenseChange = -12.00
const balanceChange = 12.00

const month = new Date().toLocaleString("default", {
  month: "long",
});
const balanceFooter = {
  icon: balanceChange > 0 ? ArrowUp : ArrowDown,
  value: Math.abs(balanceChange),
  color: balanceChange > 0 ? "text-green-400" : "text-red-400",
};
const incomeFooter = {
  icon: incomeChange > 0 ? ArrowUp : ArrowDown,
  value: Math.abs(incomeChange),
  color: incomeChange > 0 ? "text-green-400" : "text-red-400",
};

const expenseFooter = {
    icon:   expenseChange > 0 ? ArrowDown : ArrowUp,
    value: Math.abs(expenseChange),
    color:  expenseChange > 0 ? "text-green-400" : "text-red-400",
};

const weeklyData = [
    { day: 'Mon', income: 4200, expenses: 3100 },
    { day: 'Tue', income: 3800, expenses: 2800 },
    { day: 'Wed', income: 5100, expenses: 4200 },
    { day: 'Thu', income: 4500, expenses: 3600 },
    { day: 'Fri', income: 6200, expenses: 4800 },
    { day: 'Sat', income: 3200, expenses: 2400 },
    { day: 'Sun', income: 2800, expenses: 1900 },
  ];

const recentTransactions = [
    { id: 1, name: 'Grocery Shopping', category: 'Food', amount: -850, date: '12 May', type: 'expense' },
    { id: 2, name: 'Salary Deposit', category: 'Income', amount: 25000, date: '10 May', type: 'income' },
    { id: 3, name: 'Electricity Bill', category: 'Electricity', amount: -420, date: '08 May', type: 'expense' },
    { id: 4, name: 'Netflix Subscription', category: 'OTT', amount: -199, date: '05 May', type: 'expense' },
    { id: 5, name: 'Freelance Project', category: 'Income', amount: 8500, date: '03 May', type: 'income' },
  ];

const expenseBreakdown = [
    { category: 'Food', amount: 12450, percentage: 28, color: '#00d4aa' },
    { category: 'Rent', amount: 20000, percentage: 45, color: '#3b82f6' },
    { category: 'Travel', amount: 5200, percentage: 12, color: '#8b5cf6' },
    { category: 'Bills', amount: 4850, percentage: 11, color: '#f59e0b' },
    { category: 'Others', amount: 1800, percentage: 4, color: '#ec4899' },
  ];

function Overview(){
    const [user,setUser] = useState("Default");
    return(
        <div className="relative p-8">

            {/* Top cards */}
            <div>
                <div className="  absolute top-10 mb-4">
                    <p className="text-3xl font-bold text-white pb-2">Hello {user}</p>
                    <p className="text-gray-400">Here's your financial overview for {month} {year}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-30">
                    <Topcard title="Total Balance" value={TotalBalance}
                        icon={CreditCard} iconBg="bg-emerald-500/10" iconCol="text-[#00D9B5]"
                        footer={balanceFooter}
                    />
                    <Topcard title="Income" value={MonthlyIncome}
                    icon={ArrowUp} iconBg="bg-green-500/10" iconCol="text-[#13cf65]"
                    footer = {incomeFooter}
                    />
                    <Topcard title="Expenses" value={MonthlyExpense}
                    icon={ArrowDown} iconBg="bg-red-500/10" iconCol="text-[#e61c15]"
                    footer = {expenseFooter}
                    />
                </div>
            </div>

            {/* mid section */}

            <div className="grid grid-cols-[66%_32%] gap-6 mt-10 h-100 ">

                {/* chart */}
                 <div className=" rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6">
                    <div className="flex  justify-between  text-gray-400">
                        <div className="text-xl font-bold text-white p-6">Weekly Income vs Expenses</div>
                        <div className="flex gap-6 mt-2 mr-6">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-400">Income</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-400">Expenses</span>
                        </div>
                    </div>
                    </div>
                    <div className="h-80 w-full" mt-8>
                    <BarGraph weeklyData={weeklyData} />
                    </div>
                </div>

                    {/* recent transactions */}
                <div className=" rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6">
                    <div className="flex justify-between grid-cols-2">
                        <div className="text-lg font-semibold text-foreground mt-4">Recent Transactions</div>
                        <Link to="/transactions" className="text-sm text-[#00D9B5] hover:underline mt-4">View All</Link>
                    </div>
                    <Transaction recentTransactions={recentTransactions}/>
                    
                </div>
            </div>


            {/* bottom section */}
            <div className=" h-55 rounded-2xl bg-[#141920] border shadow-2xl border-white/10 mt-8">
               <div className="bg-card rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Expense Breakdown</h2>
                <div className="grid grid-cols-5 gap-4">
                {expenseBreakdown.map((item) => (
                    <div key={item.category} className=" p-4 rounded-2xl bg-[#1b232d] border shadow-2xl border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm ">{item.category}</span>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        </div>
                        <div className="text-xl font-bold text-foreground mb-1">₹{item.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}% of total</div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>  

    )
}

export default Overview;