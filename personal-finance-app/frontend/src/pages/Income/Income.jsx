import React, { useEffect } from "react";
import { useState } from "react";
import { Plus, DollarSign, Search, Calendar, FileText } from "lucide-react"; 
import { IncomeCard } from "../../components/inc_card";
import { Link } from "react-router-dom";
import { createTransaction } from "../../api/transactions.api.js";
import { getTransactions } from "../../api/transactions.api.js";

// const incomeEntries = [
//     { id: 1, amount: 25000, date: '2026-05-10', source: 'Salary', remarks: 'Monthly salary deposit' },
//     { id: 2, amount: 8500, date: '2026-05-03', source: 'Freelance', remarks: 'Website development project' },
//     { id: 3, amount: 3200, date: '2026-04-28', source: 'Investment', remarks: 'Dividend payment from stocks' },
//     { id: 4, amount: 1500, date: '2026-04-25', source: 'Side Business', remarks: 'Product sales' },
//     { id: 5, amount: 4200, date: '2026-04-20', source: 'Freelance', remarks: 'Logo design work' },
// ];


function Income() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [showAddModal, setShowAddModal] = useState(false);
    const [incomeEntries, setIncomeEntries] = useState([]);

    // setIncomeEntries(Transactions.allTransactions.filter((txn) => txn.type === 'income').map((txn) => ({
    //     id: txn._id,
    //     amount: txn.amount,
    //     date: txn.transactionTime,
    //     source: txn.category,
    //     remarks: txn.description
    // })));

    useEffect(() => {
        const fetchIncomeTransactions = async () => {
            try {
                const response = await getTransactions();
                const transactionsArray = response?.data?.data || [];

                const filteredIncome = transactionsArray
                    .filter((txn) => txn?.type === 'income')
                    .map((txn) => ({
                        id: txn._id,
                        amount: txn.amount,
                        date: txn.transactionTime,
                        source: txn.category,
                        remarks: txn.description
                    }));

                setIncomeEntries(filteredIncome);
            } catch (error) {
                console.error("Error fetching transactions in Income page:", error);
                setIncomeEntries([]);
            }
        };
        fetchIncomeTransactions();
    }, []);
    
    const incomeCurrentMonth = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const noOfEntries = incomeEntries.length;

    const addIncomeEntry = async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(e.target);
        const newEntry = {
            amount: Number(formData.get("amount")),
            date: formData.get("date"),
            source: formData.get("category"),
            remarks: formData.get("remarks"),
        };

        try {
            const response = await createTransaction({
                type: 'income',
                description: newEntry.remarks,
                category: newEntry.source,
                amount: newEntry.amount,
                transactionTime: newEntry.date,
            });
        } catch (error) {
            console.error("Error adding income entry:", error);
        }
    };

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

    return (
        <div className='p-8'>
            {/* Top section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#e8ecf0]">Income Entries</h1>
                    <p className="text-[#8b92a0] mt-1">Track all your income sources</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#00d4aa] text-[#0a0e14] px-6 py-3 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Income
                </button>
            </div>

            {/* Middle section */}
            <div className="grid grid-cols-4">
                <IncomeCard 
                    title="Total Balance" 
                    value={incomeCurrentMonth}
                    icon={DollarSign} 
                    iconBg="bg-emerald-500/10" 
                    iconCol="text-[#00D9B5]"
                    footer={`${noOfEntries} entries`}
                />
            </div>

            {/* End section */}
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6 mt-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            <option style={{ backgroundColor: "#1b232d", color: "white" }} value="date">Sort by Date</option>
                            <option style={{ backgroundColor: "#1b232d", color: "white" }} value="amount">Sort by Amount</option>
                        </select>
                        
                        <div className="flex items-center">
                            <Link to="/transactions" className="text-sm text-[#00D9B5] hover:underline">View All</Link>
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

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-[#e8ecf0] mb-4">Add Income Entry</h2>
                        <form className="space-y-4" onSubmit={addIncomeEntry}>
                            <div>
                                <label className="block text-sm font-medium text-[#8b92a0] mb-2">Amount</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
                                    <input
                                        name="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8b92a0] mb-2">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
                                    <input
                                        name="date"
                                        type="date"
                                        className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8b92a0] mb-2">Category</label>
                                <select name="category" className="w-full px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]">
                                    <option style={{ backgroundColor: "#1b232d" }}>Salary</option>
                                    <option style={{ backgroundColor: "#1b232d" }}>Freelance</option>
                                    <option style={{ backgroundColor: "#1b232d" }}>Investment</option>
                                    <option style={{ backgroundColor: "#1b232d" }}>Side Business</option>
                                    <option style={{ backgroundColor: "#1b232d" }}>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8b92a0] mb-2">Remarks</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 w-5 h-5 text-[#8b92a0]" />
                                    <textarea
                                        name="remarks"
                                        placeholder="Add notes about this income..."
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0] resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="bg-[#ffffff05] border border-[#ffffff14] rounded-lg p-4">
                                <p className="text-sm text-[#e8ecf0] mb-2">Important Note:</p>
                                <p className="text-xs text-[#8b92a0]">
                                    Once submitted, income entries cannot be edited or deleted. Please ensure all details are correct before submitting.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border border-[#ffffff14] rounded-lg hover:bg-[#ffffff0d] transition-colors text-[#e8ecf0]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#00d4aa] text-[#0a0e14] font-medium rounded-lg hover:bg-[#00d4aa]/90 transition-colors"
                                >
                                    Submit Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Income;