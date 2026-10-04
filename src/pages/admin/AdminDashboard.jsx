import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    TrendingUp, Calendar, Map, Clock, Activity, LayoutDashboard, Plus, MessageSquare,
    Phone, MessageCircle, RefreshCw, BarChart3, Trophy, Plane, Inbox, AlertCircle, Users
} from 'lucide-react';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import BookingsBarChart from '../../components/admin/BookingsBarChart';

const DAY = 24 * 60 * 60 * 1000;
const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;
const shortDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

// Normalise an Indian phone number for wa.me: digits only, 91 prefix for 10-digit numbers
const waNumber = (phone) => {
    let digits = String(phone || '').replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
    if (digits.length === 10) digits = `91${digits}`;
    return digits.length >= 10 ? digits : null;
};

const relativeTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.round(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    const days = Math.round(hrs / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
};

const StatCard = ({ label, value, sub, icon: Icon, color, onClick, loading }) => (
    <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onClick}
        className="text-left w-full bg-white p-4 md:p-7 rounded-[1.5rem] md:rounded-[2.2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
    >
        <div className={`absolute -right-4 -top-4 w-16 h-16 md:w-24 md:h-24 ${color.split(' ')[0]} opacity-60 rounded-full transition-transform group-hover:scale-150`} />
        <div className={`relative w-10 h-10 md:w-12 md:h-12 ${color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 shadow-inner`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="relative z-10 font-bold text-slate-400 text-[9px] md:text-[10px] uppercase tracking-widest mb-1">{label}</div>
        {loading ? (
            <div className="h-7 md:h-9 w-20 bg-slate-100 rounded-lg animate-pulse" />
        ) : (
            <h3 className="relative z-10 text-lg sm:text-xl md:text-3xl font-black text-slate-900 tracking-tight break-all">{value}</h3>
        )}
        {sub && !loading && <p className="relative z-10 text-[10px] md:text-xs font-medium text-slate-400 mt-1">{sub}</p>}
    </motion.button>
);

const Card = ({ title, icon: Icon, action, children, className = '' }) => (
    <section className={`bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm ${className}`}>
        <div className="flex justify-between items-center gap-3 mb-6">
            <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-3">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" /> {title}
            </h2>
            {action}
        </div>
        {children}
    </section>
);

const LinkAction = ({ to, children }) => (
    <Link to={to} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b-2 border-slate-100 pb-1 hover:border-primary hover:text-slate-700 transition-all whitespace-nowrap focus:outline-none focus-visible:text-primary">
        {children}
    </Link>
);

const SkeletonRows = ({ n = 3 }) => (
    <div className="space-y-3 animate-pulse" aria-busy="true">
        {Array.from({ length: n }, (_, i) => <div key={i} className="h-14 bg-slate-50 rounded-2xl" />)}
    </div>
);

const Empty = ({ icon: Icon = Inbox, children }) => (
    <div className="flex flex-col items-center justify-center text-center py-10 text-slate-400 text-sm">
        <Icon className="w-8 h-8 mb-3 text-slate-200" />
        {children}
    </div>
);

// Fetch everything in parallel; individual failures (e.g. /enquiries not deployed yet) don't break the page
const loadDashboard = () => Promise.allSettled([
    API.get('/bookings/stats'),
    API.get('/bookings'),
    API.get('/packages'),
    API.get('/enquiries'),
]);

const statusPill = (s) =>
    s === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : s === 'cancelled' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [serverStats, setServerStats] = useState(null);
    const [packageCount, setPackageCount] = useState(null);
    const [enquiries, setEnquiries] = useState(null); // null = endpoint not available
    const [bookingsError, setBookingsError] = useState(false);
    const [updatedAt, setUpdatedAt] = useState(null);

    const applyResults = useCallback(([statsRes, bookingsRes, packagesRes, enquiriesRes]) => {
        setServerStats(statsRes.status === 'fulfilled' ? statsRes.value.data : null);
        const okBookings = bookingsRes.status === 'fulfilled' && Array.isArray(bookingsRes.value.data);
        setBookings(okBookings ? bookingsRes.value.data : []);
        setBookingsError(!okBookings);
        setPackageCount(packagesRes.status === 'fulfilled' && Array.isArray(packagesRes.value.data) ? packagesRes.value.data.length : null);
        setEnquiries(enquiriesRes.status === 'fulfilled' && Array.isArray(enquiriesRes.value.data) ? enquiriesRes.value.data : null);
        setUpdatedAt(new Date());
        setLoading(false);
    }, []);

    const fetchDashboardData = useCallback(() => loadDashboard().then(applyResults), [applyResults]);

    useEffect(() => {
        let cancelled = false;
        loadDashboard().then((res) => { if (!cancelled) applyResults(res); });
        return () => { cancelled = true; };
    }, [applyResults]);

    // Prefer server stats; fall back to computing from the bookings list
    const stats = useMemo(() => {
        const confirmed = bookings.filter((b) => b.status === 'confirmed');
        return {
            totalBookings: serverStats?.totalBookings ?? bookings.length,
            pendingBookings: serverStats?.pendingBookings ?? bookings.filter((b) => b.status === 'pending').length,
            confirmedBookings: serverStats?.confirmedBookings ?? confirmed.length,
            revenue: serverStats?.revenue ?? confirmed.reduce((s, b) => s + (Number(b.totalPrice) || 0), 0),
        };
    }, [bookings, serverStats]);

    const newEnquiries = enquiries ? enquiries.filter((e) => (e.status || 'new') === 'new').length : null;

    const latestEnquiries = useMemo(
        () => (enquiries ? [...enquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5) : []),
        [enquiries]
    );

    const topPackages = useMemo(() => {
        const counts = {};
        bookings.forEach((b) => {
            if (b.status === 'cancelled') return;
            const title = b.packageId?.title || 'Deleted / custom trip';
            counts[title] = (counts[title] || 0) + 1;
        });
        return Object.entries(counts).map(([title, count]) => ({ title, count })).sort((a, b) => b.count - a.count).slice(0, 5);
    }, [bookings]);

    const upcoming = useMemo(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = start.getTime() + 15 * DAY; // today + next 14 days
        return bookings
            .filter((b) => (b.status === 'confirmed' || b.status === 'pending') && b.travelDate)
            .filter((b) => { const t = new Date(b.travelDate).getTime(); return t >= start.getTime() && t < end; })
            .sort((a, b) => new Date(a.travelDate) - new Date(b.travelDate));
    }, [bookings]);

    const recentBookings = useMemo(
        () => [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
        [bookings]
    );

    const daysUntil = (d) => {
        const t = new Date(d); t.setHours(0, 0, 0, 0);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const n = Math.round((t - today) / DAY);
        return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : `In ${n} days`;
    };

    const topMax = topPackages[0]?.count || 1;

    return (
        <div className="space-y-8 md:space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-slate-900 rounded-[1.2rem] md:rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                        <LayoutDashboard className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Namaste{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm font-bold">
                            Your business at a glance{updatedAt ? ` · Updated ${updatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}` : ''}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => { setLoading(true); fetchDashboardData(); }}
                    disabled={loading}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 transition-all disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>

            {bookingsError && !loading && (
                <div role="alert" className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-bold">
                    <AlertCircle className="w-5 h-5 shrink-0" /> Could not load bookings. Check your connection or sign in again, then press Refresh.
                </div>
            )}

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <StatCard
                    label="Total bookings" value={stats.totalBookings.toLocaleString('en-IN')}
                    sub={`${stats.confirmedBookings} confirmed`}
                    icon={Calendar} color="bg-blue-50 text-blue-500" loading={loading}
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    label="Pending" value={stats.pendingBookings.toLocaleString('en-IN')}
                    sub={stats.pendingBookings ? 'Need your reply' : 'All caught up'}
                    icon={Clock} color="bg-orange-50 text-orange-600" loading={loading}
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    label="Confirmed revenue" value={inr(stats.revenue)}
                    sub="From confirmed bookings"
                    icon={TrendingUp} color="bg-emerald-50 text-emerald-600" loading={loading}
                    onClick={() => navigate('/admin/bookings')}
                />
                <StatCard
                    label="New enquiries" value={newEnquiries === null ? '—' : newEnquiries.toLocaleString('en-IN')}
                    sub={newEnquiries === null ? 'Not available yet' : `${enquiries.length} total`}
                    icon={MessageSquare} color="bg-indigo-50 text-indigo-500" loading={loading}
                    onClick={() => navigate('/admin/enquiries')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                {/* Main column */}
                <div className="lg:col-span-8 space-y-6 md:space-y-10 min-w-0">
                    <Card title="Bookings, last 30 days" icon={BarChart3} action={<LinkAction to="/admin/bookings">All bookings</LinkAction>}>
                        {loading ? <div className="h-48 bg-slate-50 rounded-2xl animate-pulse" /> : <BookingsBarChart bookings={bookings} days={30} />}
                    </Card>

                    <Card title="Upcoming trips" icon={Plane} action={<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Next 14 days</span>}>
                        {loading ? <SkeletonRows /> : upcoming.length === 0 ? (
                            <Empty icon={Plane}>No trips departing in the next two weeks.</Empty>
                        ) : (
                            <ul className="space-y-3">
                                {upcoming.map((b) => {
                                    const wa = waNumber(b.phone);
                                    return (
                                        <li key={b._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50/60 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-12 shrink-0 text-center rounded-xl bg-white border border-slate-100 py-1.5">
                                                    <p className="text-[9px] font-black uppercase text-primary leading-none">{new Date(b.travelDate).toLocaleDateString('en-IN', { month: 'short' })}</p>
                                                    <p className="text-lg font-black text-slate-900 leading-tight">{new Date(b.travelDate).getDate()}</p>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-900 truncate">{b.userName || 'Guest'}</p>
                                                    <p className="text-xs text-slate-500 truncate">
                                                        {b.packageId?.title || 'Custom trip'} · <Users className="w-3 h-3 inline -mt-0.5" /> {b.guests || 1}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:justify-end">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mr-auto sm:mr-1">{daysUntil(b.travelDate)}</span>
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusPill(b.status)}`}>{b.status}</span>
                                                {b.phone && (
                                                    <a href={`tel:${b.phone}`} aria-label={`Call ${b.userName}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                                        <Phone className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {wa && (
                                                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${b.userName}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Card>

                    <Card title="Recent reservations" icon={Activity} action={<LinkAction to="/admin/bookings">Go to bookings</LinkAction>}>
                        {loading ? <SkeletonRows n={4} /> : recentBookings.length === 0 ? (
                            <Empty icon={Calendar}>No bookings yet. They will appear here as soon as customers book.</Empty>
                        ) : (
                            <div className="space-y-3">
                                {recentBookings.map((booking, idx) => (
                                    <motion.button
                                        type="button"
                                        key={booking._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        onClick={() => navigate('/admin/bookings')}
                                        className="w-full text-left flex items-center justify-between gap-3 p-4 md:p-5 bg-slate-50/50 rounded-[1.2rem] md:rounded-[1.6rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all border border-transparent hover:border-slate-100 group focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                    >
                                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs md:text-sm">
                                                {(booking.userName || '?')[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate text-sm md:text-base">{booking.userName || 'Guest'}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider truncate">
                                                    {booking.packageId?.title || 'Private Journey'}{booking.totalPrice ? ` · ${inr(booking.totalPrice)}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block ${statusPill(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-tight">{booking.createdAt ? shortDate(booking.createdAt) : ''}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6 md:space-y-10 min-w-0">
                    <Card title="Latest enquiries" icon={MessageSquare} action={enquiries && <LinkAction to="/admin/enquiries">View all</LinkAction>}>
                        {loading ? <SkeletonRows /> : enquiries === null ? (
                            <Empty icon={MessageSquare}>Enquiries are not available yet. They will appear here once the server update is live.</Empty>
                        ) : latestEnquiries.length === 0 ? (
                            <Empty icon={Inbox}>No enquiries yet.</Empty>
                        ) : (
                            <ul className="space-y-3">
                                {latestEnquiries.map((e) => {
                                    const wa = waNumber(e.phone);
                                    const isNew = (e.status || 'new') === 'new';
                                    return (
                                        <li key={e._id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-900 truncate flex items-center gap-2">
                                                        {isNew && <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" aria-label="New" />}
                                                        {e.name || 'Unknown'}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                                        {e.source || 'contact'} · {e.createdAt ? relativeTime(e.createdAt) : ''}
                                                    </p>
                                                </div>
                                                <div className="flex gap-1.5 shrink-0">
                                                    {e.phone && (
                                                        <a href={`tel:${e.phone}`} aria-label={`Call ${e.name}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                                            <Phone className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {wa && (
                                                        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${e.name}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                                                            <MessageCircle className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            {e.message && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{e.message}</p>}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Card>

                    <Card title="Top packages" icon={Trophy}>
                        {loading ? <SkeletonRows /> : topPackages.length === 0 ? (
                            <Empty icon={Trophy}>Bookings per package will show here.</Empty>
                        ) : (
                            <ol className="space-y-4">
                                {topPackages.map((p, i) => (
                                    <li key={p.title}>
                                        <div className="flex items-baseline justify-between gap-3 text-sm">
                                            <span className="font-bold text-slate-800 truncate"><span className="text-slate-300 mr-2">{i + 1}</span>{p.title}</span>
                                            <span className="font-black text-slate-900 shrink-0">{p.count}</span>
                                        </div>
                                        <div className="mt-1.5 h-2 bg-slate-100 rounded-full overflow-hidden" aria-hidden="true">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(p.count / topMax) * 100}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.06 }}
                                                className="h-full bg-primary rounded-full"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                        <p className="text-[10px] text-slate-400 mt-5">Counts exclude cancelled bookings.</p>
                    </Card>

                    {/* Quick actions */}
                    <section className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 pb-4 border-b border-slate-50">Quick actions</h2>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { label: 'New package', to: '/admin/packages/add', icon: Plus, tint: 'text-indigo-600' },
                                { label: `Packages${packageCount !== null ? ` (${packageCount})` : ''}`, to: '/admin/packages', icon: Map, tint: 'text-emerald-500' },
                                { label: 'Bookings', to: '/admin/bookings', icon: Calendar, tint: 'text-blue-500' },
                                { label: 'Enquiries', to: '/admin/enquiries', icon: MessageSquare, tint: 'text-amber-500' },
                            ].map(({ label, to, icon: Icon, tint }) => (
                                <button
                                    key={to}
                                    type="button"
                                    onClick={() => navigate(to)}
                                    className="p-4 md:p-5 bg-slate-50 rounded-2xl md:rounded-[1.6rem] flex flex-col items-center gap-2 md:gap-3 hover:bg-slate-900 hover:text-white transition-all group shadow-sm active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                                >
                                    <span className="p-2 md:p-3 bg-white rounded-xl group-hover:bg-white/10 transition-colors">
                                        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${tint} group-hover:text-white`} />
                                    </span>
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-center">{label}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
