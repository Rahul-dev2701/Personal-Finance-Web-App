import React from 'react'

function Stat_card({ title, value, transactionCount,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-[#141920] border border-[#ffffff14] rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#8b92a0]">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`text-3xl font-bold ${color}`}>
        {value}
      </div>
      <p className="text-xs text-[#8b92a0] mt-1">
        {transactionCount} transactions
      </p>
    </div>
  );
}
export default Stat_card
