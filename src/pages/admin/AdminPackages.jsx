import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, IndianRupee, Clock, ExternalLink, Star, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { onImageError } from '../../utils/format';

const fmtPrice = (n) => Number(n || 0).toLocaleString('en-IN');

const FeaturedToggle = ({ pkg, busy, onToggle, compact = false }) => (
    <button
        type="button"
        onClick={() => onToggle(pkg)}
        disabled={busy}
        aria-pressed={!!pkg.isFeatured}
        title={pkg.isFeatured ? 'Featured — click to remove from featured' : 'Click to feature on the home page'}
        className={`inline-flex items-center gap-1.5 rounded-lg font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 ${compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-1.5 text-xs'} ${pkg.isFeatured ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
    >
        <Star className={`w-3.5 h-3.5 ${pkg.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
        {pkg.isFeatured ? 'Featured' : 'Feature'}
    </button>
);

const iconBtn = 'w-10 h-10 flex items-center justify-center rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';

const AdminPackages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [busyId, setBusyId] = useState(null);
    const [notice, setNotice] = useState(location.state?.flash ? { type: 'success', text: location.state.flash } : null);

    // Clear router flash state so it doesn't reappear on refresh
    useEffect(() => {
        if (location.state?.flash) navigate(location.pathname, { replace: true, state: null });
    }, [location.state, location.pathname, navigate]);

    useEffect(() => {
        if (!notice) return undefined;
        const t = setTimeout(() => setNotice(null), 5000);
        return () => clearTimeout(t);
    }, [notice]);

    const fetchPackages = useCallback(async () => {
        setLoading(true);
        setLoadError('');
        try {
            const { data } = await API.get('/packages');
            setPackages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching packages', error);
            setLoadError('Could not load packages. Check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPackages(); }, [fetchPackages]);

    const confirmDelete = async () => {
        if (!toDelete) return;
        setDeleting(true);
        try {
            await API.delete(`/packages/${toDelete._id}`);
            setPackages((prev) => prev.filter((p) => p._id !== toDelete._id));
            setNotice({ type: 'success', text: `"${toDelete.title}" was deleted.` });
            setToDelete(null);
        } catch (error) {
            console.error(error);
            setNotice({ type: 'error', text: 'Delete failed. Please try again.' });
            setToDelete(null);
        } finally {
            setDeleting(false);
        }
    };

    const toggleFeatured = async (pkg) => {
        const next = !pkg.isFeatured;
        setBusyId(pkg._id);
        setPackages((prev) => prev.map((p) => (p._id === pkg._id ? { ...p, isFeatured: next } : p)));
        try {
            await API.put(`/packages/${pkg._id}`, { isFeatured: next });
            setNotice({ type: 'success', text: next ? `"${pkg.title}" is now featured.` : `"${pkg.title}" removed from featured.` });
        } catch (error) {
            console.error(error);
            setPackages((prev) => prev.map((p) => (p._id === pkg._id ? { ...p, isFeatured: !next } : p)));
            setNotice({ type: 'error', text: 'Could not update featured status.' });
        } finally {
            setBusyId(null);
        }
    };

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(packages.map((p) => p.category).filter(Boolean))).sort()],
        [packages]
    );

    const filteredPackages = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return packages.filter((pkg) =>
            (!q || [pkg.title, pkg.location, pkg.category, pkg.tag].some((v) => String(v || '').toLowerCase().includes(q))) &&
            (category === 'All' || pkg.category === category) &&
            (!featuredOnly || pkg.isFeatured)
        );
    }, [packages, searchTerm, category, featuredOnly]);

    const hasFilters = searchTerm || category !== 'All' || featuredOnly;
    const clearFilters = () => { setSearchTerm(''); setCategory('All'); setFeaturedOnly(false); };

    const emptyState = loadError ? (
        <div className="flex flex-col items-center gap-3 text-slate-500">
            <AlertCircle className="w-8 h-8 text-rose-400" />
            <span>{loadError}</span>
            <button type="button" onClick={fetchPackages} className="text-primary font-bold flex items-center gap-2 hover:underline"><RefreshCw className="w-4 h-4" /> Retry</button>
        </div>
    ) : packages.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-slate-500">
            <span>No packages yet.</span>
            <Link to="/admin/packages/add" className="text-primary font-bold hover:underline">Create your first package</Link>
        </div>
    ) : (
        <div className="flex flex-col items-center gap-3 text-slate-400 italic">
            <span>No packages match your filters.</span>
            <button type="button" onClick={clearFilters} className="not-italic text-primary font-bold hover:underline">Clear filters</button>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Packages</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or remove travel experiences.</p>
                </div>
                <Link to="/admin/packages/add" className="rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25" tabIndex={-1}>
                    <Button className="flex items-center gap-2 rounded-xl py-4">
                        <Plus className="w-5 h-5" /> Add New Package
                    </Button>
                </Link>
            </div>

            {notice && (
                <div role="status" className={`flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border text-sm font-bold ${notice.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                    <span className="flex items-center gap-2 min-w-0">
                        {notice.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                        <span className="truncate">{notice.text}</span>
                    </span>
                    <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss message" className="p-1 rounded-lg hover:bg-white/60"><X className="w-4 h-4" /></button>
                </div>
            )}

            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 md:p-8 border-b border-slate-50 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <label htmlFor="pkg-search" className="sr-only">Search packages</label>
                        <input
                            id="pkg-search"
                            type="search"
                            placeholder="Search by name, place, category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <label htmlFor="pkg-category" className="sr-only">Filter by category</label>
                        <select
                            id="pkg-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                        >
                            {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}
                        </select>
                        <button
                            type="button"
                            onClick={() => setFeaturedOnly((v) => !v)}
                            aria-pressed={featuredOnly}
                            className={`flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${featuredOnly ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:text-slate-800'}`}
                        >
                            <Star className={`w-4 h-4 ${featuredOnly ? 'fill-amber-500 text-amber-500' : ''}`} /> Featured only
                        </button>
                        {hasFilters && (
                            <button type="button" onClick={clearFilters} className="text-xs font-bold text-primary hover:underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                Clear
                            </button>
                        )}
                        {!loading && (
                            <span className="text-xs font-bold text-slate-400">
                                {filteredPackages.length} of {packages.length}
                            </span>
                        )}
                    </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <th className="px-6 lg:px-8 py-6">Package</th>
                                <th className="px-6 lg:px-8 py-6">Location</th>
                                <th className="px-6 lg:px-8 py-6">Price</th>
                                <th className="px-6 lg:px-8 py-6">Duration</th>
                                <th className="px-6 lg:px-8 py-6">Featured</th>
                                <th className="px-6 lg:px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [0, 1, 2].map((i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-8 py-6"><div className="h-12 bg-slate-50 rounded-xl" /></td>
                                    </tr>
                                ))
                            ) : filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">{emptyState}</td>
                                </tr>
                            ) : filteredPackages.map((pkg) => (
                                <tr key={pkg._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 lg:px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0 bg-slate-100">
                                                <img src={pkg.image} onError={onImageError} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="min-w-0">
                                                <Link to={`/admin/packages/edit/${pkg._id}`} className="font-bold text-slate-900 leading-tight hover:text-primary">{pkg.title}</Link>
                                                <p className="text-xs font-medium text-slate-400 mt-1">
                                                    {pkg.category}{pkg.tag ? ` · ${pkg.tag}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-6 font-medium text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-slate-300 shrink-0" /> {pkg.location}
                                        </div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-6 font-bold text-slate-900">
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="w-4 h-4 text-slate-300" /> {fmtPrice(pkg.price)}
                                        </div>
                                        {pkg.originalPrice > pkg.price && (
                                            <p className="text-xs text-slate-400 line-through font-medium ml-5">₹{fmtPrice(pkg.originalPrice)}</p>
                                        )}
                                    </td>
                                    <td className="px-6 lg:px-8 py-6 font-medium text-slate-600 text-sm">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Clock className="w-4 h-4 text-slate-300" /> {pkg.duration}
                                        </div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-6">
                                        <FeaturedToggle pkg={pkg} busy={busyId === pkg._id} onToggle={toggleFeatured} />
                                    </td>
                                    <td className="px-6 lg:px-8 py-6">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/packages/edit/${pkg._id}`} className={`${iconBtn} bg-slate-50 text-slate-500 hover:bg-primary hover:text-white`} aria-label={`Edit ${pkg.title}`} title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <a href={`/destination/${pkg._id}`} target="_blank" rel="noopener noreferrer" className={`${iconBtn} bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white`} aria-label={`View ${pkg.title} on site (opens in new tab)`} title="View on site">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button type="button" onClick={() => setToDelete(pkg)} className={`${iconBtn} bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white`} aria-label={`Delete ${pkg.title}`} title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View Card Layout */}
                <div className="md:hidden divide-y divide-slate-50">
                    {loading ? (
                        <div className="p-5 space-y-4 animate-pulse">
                            {[0, 1, 2].map((i) => <div key={i} className="h-28 bg-slate-50 rounded-2xl" />)}
                        </div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="p-10 text-center">{emptyState}</div>
                    ) : filteredPackages.map((pkg) => (
                        <div key={pkg._id} className="p-5 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-slate-100">
                                    <img src={pkg.image} onError={onImageError} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 leading-tight truncate">{pkg.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{pkg.category}</p>
                                    <p className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1 truncate">
                                        <MapPin className="w-3.5 h-3.5 text-primary/50 shrink-0" /> {pkg.location}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Price</p>
                                    <p className="font-bold text-slate-900 flex items-center gap-1 text-sm">
                                        <IndianRupee className="w-3 h-3 text-slate-400" /> {fmtPrice(pkg.price)}
                                    </p>
                                </div>
                                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Duration</p>
                                    <p className="font-bold text-slate-600 flex items-center gap-1 text-sm">
                                        <Clock className="w-3 h-3 text-slate-400" /> {pkg.duration}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <FeaturedToggle pkg={pkg} busy={busyId === pkg._id} onToggle={toggleFeatured} compact />
                                <div className="flex gap-2">
                                    <a href={`/destination/${pkg._id}`} target="_blank" rel="noopener noreferrer" className={`${iconBtn} text-slate-400 bg-slate-50 hover:text-slate-900`} aria-label={`View ${pkg.title} on site (opens in new tab)`}>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <Link to={`/admin/packages/edit/${pkg._id}`} className={`${iconBtn} text-slate-400 bg-slate-50 hover:text-primary`} aria-label={`Edit ${pkg.title}`}>
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setToDelete(pkg)}
                                        className={`${iconBtn} text-rose-400 bg-rose-50 hover:text-rose-600`}
                                        aria-label={`Delete ${pkg.title}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmDialog
                open={!!toDelete}
                title="Delete this package?"
                message={toDelete ? `"${toDelete.title}" will be removed from the website permanently. Existing bookings keep their records. This cannot be undone.` : ''}
                confirmLabel="Delete forever"
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </div>
    );
};

export default AdminPackages;
