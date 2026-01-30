import React from 'react';
import { Settings, User, Bell, Shield, Lock } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
                <p className="text-slate-500 mt-1">Manage your administrative preferences and account security.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-900 font-bold hover:border-primary transition-all">
                        <User className="w-5 h-5 text-primary" /> Profile Details
                    </button>
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 font-bold opacity-50 cursor-not-allowed">
                        <Lock className="w-5 h-5" /> Change Password
                    </button>
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 font-bold opacity-50 cursor-not-allowed">
                        <Bell className="w-5 h-5" /> Notifications
                    </button>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-8 text-slate-900 leading-tight tracking-tight">Admin Profile</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" readOnly value="Safar Chaska Admin" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none font-medium text-slate-500" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input type="email" readOnly value="admin@safarchaska.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none font-medium text-slate-500" />
                            </div>
                            <div className="pt-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold uppercase tracking-widest">
                                    <Shield className="w-4 h-4" /> Role: Super Administrator
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
