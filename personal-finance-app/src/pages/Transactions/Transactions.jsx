import { useState, useEffect } from "react";
import { Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

function Transactions(){
    return(
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#e8ecf0]">All Transactions</h1>
              <p className="text-[#8b92a0] mt-1">Complete history of income and expenses</p>
            </div>
            <button className="bg-[#141920] border border-[#ffffff14] text-[#e8ecf0] px-6 py-3 rounded-lg font-medium hover:bg-[#1a1f28] transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8b92a0]">Total Income</span>
                <TrendingUp className="w-5 h-5 text-[#00d4aa]" />
              </div>
              <div className="text-3xl font-bold text-[#00d4aa]">₹10,000</div>
              <p className="text-xs text-[#8b92a0] mt-1">
                5 transactions
              </p>
            </div>
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8b92a0]">Total Expenses</span>
                <TrendingDown className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div className="text-3xl font-bold text-[#ef4444]">₹5,423</div>
              <p className="text-xs text-[#8b92a0] mt-1">
                2 transactions
              </p>
            </div>
          </div>

          <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#141920]" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
                <select
                  className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </div>
            </div>
          </div>
          
        </div>


    )
}

export default Transactions;