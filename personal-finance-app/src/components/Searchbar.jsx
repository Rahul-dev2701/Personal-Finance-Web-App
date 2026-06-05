import React from "react";
import { Search, Bell } from "lucide-react";

function Searchbar(){
    return(
    <div className="fixed top-0 left-70 right-0 z-1 flex items-center justify-between h-16 bg-[#141920] border-b border-white/10 px-6">
        <div className="relative">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
                placeholder="Search Transactions..."
                type="text"
                className="bg-[#20252B] w-120 py-2 pl-12 pr-4 rounded-lg text-white outline-none"
            />
            
        </div>
        <button className="cursor-pointer">
            <Bell size={20} className="text-gray-400" />
        </button>
        

    </div>
    )
}

export default Searchbar;