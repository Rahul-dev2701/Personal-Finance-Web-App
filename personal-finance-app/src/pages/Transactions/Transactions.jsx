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
            <button className="bg-[#141920] border border-border text-[#e8ecf0] px-6 py-3 rounded-lg font-medium hover:bg-[#1a1f28] transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#141920] border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8b92a0]">Total Income</span>
                <TrendingUp className="w-5 h-5 text-[#00d4aa]" />
              </div>
              <div className="text-3xl font-bold text-[#00d4aa]">₹10,000</div>
              <p className="text-xs text-[#8b92a0] mt-1">
                5 transactions
              </p>
            </div>
            <div className="bg-[#141920] border border-border rounded-xl p-6">
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

          
        </div>


    )
}

export default Transactions;