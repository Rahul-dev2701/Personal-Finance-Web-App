import React from "react";
import { useState, useEffect } from "react";
import {Topcard,Transaction} from "../../components/ovw_card";
import { CreditCard,ArrowUp, ArrowDown, Loader2 }  from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BarGraph from "../../components/barGraph";
import { Link } from "react-router-dom";
import { getTransactions } from "../../api/transactions.api";
import api from "../../api/axios.js";

function Overview(){
    const [user,setUser] = useState("Default");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get("/user/current-user");
            console.log("User data fetched:", res.data);
            if (res && res.data && res.data.data) {
                setUser(res.data.data.fullName);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOvwData = async () => {
            try {
                const res = await getTransactions()
                let transactionsArr = []

                if(res && res.data) {
                    transactionsArr = Array.isArray(res.data)?res.data : (res.data.data || [])
                } else if(Array.isArray(res)) {
                    transactionsArr = res
                }

                setTransactions(transactionsArr)
            } catch(error) {
                console.error("Error fetching overview data", error)
            } finally {
                setLoading(false);
            }
        }
        fetchOvwData()
    }, [])


    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const monthlyTransactions = [];
    const prevMonthlyTransactions = [];

    transactions.forEach((t) => {
        if (!t.transactionTime) return;
        const tDate = new Date(t.transactionTime);
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth();

        if (tYear === currentYear && tMonth === currentMonth) {
            monthlyTransactions.push(t);
        } else if (tYear === prevMonthYear && tMonth === prevMonth) {
            prevMonthlyTransactions.push(t);
        }
    });

    const totalIncome = monthlyTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalExpense = monthlyTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalBalance = totalIncome - totalExpense;

    const prevIncome = prevMonthlyTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const prevExpense = prevMonthlyTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const prevBalance = prevIncome - prevExpense;

    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0; // Avoid division by zero
        return parseFloat((((current - previous) / Math.abs(previous)) * 100).toFixed(1));
    };

    const balanceChange = calculatePercentageChange(totalBalance, prevBalance);
    const incomeChange = calculatePercentageChange(totalIncome, prevIncome);
    const expenseChange = calculatePercentageChange(totalExpense, prevExpense);

    const balanceFooter = {
        icon: balanceChange >= 0 ? ArrowUp : ArrowDown,
        value: Math.abs(balanceChange),
        color: balanceChange >= 0 ? "text-green-400" : "text-red-400",
    };
    const incomeFooter = {
        icon: incomeChange >= 0 ? ArrowUp : ArrowDown,
        value: Math.abs(incomeChange),
        color: incomeChange >= 0 ? "text-green-400" : "text-red-400",
    };
    const expenseFooter = {
        icon: expenseChange <= 0 ? ArrowDown : ArrowUp,
        value: Math.abs(expenseChange),
        color: expenseChange <= 0 ? "text-green-400" : "text-red-400",
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const baseWeeklyData = dayNames.map((day) => ({ day, income: 0, expenses: 0 }));

    transactions.forEach((t) => {
        if (t.transactionTime) {
            const tDate = new Date(t.transactionTime);
            if (tDate >= startOfWeek && tDate <= endOfWeek) {
                const dayIndex = tDate.getDay();
                const dayName = dayNames[dayIndex];
                const match = baseWeeklyData.find((d) => d.day === dayName);
                if (match) {
                    if (t.type === "income") match.income += t.amount;
                    if (t.type === "expense") match.expenses += t.amount;
                }
            }
        }
    });

    const recentTransactionsMapped = [...monthlyTransactions]
        .sort((a, b) => new Date(b.transactionTime || 0) - new Date(a.transactionTime || 0))
        .slice(0, 5)
        .map((t) => ({
            id: t._id,
            name: t.description,
            category: t.category,
            amount: t.type === "expense" ? -Math.abs(t.amount) : t.amount,
            date: new Date(t.transactionTime).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
            type: t.type,
        }));

    const colors = ["#00d4aa", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#10b981", "#64748b"];
    const categoryTotals = {};

    monthlyTransactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        });

    const expenseBreakdown = Object.keys(categoryTotals).map((category, idx) => {
        const amount = categoryTotals[category];
        const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
        return {
            category,
            amount,
            percentage,
            color: colors[idx % colors.length],
        };
    });

    const monthName = now.toLocaleString("default", { month: "long" });

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0d1117]">
                <Loader2 className="h-10 w-10 animate-spin text-[#00D9B5]" />
            </div>
        );
    }

    return(
        <div className="relative p-8">

            {/* Top cards */}
            <div>
                <div className="  absolute top-10 mb-4">
                    <p className="text-3xl font-bold text-white pb-2">Hello {user}</p>
                    <p className="text-gray-400">Here's your financial overview for {monthName} {currentYear}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-30">
                    <Topcard title="Total Balance" value={totalBalance}
                        icon={CreditCard} iconBg="bg-emerald-500/10" iconCol="text-[#00D9B5]"
                        footer={balanceFooter}
                    />
                    <Topcard title="Income" value={totalIncome}
                    icon={ArrowUp} iconBg="bg-green-500/10" iconCol="text-[#13cf65]"
                    footer = {incomeFooter}
                    />
                    <Topcard title="Expenses" value={totalExpense}
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
                    <div className="h-80 w-full">
                    <BarGraph weeklyData={baseWeeklyData} />
                    </div>
                </div>

                    {/* recent transactions */}
                <div className=" rounded-2xl bg-[#141920] border shadow-2xl border-white/10 px-6">
                    <div className="flex justify-between grid-cols-2">
                        <div className="text-lg font-semibold text-foreground mt-4">Recent Transactions</div>
                        <Link to="/transactions" className="text-sm text-[#00D9B5] hover:underline mt-4">View All</Link>
                    </div>
                    <Transaction recentTransactions={recentTransactionsMapped}/>
                    
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
                        <div className="text-xl font-bold mb-1">₹{item.amount.toLocaleString()}</div>
                        <div className="text-xs">{item.percentage}% of total</div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>  

    )
}

export default Overview;