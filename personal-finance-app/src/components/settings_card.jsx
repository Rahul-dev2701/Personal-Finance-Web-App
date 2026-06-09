import React from "react";
import { formatCurrency } from "../../utils/functions";
import {User} from "lucide-react"

function SlidingKnob(){
    return(
        <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            className="sr-only peer"
        />

        <div
            className="relative w-11 h-6 rounded-full bg-[#2a3340]
                    transition-colors duration-200
                    peer-checked:bg-[#00D9B5]

                    after:content-['']
                    after:absolute
                    after:top-0.5
                    after:left-0.5
                    after:w-5
                    after:h-5
                    after:bg-white
                    after:rounded-full
                    after:transition-transform
                    after:duration-200
                    peer-checked:after:translate-x-5"
        />
        </label>
    )
}

export default SlidingKnob