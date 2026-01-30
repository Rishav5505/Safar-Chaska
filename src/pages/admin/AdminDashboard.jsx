import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Map } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6`}>
            <Icon className="w-8 h-8" />
        </div>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">{label}</p>
        <h3 className="text-4xl font-black text-slate-900">{value}</h3>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard label="Total Revenue" value="₹1.2L" icon={TrendingUp} color="bg-emerald-50 text-emerald-500" />
                <StatCard label="Live Bookings" value="24" icon={Calendar} color="bg-blue-50 text-blue-500" />
                <StatCard label="Total Packages" value="12" icon={Map} color="bg-primary/10 text-primary" />
                <StatCard label="Active Users" value="840" icon={Users} color="bg-amber-50 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
                    <h3 className="text-xl font-bold mb-8 text-slate-900 leading-tight tracking-tight">Recent Bookings</h3>
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Calendar className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-medium italic text-center">Connected to database. <br />Fetching live data soon...</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
                    <h3 className="text-xl font-bold mb-8 text-slate-900 leading-tight tracking-tight">Popular Destinations</h3>
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Map className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-medium italic text-center">Connected to database. <br />Fetching live data soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
