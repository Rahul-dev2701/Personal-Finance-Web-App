import React from "react";
import { useState, useEffect } from "react";
import {Plus, DollarSign, Search} from "lucide-react"
import {IncomeCard} from "../../components/inc_card";
import { Link } from "react-router-dom";
import LoanCard from "../../components/loan_card";

const borrowData = [
    {
      id: 1,
      type: 'borrowed',
      person: 'Rahul Bishnoi',
      amount: 50000,
      date: '2026-04-15',
      interestRate: 5,
      term: 12,
      emiAmount: 4417,
      paidEmis: 2,
      totalEmis: 12,
      description: 'Loan for business investment',
      status: 'active',
    },
    {
      id: 2,
      type: 'borrowed',
      person: 'Priya Sharma',
      amount: 25000,
      date: '2026-03-20',
      interestRate: 0,
      term: 6,
      emiAmount: 4167,
      paidEmis: 3,
      totalEmis: 6,
      description: 'Emergency medical expenses',
      status: 'active',
    },
    {
      id: 3,
      type: 'borrowed',
      person: 'Amit Kumar',
      amount: 15000,
      date: '2026-05-01',
      interestRate: 3,
      term: 10,
      emiAmount: 1545,
      paidEmis: 1,
      totalEmis: 10,
      description: 'Personal loan',
      status: 'active',
    },
  ];
const lentData = [
    {
      id: 1,
      type: 'lent',
      person: 'Rahul Bishnoi',
      amount: 50000,
      date: '2026-04-15',
      interestRate: 5,
      term: 12,
      emiAmount: 4417,
      paidEmis: 2,
      totalEmis: 12,
      description: 'Loan for business investment',
      status: 'active',
    },
    {
      id: 2,
      type: 'lent',
      person: 'Priya Sharma',
      amount: 25000,
      date: '2026-03-20',
      interestRate: 0,
      term: 6,
      emiAmount: 4167,
      paidEmis: 3,
      totalEmis: 6,
      description: 'Emergency medical expenses',
      status: 'active',
    },
    {
      id: 3,
      type: 'lent',
      person: 'Amit Kumar',
      amount: 15000,
      date: '2026-05-01',
      interestRate: 3,
      term: 10,
      emiAmount: 1545,
      paidEmis: 1,
      totalEmis: 10,
      description: 'Personal loan',
      status: 'active',
    },
  ];

// const footer = {
//     icon:   expenseChange > 0 ? ArrowDown : ArrowUp,
//     value: Math.abs(expenseChange),
//     color:  expenseChange > 0 ? "text-green-400" : "text-red-400",
// };

const totalLent = lentData.reduce((sum, entry) => sum + entry.amount, 0);
const totalBorrow = borrowData.reduce((sum, entry) => sum + entry.amount, 0);
const netBalance = totalLent - totalBorrow;
const color = netBalance>=0? "#00D9B5" : "#e41515d5";
const footer = netBalance >= 0 ? "You are owed" : "You owe";


function Loans(){

    const [displayArray,setDisplayArray] = useState(lentData)
    const [activeTab,setActiveTab] = useState("lent")

    return(
        <div className="p-8">

            {/* top section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#e8ecf0]">Loan Entries</h1>
                    <p className="text-[#8b92a0] mt-1">Manage your loans and track settlements</p>
                </div>
                <button
                    className="bg-[#00d4aa] text-[#0a0e14] px-6 py-3 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2"
                    >
                    <Plus className="w-5 h-5" />
                    Add Transaction
                </button>
                            
            </div>


            {/* mid section */}
            <div className="grid grid-cols-3 gap-12">
                <IncomeCard title="Total Lent" value={totalLent}
                    icon={DollarSign} iconBg="bg-emerald-500/10" iconCol="text-[#00D9B5]"
                    footer={
                        `${lentData.length} entries`
                    }
                />
                <IncomeCard title="Total Borrowed" value={totalBorrow}
                    icon={DollarSign} iconBg="bg-emerald-500/10" iconCol="text-[#e41515d5]"
                    footer={
                        `${borrowData.length} entries`
                    }
                />
                <IncomeCard title="Net Balance" value={totalLent-totalBorrow}
                    icon={DollarSign} iconBg="bg-emerald-500/10" color={color}
                    footer={
                        footer
                    }
                />
            </div>

            {/* bottom section */}
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6 mt-6">
                <div className="flex flex-col border-b border-[#ffffff14] justify-evenly md:flex-row">
                    <button onClick={()=>{
                        setDisplayArray(lentData)
                        setActiveTab("lent")
                    }}
                      className={`pb-3 px-10 text-sm font-medium transition-colors ${
                        activeTab === "lent"
                            ? 'text-[#00d4aa] border-b-2 border-[#00d4aa]'
                            : 'text-gray-400'
                    }`} >Lent
                    </button>

                    <button onClick={()=>{
                        setDisplayArray(borrowData)
                        setActiveTab("borrow")
                    }}
                        className={`pb-3 px-10 text-sm font-medium transition-colors ${
                        activeTab==="borrow"
                            ? 'text-[#00d4aa]  border-b-2 border-[#00d4aa]'
                            : 'text-gray-400'
                    }`} >Borrowed
                    </button>
                </div>
                
                <div>
                    {
                        displayArray.map((entryObject)=>{
                            return(
                                <LoanCard 
                                    key={entryObject.key}
                                    type={entryObject.type}
                                    person={entryObject.person}
                                    amount={entryObject.amount}
                                    date ={entryObject.date}
                                    interestRate={entryObject.interestRate}
                                    term={entryObject.term}
                                    emiAmount={entryObject.emiAmount}
                                    paidEmis={entryObject.paidEmis}
                                    totalEmis={entryObject.totalEmis}
                                    description={entryObject.description}
                                    status={entryObject.status}
                                    color = {activeTab==="lent" ? "#00D9B5" : "#e41515d5"}
                                    bgColor = {activeTab==="lent" ? "#00D4AA1A" : "#2D1F27"}
                                />
                            )
                            
                        })
                    }
                </div>
                

            </div>


        </div>

    )
}

export default Loans;