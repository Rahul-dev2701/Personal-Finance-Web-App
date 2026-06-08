import React from "react";
import { formatCurrency } from "../../utils/functions";
import {User} from "lucide-react"

function LoanCard({
    key,
    type,
    person = 'Rahul Bishnoi',
    amount  = 50000,
    date = '2026-04-15',
    interestRate = 5,
    term,
    emiAmount,
    paidEmis,
    totalEmis,
    description,
    status,
    color,
    bgColor
})

{
    const progress = (paidEmis/totalEmis)*100
    return(
        <div key={key} className={`h-40 rounded-2xl mt-6 bg-[#141920] border shadow-2xl border-white/10 px-6 cursor-pointer hover:brightness-120`}>
            <div className=" flex justify-between mt-4 ">
                <div className="flex content-center gap-2">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center `} style={{backgroundColor: bgColor}}>
                        <User size={20} style={{color}}/>
                    </div>
                    <div>
                        <p className="font-bold text-0.5xl">{person}</p>
                        <p className="text-xs text-gray-400 text-muted-foreground">{description}</p>
                    </div>
                </div>
                <div className=" flex-col content-center h-8 px-6 rounded-4xl block text-sm font-medium text-foreground" style={{backgroundColor:bgColor}}>You {type}</div>
            </div>
            
            <div className="grid grid-cols-5 mt-4" >
                <div>
                        <p className="text-xs text-gray-400 text-muted-foreground">Amount</p>
                        <p className="font-bold text-s">{formatCurrency(amount,0)}</p>
                </div>
                <div>
                        <p className="text-xs text-gray-400 text-muted-foreground">EMI</p>
                        <p className="font-bold text-s">{formatCurrency(emiAmount,0)}</p>
                </div>
                <div>
                        <p className="text-xs text-gray-400 text-muted-foreground">Progress</p>
                        <p className="font-bold text-s">{paidEmis}/{totalEmis}</p>
                </div>
                <div>
                        <p className="text-xs text-gray-400 text-muted-foreground">Interest Rate</p>
                        <p className="font-bold text-s">{interestRate} %p.a.</p>
                </div>

            </div>
            
            <div>
                <p className="text-xs text-gray-400 text-muted-foreground mt-2">Progress</p>
                <div className="w-full h-2 bg-[#242b36] rounded-full overflow-hidden mt-1">
                    <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, backgroundColor:color }}
                    />
                </div>
            </div>
        </div>
    )

}

export default LoanCard