import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Calendar, Clock, Users, Mail, Phone, CheckCircle, XCircle, AlertCircle,
    Download, Loader2, Hash, IndianRupee, MessageSquareText, ChevronDown, Package as PackageIcon, RefreshCw, Inbox,
} from 'lucide-react';
import API from '../../utils/api';
import { formatINR } from '../../utils/format';

const STATUS = {
    pending: { label: 'Pending', icon: AlertCircle, badge: 'text-amber-600 bg-amber-50 border-amber-100', active: 'bg-amber-500 text-white' },
    confirmed: { label: 'Confirmed', icon: CheckCircle, badge: 'text-emerald-600 bg-emerald-50 border-emerald-100', active: 'bg-emerald-500 text-white' },
    cancelled: { label: 'Cancelled', icon: XCircle, badge: 'text-rose-600 bg-rose-50 border-rose-100', active: 'bg-rose-500 text-white' },
};

const fmtDate = (d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
    const date = new Date(d);
    return isNaN(date) ? '—' : date.toLocaleDateString('en-IN', opts);
};

const bookingTotal = (b) => Number(b.totalPrice) || (Number(b.packageId?.price) || 0) * (Number(b.guests) || 1);

const Meta = ({ icon: Icon, label, children }) => (
    <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {label}
        </p>
        <p className="mt-1 font-semibold text-slate-900 truncate">{children}</p>
    </div>
);

const Requests = ({ text }) => {
    const [open, setOpen] = useState(false);
    const long = text.length > 140;
    return (
        <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3">
            <MessageSquareText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="min-w-0 flex-1">
                <p className={`text-sm text-slate-600 break-words whitespace-pre-line ${!open && long ? 'line-clamp-2' : ''}`}>{text}</p>
                {long && (
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    >
                        {open ? 'Show less' : 'Read more'} <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
};

const toCSV = (rows) => {
    const header = ['Ref', 'Name', 'Email', 'Phone', 'Package', 'Travel date', 'Guests', 'Total (INR)', 'Status', 'Special requests', 'Created'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines = rows.map((b) => [
        b.bookingRef, b.userName, b.email, b.phone, b.packageId?.title || '',
        fmtDate(b.travelDate), b.guests, bookingTotal(b), b.status, b.specialRequests, fmtDate(b.createdAt),
    ].map(esc).join(','));
    return [header.map(esc).join(','), ...lines].join('\n');
};

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);
    const [rowError, setRowError] = useState({});

    const fetchBookings = async () => {
        setLoading(true);
        setLoadError('');
        try {
            const { data } = await API.get('/bookings');
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            setLoadError(error?.response?.data?.message || 'Could not load bookings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        setRowError((e) => ({ ...e, [id]: '' }));
        try {
            await API.put(`/bookings/${id}/status`, { status: newStatus });
            setBookings((list) => list.map((b) => (b._id === id ? { ...b, status: newStatus } : b)));
        } catch (error) {
            setRowError((e) => ({ ...e, [id]: error?.response?.data?.message || 'Failed to update status' }));
        } finally {
            setUpdatingId(null);
        }
    };

    const counts = useMemo(() => {
        const c = { all: bookings.length, pending: 0, confirmed: 0, cancelled: 0, value: 0 };
        bookings.forEach((b) => {
            c[b.status] = (c[b.status] || 0) + 1;
            if (b.status === 'confirmed') c.value += bookingTotal(b);
        });
        return c;
    }, [bookings]);

    const filteredBookings = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return bookings.filter((b) => {
            const matchesSearch = !q || [b.userName, b.email, b.phone, b.bookingRef, b.packageId?.title]
                .some((f) => f && String(f).toLowerCase().includes(q));
            return matchesSearch && (statusFilter === 'all' || b.status === statusFilter);
        });
    }, [bookings, searchTerm, statusFilter]);

    const exportCSV = () => {
        const blob = new Blob([toCSV(filteredBookings)], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const stats = [
        { label: 'Total', value: counts.all, tone: 'text-slate-900' },
        { label: 'Pending', value: counts.pending, tone: 'text-amber-600' },
        { label: 'Confirmed', value: counts.confirmed, tone: 'text-emerald-600' },
        { label: 'Confirmed value', value: formatINR(counts.value), tone: 'text-primary' },
    ];

    return (
        <div className="space-y-6 md:space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Booking Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage all traveller reservations.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={fetchBookings}
                        aria-label="Refresh bookings"
                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:border-primary hover:text-primary transition-all shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        type="button"
                        onClick={exportCSV}
                        disabled={!filteredBookings.length}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                    >
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-4 md:p-6 shadow-sm"
                    >
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className={`mt-2 text-xl md:text-2xl font-black tracking-tight tabular-nums truncate ${s.tone}`}>{loading ? '—' : s.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 flex flex-col lg:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                        type="search"
                        aria-label="Search bookings"
                        placeholder="Search name, email, phone, ref or package…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-700"
                    />
                </div>
                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter by status">
                    {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                        <button
                            key={f}
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === f}
                            onClick={() => setStatusFilter(f)}
                            className={`shrink-0 px-3 md:px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${statusFilter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f} <span className="ml-1 opacity-60 tabular-nums">{counts[f] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {loading && bookings.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary/40" />
                        Loading bookings…
                    </div>
                ) : loadError ? (
                    <div className="py-16 text-center bg-rose-50 rounded-3xl border border-rose-100 text-rose-600">
                        <p>{loadError}</p>
                        <button type="button" onClick={fetchBookings} className="mt-3 text-sm font-bold underline">Try again</button>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
                        <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                        {bookings.length === 0 ? 'No bookings yet.' : 'No bookings match your filters.'}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredBookings.map((booking, idx) => {
                            const st = STATUS[booking.status] || STATUS.pending;
                            const StatusIcon = st.icon;
                            const busy = updatingId === booking._id;
                            return (
                                <motion.article
                                    layout
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: Math.min(idx, 8) * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    className="bg-white rounded-2xl md:rounded-[2rem] p-4 sm:p-6 md:p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-shadow"
                                >
                                    {/* Top row */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 min-w-0">
                                            <div className="w-12 h-12 shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg uppercase">
                                                {booking.userName?.[0] || '?'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-black text-slate-900 truncate">{booking.userName}</h3>
                                                    {booking.bookingRef && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-xs">
                                                            <Hash className="w-3 h-3" aria-hidden="true" />{booking.bookingRef}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                                                    <a href={`mailto:${booking.email}`} className="inline-flex items-center gap-1.5 hover:text-primary min-w-0 break-all">
                                                        <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {booking.email}
                                                    </a>
                                                    <a href={`tel:${booking.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                                                        <Phone className="w-3.5 h-3.5" aria-hidden="true" /> {booking.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`self-start shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${st.badge}`}>
                                            <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" /> {st.label}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                                        <div className="col-span-2 md:col-span-1">
                                            <Meta icon={PackageIcon} label="Package">{booking.packageId?.title || <span className="text-slate-400 font-medium">Package removed</span>}</Meta>
                                        </div>
                                        <Meta icon={Calendar} label="Travel date">{fmtDate(booking.travelDate)}</Meta>
                                        <Meta icon={Users} label="Guests">{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</Meta>
                                        <Meta icon={IndianRupee} label="Total">{formatINR(bookingTotal(booking))}</Meta>
                                    </div>

                                    {booking.specialRequests && <Requests text={booking.specialRequests} />}

                                    {/* Actions */}
                                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <p className="text-xs text-slate-400 inline-flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Requested {fmtDate(booking.createdAt, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {busy && <Loader2 className="w-4 h-4 animate-spin text-slate-400" aria-label="Updating" />}
                                            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl w-full sm:w-auto" role="group" aria-label={`Status for ${booking.userName}`}>
                                                {Object.entries(STATUS).map(([key, s]) => (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        disabled={busy || booking.status === key}
                                                        aria-pressed={booking.status === key}
                                                        onClick={() => handleUpdateStatus(booking._id, key)}
                                                        className={`px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-default ${booking.status === key ? `${s.active} shadow-sm` : 'text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-50'}`}
                                                    >
                                                        {key === 'confirmed' ? 'Confirm' : key === 'cancelled' ? 'Cancel' : 'Pending'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {rowError[booking._id] && (
                                        <p role="alert" className="mt-2 text-xs text-rose-600 text-right">{rowError[booking._id]}</p>
                                    )}
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;
