import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import API from '../../utils/api';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await API.get('/bookings');
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            await API.put(`/bookings/${id}/status`, { status: newStatus });
            // Update local state
            setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
            case 'cancelled': return 'text-rose-500 bg-rose-50 border-rose-100';
            default: return 'text-amber-500 bg-amber-50 border-amber-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return CheckCircle;
            case 'cancelled': return XCircle;
            default: return AlertCircle;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (booking.packageId && booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFilter = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage all traveler reservations.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm">
                        Export CSV
                    </button>
                    <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        New Booking
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by name, email or package..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
                    />
                </div>
                <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                    {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                        <button
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode='popLayout'>
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-slate-400 italic">
                            <Clock className="w-10 h-10 animate-spin mx-auto mb-4 opacity-20" />
                            Loading bookings...
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400">
                            No bookings matching your filters.
                        </div>
                    ) : filteredBookings.map((booking, idx) => {
                        const StatusIcon = getStatusIcon(booking.status);
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                key={booking._id}
                                className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                                    {/* Left: Traveler Info */}
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-slate-900/10">
                                            {booking.userName[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">
                                                {booking.userName}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                                                    <Mail className="w-3.5 h-3.5" /> {booking.email}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                                                    <Phone className="w-3.5 h-3.5" /> {booking.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Journey Info */}
                                    <div className="flex-1 px-8 border-x border-slate-50 py-2">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Travel Date</p>
                                                    <p className="font-bold text-slate-900">{new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg">
                                                    <User className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Guests</p>
                                                    <p className="font-bold text-slate-900">{booking.guests} People</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Status & Actions */}
                                    <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            {booking.status}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                                                        disabled={updatingId === booking._id}
                                                        className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all disabled:opacity-50"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                                                        disabled={updatingId === booking._id}
                                                        className="px-4 py-2.5 bg-white border border-rose-100 text-rose-500 rounded-xl text-xs font-black hover:bg-rose-50 transition-all disabled:opacity-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            {booking.status !== 'pending' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(booking._id, 'pending')}
                                                    className="px-4 py-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                                                >
                                                    Revert to Pending
                                                </button>
                                            )}
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {booking.specialRequests && (
                                    <div className="mt-8 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex gap-4">
                                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                        <p className="text-sm text-slate-600 italic font-medium">"{booking.specialRequests}"</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminBookings;
