import React from "react";
import { useState, useEffect } from "react";
import {Plus, DollarSign, Search} from "lucide-react"
import {IncomeCard} from "../../components/inc_card";
import { Link } from "react-router-dom";

const incomeCurrentMonth = 10000
const noOfEntries = 5

function Income(){
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#141920]" />
                    <input
                    type="text"
                    placeholder="Search by category or remark..."
                    className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                    />
                </div>
                <div className="flex gap-3">
                    <select
                    className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                    >
                    <option style={{ backgroundColor: "#1b232d", color: "white",}} value="date">Sort by Date</option>
                    <option  style={{ backgroundColor: "#1b232d", color: "white" }} className="bg-[#ffffff0d]" value="amount">Sort by Amount</option>
                    </select>
                    
                    <div className="flex content-center">
                            <Link to="/transactions" className="text-sm text-[#00D9B5] hover:underline mt-4">View All</Link>
                    </div>
                    
                    
                </div>
                </div>

                


            </div>

        </div>
        

    )
}

export default Income;