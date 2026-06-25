import { useState, useEffect } from "react";
import { formatCurrency } from "../../../utils/functions";
import Stat_card from "../../components/Stat_card";
import { Search, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { getTransactions } from "../../api/transactions.api.js";

function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        
        let transactionsArray = [];
        if (response && response.data) {
          transactionsArray = Array.isArray(response.data) ? response.data : (response.data.data || []);
        } else if (Array.isArray(response)) {
          transactionsArray = response;
        }

        setAllTransactions(transactionsArray);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setAllTransactions([]);
      }
    };

    fetchTransactions();
  }, []);


  const safeTransactions = Array.isArray(allTransactions) ? allTransactions : [];

  const filteredTransactions = safeTransactions
    .filter((txn) => {
      const descriptionText = txn?.description || '';
      const categoryText = txn?.category || '';

      const matchesSearch =
        descriptionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryText.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || txn?.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.transactionTime || 0).getTime() - new Date(a.transactionTime || 0).getTime();
      }
      if (sortBy === 'amount') {
        return Math.abs(b.amount || 0) - Math.abs(a.amount || 0);
      }
      return 0;
    });

  const totalIncome = safeTransactions
    .filter((t) => t?.type === 'income')
    .reduce((sum, t) => sum + (t?.amount || 0), 0);

  const totalExpense = Math.abs(
    safeTransactions
      .filter((t) => t?.type === 'expense')
      .reduce((sum, t) => sum + (t?.amount || 0), 0)
  );

  const incomeCount = safeTransactions.filter((t) => t?.type === 'income').length;
  const expenseCount = safeTransactions.filter((t) => t?.type === 'expense').length;

  return (
    <div className="p-8">
      {/* Top section */}
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

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Stat_card
          title="Total Income"
          value={formatCurrency(totalIncome)}
          transactionCount={incomeCount}
          icon={TrendingUp}
          color="text-[#00d4aa]"
        />

        <Stat_card
          title="Total Expenses"
          value={formatCurrency(totalExpense)}
          transactionCount={expenseCount}
          icon={TrendingDown}
          color="text-[#ef4444]"
        />
      </div>

      {/* Control Filters & Table Container */}
      <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b92a0]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
            >
              <option style={{ backgroundColor: "#1b232d" }} value="all">All Types</option>
              <option style={{ backgroundColor: "#1b232d" }} value="income">Income Only</option>
              <option style={{ backgroundColor: "#1b232d" }} value="expense">Expenses Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#ffffff0d] border border-[#ffffff14] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4aa] text-[#e8ecf0]"
            >
              <option style={{ backgroundColor: "#1b232d" }} value="date">Sort by Date</option>
              <option style={{ backgroundColor: "#1b232d" }} value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        {/* Transactions Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ffffff14]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#8b92a0]">Category</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#8b92a0]">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn._id} className="border-b border-[#ffffff14] hover:bg-[#1a1f28]/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-[#e8ecf0]">
                    {txn.transactionTime ? new Date(txn.transactionTime).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : 'N/A'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {txn.type === 'income' ? (
                        <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-[#00d4aa]" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-[#ef4444]/10 flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-[#e8ecf0] capitalize">{txn.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-[#e8ecf0]">
                    {txn.description}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#1a1f28] text-xs font-medium text-[#e8ecf0]">
                      {txn.category}
                    </span>
                  </td>
                  <td className={`py-4 px-4 text-sm font-semibold text-right ${
                    txn.type === 'income' ? 'text-[#00d4aa]' : 'text-[#ef4444]'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}₹{Math.abs(txn.amount || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Overlay */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b92a0]">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;