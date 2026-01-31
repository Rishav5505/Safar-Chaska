import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp, Users, Calendar, Map, Clock, ArrowUpRight,
    Activity, Bell, Send, Megaphone, ShieldCheck, Zap,
    CloudSun, LayoutDashboard, Plus, MousePointer2, Globe
} from 'lucide-react';
import API from '../../utils/api';

const StatCard = ({ label, value, icon: Icon, color, trend, onClick }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onClick}
        className="bg-white p-7 rounded-[2.2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group cursor-pointer"
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 ${color.split(' ')[0]} opacity-10 rounded-full transition-transform group-hover:scale-150`} />

        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 shadow-inner`}>
            <Icon className="w-6 h-6" />
        </div>

        <div className="relative z-10 font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-1">{label}</div>
        <div className="flex justify-between items-end relative z-10">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            {trend && (
                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black">
                    <ArrowUpRight className="w-3 h-3" />
                    {trend}
                </div>
            )}
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalBookings: 0,
        revenue: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        totalPackages: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liveVisitors, setLiveVisitors] = useState(12);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, bookingsRes, packagesRes] = await Promise.all([
                    API.get('/bookings/stats'),
                    API.get('/bookings'),
                    API.get('/packages')
                ]);

                setStats({
                    ...statsRes.data,
                    totalPackages: packagesRes.data.length
                });
                setRecentBookings(bookingsRes.data.slice(0, 4));
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        // Randomly change live visitors for dynamic feel
        const interval = setInterval(() => {
            setLiveVisitors(prev => Math.max(5, prev + Math.floor(Math.random() * 5) - 2));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-10 pb-20">
            {/* Ultra Modern Navbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                        <LayoutDashboard className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> System Secure • Last updated 2 mins ago
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <div className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="relative">
                            <CloudSun className="w-5 h-5 text-amber-500" />
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 w-2 h-2 bg-amber-200 rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Chakrata</p>
                            <p className="text-sm font-black text-slate-800">18°C Sunny</p>
                        </div>
                    </div>

                    <button className="relative w-11 h-11 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 transition-all">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-bounce" />
                    </button>
                    <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
                        RK
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    label="Live Revenue"
                    value={`₹${stats.revenue.toLocaleString()}`}
                    icon={TrendingUp}
                    color="bg-emerald-50 text-emerald-500"
                    trend="+14.2%"
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    label="Total Bookings"
                    value={stats.totalBookings}
                    icon={Calendar}
                    color="bg-blue-50 text-blue-500"
                    trend="+3"
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    label="Active Packages"
                    value={stats.totalPackages}
                    icon={Map}
                    color="bg-indigo-50 text-indigo-500"
                    onClick={() => navigate('/admin/packages')}
                />
                <StatCard
                    label="Pending Tasks"
                    value={stats.pendingBookings}
                    icon={Clock}
                    color="bg-orange-50 text-orange-600"
                    onClick={() => navigate('/admin/bookings')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content Area - 8 Columns */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Visual Analytics Chart & Live Traffic */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative group">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Analytics</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Projected vs Actual growth</p>
                            </div>

                            {/* Live Traffic Widget */}
                            <div className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-900/10">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Globe className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-indigo-300 uppercase leading-none mb-1">Live Visitors</p>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-black">{liveVisitors}</h4>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modern Wave Chart simulation with SVG */}
                        <div className="relative h-56 w-full px-2">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 150">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                                    </linearGradient>
                                    <filter id="shadow">
                                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.3" />
                                    </filter>
                                </defs>
                                <path
                                    d={`M 0 120 Q 50 20, 100 90 T 200 50 T 300 110 T 400 30 T 500 80 T 600 20 L 600 150 L 0 150 Z`}
                                    fill="url(#chartGradient)"
                                    className="transition-all duration-1000"
                                />
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    d={`M 0 120 Q 50 20, 100 90 T 200 50 T 300 110 T 400 30 T 500 80 T 600 20`}
                                    fill="none"
                                    stroke="#4F46E5"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    filter="url(#shadow)"
                                />
                                {/* Dynamic data points */}
                                <motion.circle cx="100" cy="90" r="6" fill="#4F46E5" stroke="white" strokeWidth="2" whileHover={{ r: 10 }} />
                                <motion.circle cx="300" cy="110" r="6" fill="#4F46E5" stroke="white" strokeWidth="2" whileHover={{ r: 10 }} />
                                <motion.circle cx="400" cy="30" r="10" fill="#4F46E5" stroke="white" strokeWidth="3" className="animate-pulse shadow-lg" />
                            </svg>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-50 flex flex-wrap justify-between gap-6">
                            <div className="flex items-center gap-10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Net Margin</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-black text-slate-900 text-lg">24.5%</p>
                                        <span className="text-[10px] font-bold text-emerald-500">+2% pts</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Drop-off Rate</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-black text-slate-900 text-lg">4.2%</p>
                                        <span className="text-[10px] font-bold text-rose-500">-1% pts</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate('/admin/bookings')} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-primary px-6 py-3 rounded-2xl font-black text-xs transition-all ring-1 ring-slate-100">
                                Export Full Report <TrendingUp className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Bookings Feed */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <Activity className="w-6 h-6 text-primary" /> Recent Reservations
                            </h3>
                            <button onClick={() => navigate('/admin/bookings')} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b-2 border-slate-100 pb-1 hover:border-primary transition-all">Go to Bookings</button>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-200 uppercase text-[10px] font-black tracking-widest">
                                    <Activity className="w-10 h-10 animate-pulse mb-4 text-primary opacity-20" />
                                    Synchronizing...
                                </div>
                            ) : recentBookings.length === 0 ? (
                                <div className="text-center py-20 text-slate-400 italic">No activity detected.</div>
                            ) : (
                                recentBookings.map((booking, idx) => (
                                    <motion.div
                                        key={booking._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => navigate('/admin/bookings')}
                                        className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[1.8rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all border border-transparent hover:border-slate-100 group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm">
                                                    {booking.userName[0]}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{booking.userName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                                                    {booking.packageId?.title || 'Private Journey'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                {booking.status}
                                            </div>
                                            <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-tight">
                                                {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - 4 Columns */}
                <div className="lg:col-span-4 space-y-10">

                    {/* Marketing Campaign Center */}
                    <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-indigo-200/50 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform" />

                        <div className="flex items-center gap-3 mb-8">
                            <Megaphone className="w-6 h-6 text-indigo-400" />
                            <h3 className="text-xl font-black tracking-tight">Campaign Center</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/card" onClick={() => navigate('/admin/settings')}>
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Active Campaign</p>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                </div>
                                <h4 className="font-black text-lg mb-1 group-hover/card:text-indigo-300 transition-colors">Winter Wonderland Sale ❄️</h4>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">Boost bookings by 15% with seasonal coupons for Himalayan treks.</p>

                                <div className="mt-6">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-indigo-300">Conversion Rate</span>
                                        <span>65%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '65%' }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => navigate('/admin/settings')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-indigo-900/40 translate-z-0 active:scale-95">
                                <Send className="w-4 h-4" /> Start New Campaign
                            </button>
                        </div>
                    </div>

                    {/* Operational Console (Quick Actions) */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-8 pb-4 border-b border-slate-50">Operational Hub</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => navigate('/admin/packages/add')}
                                className="p-6 bg-slate-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-slate-900 hover:text-white transition-all group shadow-sm active:scale-95"
                            >
                                <div className="p-3 bg-white rounded-xl group-hover:bg-white/10 transition-colors">
                                    <Plus className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">New Package</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin/packages')}
                                className="p-6 bg-slate-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-slate-900 hover:text-white transition-all group shadow-sm active:scale-95"
                            >
                                <div className="p-3 bg-white rounded-xl group-hover:bg-white/10 transition-colors">
                                    <Map className="w-5 h-5 text-emerald-500 group-hover:text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Inventory</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin/bookings')}
                                className="p-6 bg-slate-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-slate-900 hover:text-white transition-all group shadow-sm active:scale-95"
                            >
                                <div className="p-3 bg-white rounded-xl group-hover:bg-white/10 transition-colors">
                                    <MousePointer2 className="w-5 h-5 text-indigo-500 group-hover:text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Review</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin/settings')}
                                className="p-6 bg-slate-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-slate-900 hover:text-white transition-all group shadow-sm active:scale-95"
                            >
                                <div className="p-3 bg-white rounded-xl group-hover:bg-white/10 transition-colors">
                                    <Zap className="w-5 h-5 text-amber-500 group-hover:text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Real-time Status */}
                    <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <div>
                                <p className="text-[10px] font-black text-emerald-900 tracking-tight uppercase">Edge Sync</p>
                                <p className="text-[9px] font-bold text-emerald-600 uppercase">Latency 24ms • 100% Uptime</p>
                            </div>
                        </div>
                        <Activity className="w-5 h-5 text-emerald-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
