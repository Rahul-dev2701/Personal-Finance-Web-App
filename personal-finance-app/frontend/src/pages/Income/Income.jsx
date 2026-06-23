import React from "react";
import { useState, useEffect } from "react";
import {Plus, DollarSign, Search} from "lucide-react"
import {IncomeCard} from "../../components/inc_card";
import { Link } from "react-router-dom";

const incomeEntries = [
    { id: 1, amount: 25000, date: '2026-05-10', source: 'Salary', remarks: 'Monthly salary deposit' },
    { id: 2, amount: 8500, date: '2026-05-03', source: 'Freelance', remarks: 'Website development project' },
    { id: 3, amount: 3200, date: '2026-04-28', source: 'Investment', remarks: 'Dividend payment from stocks' },
    { id: 4, amount: 1500, date: '2026-04-25', source: 'Side Business', remarks: 'Product sales' },
    { id: 5, amount: 4200, date: '2026-04-20', source: 'Freelance', remarks: 'Logo design work' },
    
  ];

const incomeCategories = ['Food', 'Rent', 'Electricity', 'Phone Bill', 'OTT Subscription', 'Travel', 'Fuel', 'Shopping', 'Healthcare', 'Other'];
const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];

const incomeCurrentMonth =  incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
const noOfEntries = incomeEntries.length;

function Income(){

    const [searchTerm, setSearchTerm] = useState('');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const filteredEntries = incomeEntries
    .filter((entry) => {
      const matchesSearch =
        entry.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.remarks.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = sourceFilter === 'all' || entry.source === sourceFilter;
      return matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      return 0;
    });

    return(

        <div className='p-8'>
             {/* // top section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#e8ecf0]">Income Entries</h1>
                    <p className="text-[#8b92a0] mt-1">Track all your income sources</p>
                </div>
                <button
                    className="bg-[#00d4aa] text-[#0a0e14] px-6 py-3 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2"
                    >
                    <Plus className="w-5 h-5" />
                    Add Income
                </button>
                
            </div>

            {/* middle section */}
            <div className="grid grid-cols-4">
                 <IncomeCard title="Total Balance" value={incomeCurrentMonth}
                        icon={DollarSign} iconBg="bg-emerald-500/10" iconCol="text-[#00D9B5]"
                        footer={
                            `${noOfEntries} entries`
                        }
                    />
            </div>

            {/* end section */}
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6 mt-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#141920]" />
                    <input
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search by source or remark..."
                    className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                    />
                </div>
                <div className="flex gap-3">
                    <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                    >
                    <option  style={{ backgroundColor: "#1b232d", color: "white",}} value="date">Sort by Date</option>
                    <option style={{ backgroundColor: "#1b232d", color: "white" }} className="bg-[#ffffff0d]" value="amount">Sort by Amount</option>
                    </select>
                    
                    <div className="flex content-center">
                            <Link to="/transactions" className="text-sm text-[#00D9B5] hover:underline mt-4">View All</Link>
                    </div>
                    
                    
                </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-[#ffffff14]">
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Source</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Remarks</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-[#8b92a0]">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEntries.map((entry) => (
                            <tr key={entry.id} className="border-b border-[#ffffff14] hover:bg-[#1a1f28]/50 transition-colors">
                            <td className="py-4 px-4 text-sm text-[#e8ecf0]">
                                {new Date(entry.date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                })}
                            </td>
                            <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#1a1f28] text-xs font-medium text-[#e8ecf0]">
                                {entry.source}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-[#8b92a0]">{entry.remarks}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-[#00d4aa] text-right">
                                ₹{entry.amount.toLocaleString()}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </div>

        </div>
        

    )
}

export default Income;