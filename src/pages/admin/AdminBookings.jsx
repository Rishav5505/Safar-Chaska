import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';
import API from '../../utils/api';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredBookings = bookings.filter(booking =>
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.packageId && booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage all traveler reservations.</p>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or package..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">Traveler</th>
                                <th className="px-8 py-6">Package</th>
                                <th className="px-8 py-6">Date & Guests</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        Loading bookings...
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : filteredBookings.map((booking) => {
                                const StatusIcon = getStatusIcon(booking.status);
                                return (
                                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">
                                                    {booking.userName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 leading-tight">{booking.userName}</p>
                                                    <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {new Date(booking.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-slate-700">
                                            {booking.packageId ? booking.packageId.title : 'Deleted Package'}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    {new Date(booking.travelDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                    <User className="w-3 h-3" /> {booking.guests} Guests
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
                                                    <span className="text-sm font-bold">{booking.phone}</span>
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                    <span>{booking.email}</span>
                                                    <Mail className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
