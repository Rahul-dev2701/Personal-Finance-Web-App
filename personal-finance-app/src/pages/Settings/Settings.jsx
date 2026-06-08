
import React from "react";
import { useState, useEffect } from "react";
import {User, Lock} from "lucide-react"

const userName = "User"
const userMail = "usermail@example.com"
const userMobile = "8005556677"
const currPassword = "Idontknow"
const newPassword = "Iwillneverknow"

function Settings(){
    return(
        <div className="p-6">
            {/* top section */}
            <div>
                <h1 className="text-3xl font-bold text-[#e8ecf0]">Settings</h1>
                <p className="text-[#8b92a0] mt-1">Manage your account and preferences</p>
            </div>

            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-2/3 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4AA1A] `} >
                        <User size={20} className="text-[#00D9B5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Profile Information</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" type="text" defaultValue={userName} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" defaultValue={userMail} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" type="text" defaultValue={userMobile} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div>
                        <button
                            className="bg-[#00d4aa] text-[#0a0e14] px-4 py-2 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2">
                            Save Changes
                        </button>
                    </div>
                </div>
                
            </div>

            {/* mid section */}
            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-2/3 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4AA1A] `} >
                        <Lock size={20} className="text-[#00D9B5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Security</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Current Password</label>
                        <input id="currPass" type="password" placeholder="Enter current password" className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">New Password</label>
                        <input id="newPass" type="password" placeholder="Enter new password"  className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Confirm New Password</label>
                        <input id="confirm" placeholder="Confirm new password" type="password" className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" />
                    </div>
                    <div>
                        <button
                            className="bg-[#00d4aa] text-[#0a0e14] px-4 py-2 rounded-lg font-medium hover:bg-[#00d4aa]/90 transition-colors flex items-center gap-2">
                            Change Password
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Settings;
