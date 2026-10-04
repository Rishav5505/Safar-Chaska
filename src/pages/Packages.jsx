import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, Heart, SlidersHorizontal, ChevronDown, MessageCircle, RefreshCw, Compass, ArrowRight, CloudOff } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import PackageCard from '../components/common/PackageCard';
import SkeletonCard from '../components/packages/SkeletonCard';
import useWishlist from '../hooks/useWishlist';
import { formatINR, onImageError } from '../utils/format';
import { whatsappLink, durationDays } from '../components/packages/constants';
import API from '../utils/api';

const EASE = [0.22, 1, 0.36, 1];
const HERO_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000';
const BUDGET_STEP = 500;

const SORTS = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'rating', label: 'Top rated' },
];

const DURATIONS = [
    { value: 'any', label: 'Any length', test: () => true },
    { value: 'short', label: 'Weekend', test: (d) => d !== null && d <= 3 },
    { value: 'mid', label: '4–6 days', test: (d) => d !== null && d >= 4 && d <= 6 },
    { value: 'long', label: '7+ days', test: (d) => d !== null && d >= 7 },
];

const sorters = {
    recommended: (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || (Number(b.rating) || 0) - (Number(a.rating) || 0),
    'price-asc': (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
    'price-desc': (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0),
    rating: (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0) || (Number(b.reviewCount) || 0) - (Number(a.reviewCount) || 0),
};

const LINK_BTN = 'shine inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-500 ease-premium hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25';
const LINK_OUTLINE = 'border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white';
const microLabel = 'text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [status, setStatus] = useState('loading'); // loading | ready | error
    const [reloadKey, setReloadKey] = useState(0);

    // ?search=<text> presets the search box (used by the Home destination showcase)
    const initialSearch = () => new URLSearchParams(window.location.search).get('search') || '';
    const [query, setQuery] = useState(initialSearch);
    const [search, setSearch] = useState(() => initialSearch().trim().toLowerCase());
    const [sort, setSort] = useState('recommended');
    const [duration, setDuration] = useState('any');
    const [budget, setBudget] = useState(null); // null = no cap
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const savedOnly = searchParams.get('saved') === '1';
    const categoryParam = searchParams.get('category') || '';

    const { ids: savedIds, count: savedCount } = useWishlist();

    useEffect(() => {
        let alive = true;
        API.get('/packages')
            .then(({ data }) => {
                if (!alive) return;
                setPackages(Array.isArray(data) ? data.filter((p) => p && p._id) : []);
                setStatus('ready');
            })
            .catch((err) => {
                console.error('Failed to fetch packages', err);
                if (alive) setStatus('error');
            });
        return () => { alive = false; };
    }, [reloadKey]);

    // Debounce typing so the grid doesn't reshuffle on every keystroke
    useEffect(() => {
        const t = setTimeout(() => setSearch(query.trim().toLowerCase()), 250);
        return () => clearTimeout(t);
    }, [query]);

    const retry = () => {
        setStatus('loading');
        setReloadKey((k) => k + 1);
    };

    const setParam = (key, value) =>
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, value);
            else next.delete(key);
            return next;
        }, { replace: true });

    const categories = useMemo(() => {
        const seen = [];
        packages.forEach((p) => { if (p.category && !seen.includes(p.category)) seen.push(p.category); });
        return ['All', ...seen];
    }, [packages]);

    const activeCategory = categories.find((c) => c.toLowerCase() === categoryParam.toLowerCase()) || (categoryParam || 'All');

    const priceBounds = useMemo(() => {
        const prices = packages.map((p) => Number(p.price)).filter((n) => Number.isFinite(n) && n > 0);
        if (!prices.length) return { min: 0, max: 50000 };
        return {
            min: Math.floor(Math.min(...prices) / BUDGET_STEP) * BUDGET_STEP,
            max: Math.ceil(Math.max(...prices) / BUDGET_STEP) * BUDGET_STEP,
        };
    }, [packages]);

    const stats = useMemo(() => {
        const locations = new Set(packages.map((p) => (p.location || '').split(',')[0].trim().toLowerCase()).filter(Boolean));
        const rated = packages.filter((p) => Number(p.rating) > 0);
        const avg = rated.length ? rated.reduce((s, p) => s + Number(p.rating), 0) / rated.length : null;
        return [
            { label: 'Curated trips', value: packages.length },
            { label: 'Destinations', value: locations.size },
            ...(avg ? [{ label: 'Average rating', value: `${avg.toFixed(1)}★` }] : []),
            { label: 'Trip styles', value: Math.max(categories.length - 1, 0) },
        ];
    }, [packages, categories]);

    const results = useMemo(() => {
        const dTest = DURATIONS.find((d) => d.value === duration)?.test ?? (() => true);
        return packages
            .filter((p) => activeCategory === 'All' || (p.category || '').toLowerCase() === activeCategory.toLowerCase())
            .filter((p) => !savedOnly || savedIds.includes(p._id))
            .filter((p) => budget === null || Number(p.price) <= budget)
            .filter((p) => dTest(durationDays(p.duration)))
            .filter((p) => {
                if (!search) return true;
                const hay = [p.title, p.location, p.category, p.tag, p.description].filter(Boolean).join(' ').toLowerCase();
                return hay.includes(search);
            })
            .sort(sorters[sort]);
    }, [packages, activeCategory, savedOnly, savedIds, budget, duration, search, sort]);

    const advancedCount = (sort !== 'recommended') + (duration !== 'any') + (budget !== null);
    const hasFilters = activeCategory !== 'All' || !!query.trim() || duration !== 'any' || budget !== null || savedOnly;

    const clearFilters = () => {
        setQuery('');
        setSearch('');
        setDuration('any');
        setBudget(null);
        setSort('recommended');
        setSearchParams({}, { replace: true });
    };

    const budgetValue = budget ?? priceBounds.max;

    return (
        <div className="bg-sand min-h-screen overflow-x-clip selection:bg-primary selection:text-white">
            <Navbar />
            <Seo title={'Tour Packages'} description="Browse curated tour packages across the Himalayas and India — Chakrata, Kedarnath, Ladakh bike trips, Kashmir honeymoons, Spiti, Rajasthan and more. Transparent pricing, no hidden costs." />

            {/* Hero */}
            <section className="grain relative bg-ink overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
                <img
                    src={HERO_IMAGE}
                    alt=""
                    aria-hidden="true"
                    onError={onImageError}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

                <div className="container-custom relative z-10 text-white">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                        className="eyebrow !text-secondary mb-6"
                    >
                        All journeys
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
                        className="heading-premium !text-white [&_em]:!text-secondary text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl"
                    >
                        Journeys worth <em>remembering</em>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: EASE }}
                        className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
                    >
                        Small-group Himalayan escapes, hand-built by local trip captains — from weekend forest trails to high-altitude odysseys.
                    </motion.p>

                    {status !== 'error' && <motion.dl
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-10 md:mt-14 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8 max-w-3xl"
                    >
                        {stats.map((s) => (
                            <div key={s.label}>
                                <dt className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">{s.label}</dt>
                                <dd className="font-serif font-light text-3xl md:text-4xl text-white leading-none">
                                    {status === 'loading' ? <span className="inline-block h-8 w-12 rounded-md bg-white/10 animate-pulse align-middle" /> : s.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>}
                </div>
            </section>

            {/* Sticky filter bar */}
            <div className="sticky top-[72px] lg:top-16 z-30 bg-sand/85 backdrop-blur-xl backdrop-saturate-150 border-b border-ink/5 shadow-[0_10px_30px_-20px_rgba(11,18,21,0.25)]">
                <div className="container-custom py-3 md:py-4">
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3">
                        {/* Category chips */}
                        <div className="order-last md:order-none w-[calc(100%+3rem)] md:w-auto md:flex-1 min-w-0 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide" role="group" aria-label="Filter by category">
                            <div className="flex items-center gap-2 w-max">
                                {(status === 'loading' ? ['All'] : categories).map((cat) => {
                                    const active = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setParam('category', cat === 'All' ? '' : cat)}
                                            aria-pressed={active}
                                            className={`relative h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'text-white' : 'text-slate-600 bg-white/70 border border-ink/10 hover:border-ink/30 hover:text-ink'}`}
                                        >
                                            {active && (
                                                <motion.span layoutId="chip-active" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE }} />
                                            )}
                                            <span className="relative">{cat}</span>
                                        </button>
                                    );
                                })}
                                {status === 'loading' && [1, 2, 3, 4].map((i) => (
                                    <span key={i} className="h-9 w-24 rounded-full bg-sand-dark animate-pulse" aria-hidden="true" />
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative flex-1 min-w-0 md:flex-none md:w-60 lg:w-72">
                            <label htmlFor="pkg-search" className="sr-only">Search journeys</label>
                            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                id="pkg-search"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Spiti, Kashmir, treks…"
                                className="w-full h-11 pl-11 pr-10 rounded-full bg-white border border-ink/10 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
                            />
                            <AnimatePresence>
                                {query && (
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.6 }}
                                        onClick={() => { setQuery(''); setSearch(''); }}
                                        aria-label="Clear search"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-sand flex items-center justify-center text-slate-500 hover:text-ink hover:bg-sand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Saved toggle */}
                        <button
                            type="button"
                            onClick={() => setParam('saved', savedOnly ? '' : '1')}
                            aria-pressed={savedOnly}
                            aria-label={`Show saved journeys only (${savedCount} saved)`}
                            className={`shrink-0 h-11 px-3.5 sm:px-4 rounded-full inline-flex items-center gap-2 text-sm font-medium border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${savedOnly ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-ink/10 text-ink hover:border-ink/30'}`}
                        >
                            <Heart className={`w-4 h-4 ${savedOnly ? 'fill-current' : savedCount ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span className="hidden sm:inline">Saved</span>
                            <span className={`min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center ${savedOnly ? 'bg-white/25' : 'bg-sand'}`}>{savedCount}</span>
                        </button>

                        {/* Mobile: toggle advanced filters */}
                        <button
                            type="button"
                            onClick={() => setFiltersOpen((o) => !o)}
                            aria-expanded={filtersOpen}
                            aria-controls="advanced-filters"
                            aria-label="More filters"
                            className={`md:hidden relative shrink-0 w-11 h-11 rounded-full flex items-center justify-center border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${filtersOpen ? 'bg-ink border-ink text-white' : 'bg-white border-ink/10 text-ink'}`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {advancedCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-ink text-[10px] font-bold flex items-center justify-center">{advancedCount}</span>
                            )}
                        </button>
                    </div>

                    {/* Advanced filters — always shown on md+, collapsible on mobile */}
                    <div
                        id="advanced-filters"
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-premium md:grid-rows-[1fr] md:opacity-100 md:visible ${filtersOpen ? 'grid-rows-[1fr] opacity-100 visible' : 'grid-rows-[0fr] opacity-0 invisible'}`}
                    >
                        <div className="overflow-hidden">
                            <div className="pt-4 md:pt-3 pb-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                                <div className="flex items-center gap-3">
                                    <label htmlFor="pkg-sort" className={microLabel}>Sort</label>
                                    <div className="relative flex-1 md:flex-none">
                                        <select
                                            id="pkg-sort"
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="appearance-none w-full h-9 pl-4 pr-9 rounded-full bg-white border border-ink/10 text-[13px] font-medium text-ink cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        >
                                            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <span className={microLabel} id="duration-label">Length</span>
                                    <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="duration-label">
                                        {DURATIONS.map((d) => (
                                            <button
                                                key={d.value}
                                                type="button"
                                                onClick={() => setDuration(d.value)}
                                                aria-pressed={duration === d.value}
                                                className={`h-9 px-3.5 rounded-full text-[13px] whitespace-nowrap border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${duration === d.value ? 'bg-primary border-primary text-white' : 'bg-white/70 border-ink/10 text-slate-600 hover:text-ink hover:border-ink/30'}`}
                                            >
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 md:max-w-xs flex flex-col gap-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <label htmlFor="pkg-budget" className={microLabel}>Max budget</label>
                                        <span className="text-[13px] font-medium text-ink">{budget === null ? 'Any' : formatINR(budget)}</span>
                                    </div>
                                    <input
                                        id="pkg-budget"
                                        type="range"
                                        min={priceBounds.min}
                                        max={priceBounds.max}
                                        step={BUDGET_STEP}
                                        value={budgetValue}
                                        disabled={status !== 'ready'}
                                        onChange={(e) => {
                                            const v = Number(e.target.value);
                                            setBudget(v >= priceBounds.max ? null : v);
                                        }}
                                        aria-valuetext={budget === null ? 'Any budget' : formatINR(budget)}
                                        className="w-full h-1.5 accent-primary cursor-pointer disabled:opacity-40"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <main className="container-custom py-10 md:py-16 min-h-[60vh]" aria-label="Journeys">
                {status !== 'error' && (
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-8 md:mb-10">
                        <p className="text-sm text-slate-500" aria-live="polite">
                            {status === 'loading' ? 'Finding journeys…' : (
                                <>
                                    Showing <span className="font-semibold text-ink">{results.length}</span> of {packages.length} {packages.length === 1 ? 'journey' : 'journeys'}
                                    {savedOnly && <span> · saved only</span>}
                                    {activeCategory !== 'All' && <span> · {activeCategory}</span>}
                                </>
                            )}
                        </p>
                        {hasFilters && status === 'ready' && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-ink transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            >
                                <X className="w-3.5 h-3.5" /> Clear filters
                            </button>
                        )}
                    </div>
                )}

                {status === 'loading' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {status === 'error' && (
                    <StateMessage
                        icon={CloudOff}
                        title={<>We couldn't reach our <em>trail map</em></>}
                        body="The journeys didn't load — it's usually a sleepy server waking up. Give it another try in a moment."
                    >
                        <Button onClick={retry} size="sm" className="rounded-full">
                            <RefreshCw className="w-4 h-4" /> Try again
                        </Button>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${LINK_BTN} ${LINK_OUTLINE} rounded-full px-5 py-2.5 text-sm`}>
                            <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                        </a>
                    </StateMessage>
                )}

                {status === 'ready' && results.length > 0 && (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {results.map((pkg, i) => (
                                <motion.div
                                    key={pkg._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                >
                                    <PackageCard pkg={pkg} index={i} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {status === 'ready' && results.length === 0 && (
                    savedOnly && savedCount === 0 ? (
                        <StateMessage
                            icon={Heart}
                            title={<>Your wishlist is <em>waiting</em></>}
                            body="Tap the heart on any journey to save it here — handy for comparing trips or sharing with your travel crew."
                        >
                            <Button onClick={() => setParam('saved', '')} size="sm" className="rounded-full">
                                Browse all journeys <ArrowRight className="w-4 h-4" />
                            </Button>
                        </StateMessage>
                    ) : (
                        <StateMessage
                            icon={Compass}
                            title={<>No journeys on <em>this trail</em></>}
                            body="Nothing matches those filters right now. Loosen them up, or tell a trip captain what you're dreaming of and we'll build it for you."
                        >
                            <Button onClick={clearFilters} size="sm" className="rounded-full">
                                <X className="w-4 h-4" /> Clear filters
                            </Button>
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${LINK_BTN} ${LINK_OUTLINE} rounded-full px-5 py-2.5 text-sm`}>
                                <MessageCircle className="w-4 h-4" /> Plan a custom trip
                            </a>
                        </StateMessage>
                    )
                )}
            </main>

            {/* Closing band */}
            <section className="container-custom pb-16 md:pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: EASE }}
                    className="grain relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 sm:px-10 md:px-16 md:py-16"
                >
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
                    <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-secondary/20 blur-[100px]" aria-hidden="true" />
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="max-w-xl">
                            <p className="eyebrow !text-secondary mb-4">Still deciding?</p>
                            <h2 className="heading-premium !text-white [&_em]:!text-secondary text-3xl sm:text-4xl md:text-5xl">
                                Can't decide? Talk to a <em>trip captain</em>
                            </h2>
                            <p className="mt-4 text-white/60 leading-relaxed">
                                Tell us your dates, budget and pace — we'll reply on WhatsApp within the hour with a route that fits.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${LINK_BTN} rounded-2xl px-8 py-4 bg-secondary text-ink hover:bg-secondary-light shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)]`}>
                                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                            </a>
                            <Link to="/contact" className={`${LINK_BTN} rounded-2xl px-8 py-4 bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white hover:text-ink`}>
                                Plan a custom trip
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

const StateMessage = ({ icon, title, body, children }) => {
    const Icon = icon;
    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-xl mx-auto text-center py-12 md:py-20"
        role="status"
    >
        <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-white shadow-premium flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <h2 className="heading-premium text-3xl md:text-5xl mb-4">{title}</h2>
        <p className="text-slate-500 leading-relaxed mb-8">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
    </motion.div>
    );
};

export default Packages;
