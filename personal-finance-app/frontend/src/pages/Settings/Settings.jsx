
import React from "react";
import { useState, useEffect } from "react";
import {User, Lock, Bell, Download, LogOut, Trash2, Camera} from "lucide-react"
import SlidingKnob from "../../components/settings_card";
import { useContext } from "react";
import authContext from "../../context/authContext.js";
import { deleteProfilePicture, logoutUser, updateProfilePicture, updateProfile } from "../../api/auth.api.js";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

const DEFAULT_PFP =
    "https://res.cloudinary.com/dhdrljlsi/image/upload/v1782215305/WhatsApp_Image_2026-06-23_at_16.38.40_ta89wp.jpg"

function Settings(){

    //for display profile
    const { user, loading, setUser } = useContext(authContext);
    if(loading){
        return <div>Loading...</div>
    }
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        mobile: "",
    });
    

    //for profile photo
    const [profilePhoto, setProfilePhoto] = useState(user.profilePicture || null)

    const [isUploading, setIsUploading] = useState(false);
    
    //for profile update
    const [isEditing, setIsEditing] = useState(false);

    //prifle pic update
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert("No file chosen");
            return;
        }

        const formData = new FormData();
        formData.append("profilePicture", file);
        setIsUploading(true)
       try {
         const res = await updateProfilePicture(formData);
         
         if (res.data.success) {
            setProfilePhoto(res.data.data);
         }
       } catch (error) {
            console.log(error?.message)
       }finally{
            setIsUploading(false);
       }
};

    // dlt profile pic
    const dltProfilePic = async () => {
        setIsUploading(true)
       try {
         const res = await deleteProfilePicture();
         
         if (res.data.success) {
            setProfilePhoto(res.data.data);
         }
       } catch (error) {
            console.log(error?.message)
       }finally{
            setIsUploading(false);
       }
};

    // logout
    const navigate = useNavigate();

    const logout = async ()=>{
        try {
        const res = await logoutUser()
        if (res.data.success) {

            setUser(null)
            navigate("/login");
        }
        } catch (error) {
            console.log(error?.message)
        }
    }

    //update profile
    //set profile values whenever user changes
    useEffect(() => {
    if (user) {
        setFormData({
            username: user.username || "",
            fullName: user.fullName || "",
            email: user.email || "",
            mobile: user.mobile || "",
        });
        }
    }, [user]);

    const updtProfile = async ()=>{
        try {
        const res = await updateProfile(formData)
        if (res.data.success) {
            setUser(res.data.data)
            setIsEditing(false)
        }
        } catch (error) {
            alert(error?.response?.data?.message|| "Something went wrong.");
        }
    }

    return(
        <div className="p-6">
            {/* top section */}
            <div>
                <h1 className="text-3xl font-bold text-[#e8ecf0]">Settings</h1>
                <p className="text-[#8b92a0] mt-1">Manage your account and preferences</p>
            </div>

            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-7/10 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4AA1A] `} >
                        <User size={20} className="text-[#00D9B5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Profile Information</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    {/*Profile photo*/}
                    <div className="border border-white/10 rounded-xl bg-[#161c24] p-5">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="relative w-24 h-24" >
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-[#ffffff0d] flex items-center justify-center">
                                        {profilePhoto? (<img
                                            src={profilePhoto}
                                            alt="Profile Photo"
                                            className="w-full h-full object-cover"
                                        />): (
                                            <User size={40} className="text-gray-400"/>
                                        )}
                                    </div>
                                    {/* spinner */}
                                    {isUploading && (
                                        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}

                                </div>
                                
                                <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00d4aa] flex items-center justify-center cursor-pointer hover:brightness-110">
                                    <Camera size={16} className="text-[#0a0e14]"/>
                                </label>
                            </div>

                            <div>
                                <h3 className="font-medium text-[#e8ecf0]">
                                    Profile Photo
                                </h3>
                                <p className="text-sm text-[#8b92a0] mt-1">
                                    Upload a JPG, PNG or WebP image
                                </p>
                                
                                <div className="flex gap-4">
                                    <label htmlFor="profilePhoto" className="inline-block mt-3 px-4 py-2 rounded-lg bg-[#00d4aa] text-[#0a0e14] font-medium cursor-pointer hover:bg-[#00d4aa]/90 transition-colors">
                                    Choose Photo
                                    </label>

                                   
                                        {profilePhoto !== DEFAULT_PFP && (
                                             <label className="inline-block mt-3 px-4 py-2 rounded-lg bg-[#00d4aa] text-[#0a0e14] font-medium cursor-pointer hover:bg-[#00d4aa]/90 transition-colors">
                                                <button onClick={dltProfilePic} className="cursor-pointer">Delete Profile Photo</button>
                                             </label>

                                        )}
                                   
                                    

                                </div>
                                
                                <input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Username</label>
                        <input 
                            disabled={!isEditing} 
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }} 
                            id="username" type="text" value={formData.username} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            disabled={!isEditing}
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value,
                                })
                            }}
                            id="fullName" type="text" value={formData.fullName} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10"
                         />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input 
                            disabled={!isEditing}
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }}  
                            id="email" type="email" value={formData.email} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" 
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            disabled={!isEditing} 
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    mobile: e.target.value,
                                })
                            }}
                            id="phone" type="text" value={formData.mobile} className=" px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#00d4aa] bg-[#ffffff0d]  border border-white/10" 
                        />
                    </div>
                    <div className="flex gap-4">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#00d4aa] text-[#0a0e14] px-4 py-2 rounded-lg font-medium"
                            >
                                Update Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={updtProfile}
                                    className="bg-[#00d4aa] text-[#0a0e14] px-4 py-2 rounded-lg font-medium"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
            </div>

            {/* mid section */}
            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-7/10 border shadow-2xl border-white/10`}>
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

            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-7/10 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4AA1A] `} >
                        <Bell size={20} className="text-[#00D9B5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Notifications</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between gap-2 mt-2 p-2 border-b border-white/10">
                        <div>
                            <p className="font-semi-bold text-0.5xl">Due Payment Reminders</p>
                            <p className="text-xs text-gray-400 text-muted-foreground">Get notified about upcoming EMI payments</p>
                        </div>
                        <SlidingKnob/>
                        
                    </div>
                    <div className="flex justify-between gap-2 mt-2  p-2 border-b border-white/10">
                        <div>
                            <p className="font-semi-bold text-0.5xl">Transaction Alerts</p>
                            <p className="text-xs text-gray-400 text-muted-foreground">Get notified for every transaction</p>
                        </div>
                        <SlidingKnob/>
                        
                    </div>
                    <div className="flex justify-between gap-2 p-2 mt-2 border-b border-white/10">
                        <div>
                            <p className="font-semi-bold text-0.5xl">Monthly Reports</p>
                            <p className="text-xs text-gray-400 text-muted-foreground">Receive monthly financial summary</p>
                        </div>
                        <SlidingKnob/>
                        
                    </div>
                </div>
                
            </div>

            {/* bottom section */}
            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-7/10 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#00D4AA1A] `} >
                        <Download size={20} className="text-[#00D9B5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Data Management</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 ">
                    <button>
                        <div className="flex justify-between gap-2 border bg-[#161c24] border-white/10 rounded-xl p-3 hover:brightness-120 cursor-pointer">
                        <div className="font-semi-bold text-l" >Export all data</div>
                            <Download size={20} className="text-gray-400 cursor-pointer"/>
                    
                        </div>
                    </button>
                    
                    <button>
                        <div className="flex justify-between gap-2 border bg-[#161c24] border-white/10 rounded-xl p-3 hover:brightness-120 cursor-pointer">
                            <div className="font-semi-bold text-l" >Download Monthly Report</div>
                            <Download size={20} className="text-gray-400 cursor-pointer"/>
                            </div>
                    </button>
                </div>
                
            </div>
            <div className={`rounded-2xl mt-6 p-6 bg-[#141920] w-7/10 border shadow-2xl border-white/10`}>
                <div className="flex gap-4 mt-4">
                    <div  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#2D1F27] `} >
                        <Trash2 size={20} className="text-[#e41515d5]"/>
                        
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-semibold text-foreground">Danger Zone</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 ">
                        <div className="flex justify-between items-center gap-2 border bg-[#161c24] border-white/10 rounded-xl p-3 hover:brightness-120">
                            <div>
                                <p className="font-semi-bold text-0.5xl">Log Out</p>
                                <p className="text-xs text-gray-400 text-muted-foreground">Sign out of your account</p>
                            </div>
                            <button onClick={logout} className="cursor-pointer"> <LogOut size={20}/></button>
                        </div>
                    
                        <div className="flex justify-between items-center gap-2 border  bg-[#2D1F27] border-red-400 rounded-xl p-3 hover:brightness-120 text-[#e41515d5]">
                            <div>
                                <p className="font-semi-bold text-0.5xl">Delete Account</p>
                                <p className="text-xs  text-muted-foreground">Permanently delete your account and all associated data</p>
                            </div>
                            <button className="cursor-pointer"><Trash2 size={20} className="text-[#e41515d5]"/></button>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default Settings;
