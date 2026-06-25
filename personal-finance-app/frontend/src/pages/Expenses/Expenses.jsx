import { useState, useEffect } from 'react';
import { Plus, Search, Calendar, DollarSign, FileText, CreditCard } from 'lucide-react';
import { Link } from "react-router-dom";
import { createTransaction } from "../../api/transactions.api.js";
import { getTransactions } from "../../api/transactions.api.js";

function Expenses(){

    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [expenseEntries, setExpenseEntries] = useState([]);

    const expenseCategories = ['Food', 'Rent', 'Electricity', 'Phone Bill', 'OTT Subscription', 'Travel', 'Fuel', 'Shopping', 'Healthcare', 'Other'];
    const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
    
    // const expenseEntries = [
    // { id: 1, amount: 800, date: '2026-05-12', category: 'Food', paymentMethod: 'UPI', remarks: 'Grocery shopping at supermarket' },
    // { id: 2, amount: 20000, date: '2026-05-01', category: 'Rent', paymentMethod: 'Net Banking', remarks: 'Monthly rent payment' },
    // { id: 3, amount: 420, date: '2026-05-08', category: 'Electricity', paymentMethod: 'UPI', remarks: 'Electricity bill for April' },
    // { id: 4, amount: 199, date: '2026-05-05', category: 'OTT Subscription', paymentMethod: 'Credit Card', remarks: 'Netflix monthly subscription' },
    // { id: 5, amount: 1200, date: '2026-05-10', category: 'Travel', paymentMethod: 'Debit Card', remarks: 'Train tickets to Mumbai' },
    // { id: 6, amount: 2500, date: '2026-05-07', category: 'Fuel', paymentMethod: 'Cash', remarks: 'Petrol for car' },
    // ];
    useEffect(() => {
        const fetchExpenseTransactions = async () => {
            try {
                const response = await getTransactions();
                const transactionsArray = response?.data?.data || [];

                const filteredExpenses = transactionsArray
                    .filter((txn) => txn?.type === 'expense')
                    .map((txn) => ({
                        id: txn._id,
                        amount: txn.amount,
                        date: txn.transactionTime,
                        category: txn.category,
                        paymentMethod: txn.paymentMethod,
                        remarks: txn.description
                    }));

                setExpenseEntries(filteredExpenses);
            } catch (error) {
                console.error("Error fetching transactions in Expenses page:", error);
                setExpenseEntries([]);
            }
        };
        fetchExpenseTransactions();
    }, []);

    const addExpenseEntry = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newEntry = {
            amount: Number(formData.get('amount')),
            date: formData.get('date'),
            category: formData.get('category'),
            paymentMethod: formData.get('paymentMethod'),
            remarks: formData.get('remarks'),
        };

        try {
            const response = await createTransaction({
                type: 'expense',
                description: newEntry.remarks,
                category: newEntry.category,
                amount: newEntry.amount,
                paymentMethod: newEntry.paymentMethod,
                transactionTime: newEntry.date,
            });
        } catch (error) {
            console.error("Error adding expense entry:", error);
        }
    };    

    const filteredEntries = expenseEntries
    .filter((entry) => {
      const matchesSearch =
        entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.remarks.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      return 0;
    });

    const totalExpenses = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const categoryBreakdown = expenseCategories.map((cat) => ({
        category: cat,
        total: expenseEntries.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
    }));

    const topCategories = [...categoryBreakdown]
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

    return(
        <div className='p-8'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#e8ecf0]">Expense Entries</h1>
                    <p className="text-[#8b92a0] mt-1">Track all your expenses and spending</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#00d4aa] text-[#0a0e14] px-6 py-3 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2"
                    >
                    <Plus className="w-5 h-5" />
                    Add Expense
                </button>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#8b92a0]">Total Expenses</span>
                    <DollarSign className="w-5 h-5 text-[#ef4444]" />
                </div>
                <div className="text-3xl font-bold text-[#e8ecf0]">₹{totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-[#8b92a0] mt-1">{expenseEntries.length} entries</p>
                </div>

                {topCategories.map((item) => (
                <div key={item.category} className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#8b92a0]">{item.category}</span>
                    </div>
                    <div className="text-2xl font-bold text-[#e8ecf0]">₹{item.total.toLocaleString()}</div>
                    <p className="text-xs text-[#8b92a0] mt-1">
                    {((item.total / totalExpenses) * 100).toFixed(1)}% of total
                    </p>
                </div>
                ))}
            </div>
            
            <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
                        <input
                        type="text"
                        placeholder="Search by category or remarks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                        />
                    </div>
                    <div className='flex gap-3'>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                        >
                            <option value="all">All Categories</option>
                            {expenseCategories.map((cat) => (
                            <option style={{ backgroundColor: "#1b232d", color: "white" }} key={cat} value={cat}>
                                {cat}
                            </option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
                        >
                            <option style={{ backgroundColor: "#1b232d", color: "white" }} value="date">Sort by Date</option>
                            <option style={{ backgroundColor: "#1b232d", color: "white" }} value="amount">Sort by Amount</option>
                        </select>

                        <div className="flex content-center">
                            <Link to="/transactions" className="text-sm text-[#e8ecf0] hover:underline mt-4">View All</Link>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-[#ffffff14]">
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Category</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Payment Method</th>
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
                                {entry.category}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-[#8b92a0]">{entry.paymentMethod}</td>
                            <td className="py-4 px-4 text-sm text-[#8b92a0]">{entry.remarks}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-[#ef4444] text-right">
                                -₹{entry.amount.toLocaleString()}
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
                    <h2 className="text-xl font-bold text-[#e8ecf0] mb-4">Add Expense Entry</h2>
                    <form onSubmit={addExpenseEntry} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#e8ecf0] mb-2">Amount</label>
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
                        <label className="block text-sm font-medium text-[#e8ecf0] mb-2">Date</label>
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
                        {expenseCategories.map((cat) => (
                            <option style={{ backgroundColor: "#1b232d" }} key={cat}>{cat}</option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#e8ecf0] mb-2">Payment Method</label>
                        <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
                        <select name="paymentMethod" className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]">
                            {paymentMethods.map((method) => (
                            <option style={{ backgroundColor: "#1b232d" }} key={method}>{method}</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#e8ecf0] mb-2">Remarks</label>
                        <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-[#8b92a0]" />
                        <textarea
                            placeholder="Add notes about this expense..."
                            name="remarks"
                            rows={3}
                            className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0] resize-none"
                        ></textarea>
                        </div>
                    </div>

                    <div className="bg-[#1a1f28]/50 border border-[#ffffff14] rounded-lg p-4">
                        <p className="text-sm text-[#8b92a0] mb-2">Important Note:</p>
                        <p className="text-xs text-[#8b92a0]">
                        Once submitted, expense entries cannot be edited or deleted. Please ensure all details are correct before submitting.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="flex-1 px-4 py-2 border border-[#ffffff14] rounded-lg hover:bg-[#1a1f28] transition-colors text-[#e8ecf0]"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-[#00d4aa] text-[#0a0e14] rounded-lg hover:bg-[#00d4aa]/90 transition-colors"
                        >
                        Submit Entry
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}

        </div>

    )
}

export default Expenses;