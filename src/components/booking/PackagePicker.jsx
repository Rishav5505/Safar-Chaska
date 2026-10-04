import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check, MapPin, Clock } from 'lucide-react';
import { formatINR, onImageError } from '../../utils/format';

const SkeletonRow = () => (
    <div className="flex items-center gap-4 p-3 rounded-2xl border border-ink/5 animate-pulse">
        <div className="w-16 h-16 rounded-xl bg-sand-dark" />
        <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/3 rounded bg-sand-dark" />
            <div className="h-3 w-1/3 rounded bg-sand" />
        </div>
    </div>
);

// Searchable list of selectable package cards (radio-group semantics)
const PackagePicker = ({ packages, loading, error, value, onChange, invalid }) => {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return packages;
        return packages.filter((p) =>
            [p.title, p.location, p.category].some((f) => f && String(f).toLowerCase().includes(q))
        );
    }, [packages, query]);

    return (
        <div>
            <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, place or style…"
                    aria-label="Search packages"
                    className="w-full rounded-2xl border border-ink/10 bg-sand/50 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-slate-400 transition focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
            </div>

            <div
                role="radiogroup"
                aria-label="Choose a package"
                aria-invalid={invalid || undefined}
                className={`max-h-[22rem] overflow-y-auto overscroll-contain -mx-1 px-1 py-1 space-y-2.5 rounded-2xl ${invalid ? 'ring-2 ring-rose-200' : ''}`}
            >
                {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)}

                {!loading && error && (
                    <p className="p-6 text-center text-sm text-rose-600 bg-rose-50 rounded-2xl">{error}</p>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <p className="p-6 text-center text-sm text-slate-500 bg-sand/60 rounded-2xl">
                        No journeys match “{query}”.
                    </p>
                )}

                {!loading && filtered.map((p) => {
                    const selected = p._id === value;
                    return (
                        <motion.button
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            key={p._id}
                            onClick={() => onChange(p._id)}
                            layout="position"
                            className={`group w-full flex items-center gap-4 p-3 rounded-2xl border text-left transition-all duration-300 ease-premium focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${selected
                                ? 'border-primary bg-primary/[0.05] shadow-[0_10px_30px_-18px_rgba(15,118,110,0.7)]'
                                : 'border-ink/10 bg-white hover:border-ink/25'
                                }`}
                        >
                            <div className="relative w-16 h-16 sm:w-20 sm:h-16 rounded-xl overflow-hidden shrink-0">
                                <img src={p.image} alt="" loading="lazy" onError={onImageError} className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-ink leading-snug line-clamp-2 sm:truncate">{p.title}</p>
                                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                                    {p.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" aria-hidden="true" />{p.location}</span>}
                                    {p.duration && <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{p.duration}</span>}
                                </p>
                            </div>
                            <div className="text-right shrink-0 pl-1">
                                {p.originalPrice > p.price && (
                                    <p className="text-[11px] text-slate-400 line-through tabular-nums">{formatINR(p.originalPrice)}</p>
                                )}
                                <p className="font-serif text-lg text-ink tabular-nums">{formatINR(p.price)}</p>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">per person</p>
                            </div>
                            <span
                                aria-hidden="true"
                                className={`hidden sm:flex w-6 h-6 rounded-full border items-center justify-center shrink-0 transition-all duration-300 ${selected ? 'bg-primary border-primary text-white' : 'border-ink/20 text-transparent'}`}
                            >
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default PackagePicker;
