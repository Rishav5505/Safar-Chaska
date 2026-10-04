import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Phone, Mail, MessageCircle, PhoneCall, MessageSquare, Package as PackageIcon,
    Loader2, RefreshCw, Inbox, Clock, ChevronDown,
} from 'lucide-react';
import API from '../../utils/api';

const SOURCE = {
    contact: { label: 'Contact form', icon: MessageSquare, cls: 'bg-sky-50 text-sky-700 border-sky-100' },
    callback: { label: 'Callback', icon: PhoneCall, cls: 'bg-violet-50 text-violet-700 border-violet-100' },
    package: { label: 'Package', icon: PackageIcon, cls: 'bg-teal-50 text-teal-700 border-teal-100' },
};

const STATUS = {
    new: { label: 'New', dot: 'bg-amber-500', cls: 'text-amber-700 bg-amber-50 border-amber-200' },
    contacted: { label: 'Contacted', dot: 'bg-sky-500', cls: 'text-sky-700 bg-sky-50 border-sky-200' },
    closed: { label: 'Closed', dot: 'bg-slate-400', cls: 'text-slate-600 bg-slate-100 border-slate-200' },
};

const timeAgo = (d) => {
    const date = new Date(d);
    if (isNaN(date)) return '—';
    const s = Math.round((Date.now() - date.getTime()) / 1000);
    if (s < 60) return 'just now';
    const m = Math.round(s / 60);
    if (m < 60) return `${m} min ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h} hr${h > 1 ? 's' : ''} ago`;
    const days = Math.round(h / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// wa.me needs digits with country code
const waNumber = (phone = '') => {
    let d = phone.replace(/\D/g, '');
    if (d.length === 10) d = `91${d}`;
    if (d.length === 11 && d.startsWith('0')) d = `91${d.slice(1)}`;
    return d;
};

const Message = ({ text }) => {
    const [open, setOpen] = useState(false);
    const long = text.length > 160;
    return (
        <div>
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
    );
};

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [rowError, setRowError] = useState({});

    const fetchEnquiries = async () => {
        setLoading(true);
        setLoadError('');
        try {
            const { data } = await API.get('/enquiries');
            setEnquiries(Array.isArray(data) ? data : []);
        } catch (error) {
            setLoadError(
                error?.response?.status === 404
                    ? 'The enquiries API isn’t available on the server yet. Redeploy the backend to enable it.'
                    : error?.response?.data?.message || 'Could not load enquiries.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const updateStatus = async (id, status) => {
        const prev = enquiries.find((e) => e._id === id)?.status;
        setUpdatingId(id);
        setRowError((r) => ({ ...r, [id]: '' }));
        setEnquiries((list) => list.map((e) => (e._id === id ? { ...e, status } : e)));
        try {
            await API.put(`/enquiries/${id}/status`, { status });
        } catch (error) {
            setEnquiries((list) => list.map((e) => (e._id === id ? { ...e, status: prev } : e)));
            setRowError((r) => ({ ...r, [id]: error?.response?.data?.message || 'Failed to update status' }));
        } finally {
            setUpdatingId(null);
        }
    };

    const counts = useMemo(() => {
        const c = { all: enquiries.length, new: 0, contacted: 0, closed: 0, callback: 0 };
        enquiries.forEach((e) => {
            c[e.status || 'new'] = (c[e.status || 'new'] || 0) + 1;
            if (e.source === 'callback' && (e.status || 'new') === 'new') c.callback += 1;
        });
        return c;
    }, [enquiries]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return enquiries.filter((e) => {
            const matchesStatus = filter === 'all' || (e.status || 'new') === filter;
            const matchesSearch = !q || [e.name, e.phone, e.email, e.message, e.packageId?.title]
                .some((f) => f && String(f).toLowerCase().includes(q));
            return matchesStatus && matchesSearch;
        });
    }, [enquiries, filter, search]);

    const stats = [
        { label: 'Total', value: counts.all, tone: 'text-slate-900' },
        { label: 'New', value: counts.new, tone: 'text-amber-600' },
        { label: 'Contacted', value: counts.contacted, tone: 'text-sky-600' },
        { label: 'Callbacks waiting', value: counts.callback, tone: 'text-violet-600' },
    ];

    return (
        <div className="space-y-6 md:space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Enquiries</h1>
                    <p className="text-slate-500 mt-1">Contact messages and callback requests from the website.</p>
                </div>
                <button
                    type="button"
                    onClick={fetchEnquiries}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh
                </button>
            </div>

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
                        <p className={`mt-2 text-xl md:text-2xl font-black tracking-tight tabular-nums ${s.tone}`}>{loading && !enquiries.length ? '—' : s.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 flex flex-col lg:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                        type="search"
                        aria-label="Search enquiries"
                        placeholder="Search name, phone, email or message…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-700"
                    />
                </div>
                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter by status">
                    {['all', 'new', 'contacted', 'closed'].map((f) => (
                        <button
                            key={f}
                            type="button"
                            role="tab"
                            aria-selected={filter === f}
                            onClick={() => setFilter(f)}
                            className={`shrink-0 px-3 md:px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f} <span className="ml-1 opacity-60 tabular-nums">{counts[f] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading && enquiries.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary/40" />
                        Loading enquiries…
                    </div>
                ) : loadError ? (
                    <div className="py-16 px-6 text-center bg-rose-50 rounded-3xl border border-rose-100 text-rose-600">
                        <p>{loadError}</p>
                        <button type="button" onClick={fetchEnquiries} className="mt-3 text-sm font-bold underline">Try again</button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
                        <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                        {enquiries.length === 0 ? 'No enquiries yet — they’ll appear here as soon as someone gets in touch.' : 'No enquiries match your filters.'}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filtered.map((e, idx) => {
                            const src = SOURCE[e.source] || SOURCE.contact;
                            const st = STATUS[e.status] || STATUS.new;
                            const SrcIcon = src.icon;
                            return (
                                <motion.article
                                    layout
                                    key={e._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: Math.min(idx, 8) * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    className={`bg-white rounded-2xl md:rounded-[2rem] p-4 sm:p-6 border shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-shadow ${(e.status || 'new') === 'new' ? 'border-amber-100' : 'border-slate-100'}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                                        {/* Person */}
                                        <div className="flex items-start gap-4 min-w-0 md:w-72 shrink-0">
                                            <div className="relative w-11 h-11 shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black uppercase">
                                                {e.name?.[0] || '?'}
                                                {(e.status || 'new') === 'new' && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white" aria-label="New" />}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-black text-slate-900 truncate">{e.name}</h3>
                                                <div className="mt-1 flex items-center gap-2 flex-wrap">
                                                    <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary">
                                                        <Phone className="w-3.5 h-3.5" aria-hidden="true" /> {e.phone}
                                                    </a>
                                                    <a
                                                        href={`https://wa.me/${waNumber(e.phone)}?text=${encodeURIComponent(`Hi ${e.name?.split(' ')[0] || ''}, this is Safar Chaska following up on your enquiry.`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`WhatsApp ${e.name}`}
                                                        className="w-7 h-7 rounded-lg bg-[#1FAF55]/10 text-[#1FAF55] flex items-center justify-center hover:bg-[#1FAF55] hover:text-white transition-colors"
                                                    >
                                                        <MessageCircle className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                                {e.email && (
                                                    <a href={`mailto:${e.email}`} className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-primary break-all">
                                                        <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {e.email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="flex-1 min-w-0 space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${src.cls}`}>
                                                    <SrcIcon className="w-3 h-3" aria-hidden="true" /> {src.label}
                                                </span>
                                                {e.packageId?.title && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 max-w-full">
                                                        <PackageIcon className="w-3 h-3 shrink-0" aria-hidden="true" /> <span className="truncate">{e.packageId.title}</span>
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1 text-xs text-slate-400" title={new Date(e.createdAt).toLocaleString('en-IN')}>
                                                    <Clock className="w-3 h-3" aria-hidden="true" /> {timeAgo(e.createdAt)}
                                                </span>
                                            </div>
                                            {e.message ? <Message text={e.message} /> : <p className="text-sm text-slate-400 italic">No message</p>}
                                        </div>

                                        {/* Status */}
                                        <div className="md:w-44 shrink-0">
                                            <label htmlFor={`status-${e._id}`} className="sr-only">Status for {e.name}</label>
                                            <div className="relative">
                                                <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${st.dot}`} aria-hidden="true" />
                                                <select
                                                    id={`status-${e._id}`}
                                                    value={e.status || 'new'}
                                                    disabled={updatingId === e._id}
                                                    onChange={(ev) => updateStatus(e._id, ev.target.value)}
                                                    className={`w-full appearance-none rounded-xl border pl-8 pr-9 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer transition focus:outline-none focus:ring-4 focus:ring-primary/15 disabled:opacity-60 ${st.cls}`}
                                                >
                                                    {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                                </select>
                                                {updatingId === e._id
                                                    ? <Loader2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                                                    : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-60" aria-hidden="true" />}
                                            </div>
                                            {rowError[e._id] && <p role="alert" className="mt-1.5 text-xs text-rose-600">{rowError[e._id]}</p>}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default AdminEnquiries;
