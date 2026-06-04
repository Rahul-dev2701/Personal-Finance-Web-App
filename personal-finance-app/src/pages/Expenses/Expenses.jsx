import { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, FileText, CreditCard } from 'lucide-react';


function Expenses(){
    return(
        <div className='p-8'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#e8ecf0]">Expense Entries</h1>
                    <p className="text-[#8b92a0] mt-1">Track all your expenses and spending</p>
                </div>
                <button
                    className="bg-[#00d4aa] text-[#0a0e14] px-6 py-3 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2"
                    >
                    <Plus className="w-5 h-5" />
                    Add Expense
                </button>
                
            </div>
        </div>

    )
}

export default Expenses;