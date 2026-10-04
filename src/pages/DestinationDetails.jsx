import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Clock, Mountain, Sun, Users, Gauge, Star, Heart, Share2, ChevronRight, Check, X,
    Sparkles, MessageCircle, Compass, ArrowRight, Link2,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo, { SITE_URL } from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import BookingCard from '../components/packages/BookingCard';
import ItineraryTimeline from '../components/packages/ItineraryTimeline';
import FaqList from '../components/packages/FaqList';
import SimilarJourneys from '../components/packages/SimilarJourneys';
import { whatsappLink, todayISO } from '../components/packages/constants';
import useWishlist from '../hooks/useWishlist';
import { formatINR, discountPercent, onImageError, FALLBACK_IMAGE } from '../utils/format';
import { destinationsData } from '../data/destinations';
import API from '../utils/api';

const EASE = [0.22, 1, 0.36, 1];

const DEFAULT_FAQS = [
    { question: 'Is this trip safe for first-time travellers?', answer: 'Absolutely. Every departure is led by an experienced local trip captain, routes are scouted each season, and our team is reachable 24/7 while you travel.' },
    { question: 'Can the itinerary be customised?', answer: 'Yes — we can add rest days, upgrade stays, extend the trip or run it privately for your group. Message us on WhatsApp and we will tailor it.' },
    { question: 'What is the cancellation policy?', answer: 'Cancel up to 7 days before departure for a full refund (minus payment-gateway charges). Within 7 days, we offer a free date change subject to availability.' },
    { question: 'What should I pack?', answer: 'Layered warm clothing, sturdy walking shoes, sunscreen, a refillable bottle and any personal medication. We share a detailed packing list after booking.' },
];

const nonEmpty = (arr) => (Array.isArray(arr) ? arr.filter(Boolean) : []);

// Flattens static destination data and API packages into one shape for rendering.
const normalize = (d) => {
    const rawPrice = d.price ?? d.packages?.[0]?.price ?? d.packageSummary?.price ?? 0;
    const price = Number(String(rawPrice).replace(/[^\d.]/g, '')) || 0;
    const hero = (typeof d.image === 'string' && d.image) || d.images?.hero || FALLBACK_IMAGE;
    const gallery = [...new Set(nonEmpty(d.gallery))];

    return {
        _id: d._id,
        title: d.title || d.name,
        location: d.location || d.state,
        tagline: d.tagline,
        description: d.description,
        hero,
        gallery,
        price,
        originalPrice: Number(d.originalPrice) || null,
        duration: d.duration || d.packageSummary?.duration,
        difficulty: d.difficulty,
        altitude: d.altitude,
        bestSeason: d.bestSeason,
        groupSize: d.groupSize,
        rating: Number(d.rating) || null,
        reviewCount: Number(d.reviewCount) || null,
        tag: d.tag,
        category: d.category,
        highlights: nonEmpty(d.highlights),
        itinerary: nonEmpty(d.itinerary).map((item, i) => ({
            day: item.day ?? i + 1,
            title: item.title,
            desc: item.desc || item.activity || item.description,
        })),
        inclusions: nonEmpty(d.inclusions),
        exclusions: nonEmpty(d.exclusions),
        faqs: nonEmpty(d.faqs).length ? nonEmpty(d.faqs) : DEFAULT_FAQS,
    };
};

const DestinationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState('');
    const [minDate] = useState(todayISO);
    const [activeSection, setActiveSection] = useState('overview');
    const [toast, setToast] = useState('');
    const toastTimer = useRef(null);
    const sectionNavRef = useRef(null);

    const { has, toggle } = useWishlist();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // First check static data
                if (destinationsData[id]) {
                    setData(destinationsData[id]);
                } else {
                    // Try fetching from API
                    const { data: pkgData } = await API.get(`/packages/${id}`);

                    // Determine enrichment key
                    const titleLower = pkgData.title.toLowerCase();
                    let enrichKey = null;
                    if (titleLower.includes('chakrata')) enrichKey = 'chakrata';
                    else if (titleLower.includes('spiti')) enrichKey = 'shimla';
                    else if (titleLower.includes('manali')) enrichKey = 'manali';
                    else if (titleLower.includes('ladakh')) enrichKey = 'ladakh';
                    else if (titleLower.includes('kashmir')) enrichKey = 'kashmir';
                    else if (titleLower.includes('sikkim')) enrichKey = 'sikkim';

                    const staticInfo = enrichKey ? destinationsData[enrichKey] : {};

                    // Map API fields and merge with static if available
                    const mergedData = {
                        ...staticInfo,
                        ...pkgData,
                        name: pkgData.title,
                        state: pkgData.location,
                        images: {
                            hero: pkgData.image || staticInfo.images?.hero || FALLBACK_IMAGE,
                        },
                        // New (optional) package fields — older packages may not have them
                        gallery: Array.isArray(pkgData.images) ? pkgData.images : [],
                        originalPrice: pkgData.originalPrice,
                        rating: pkgData.rating,
                        reviewCount: pkgData.reviewCount,
                        difficulty: pkgData.difficulty,
                        bestSeason: pkgData.bestSeason,
                        groupSize: pkgData.groupSize,
                        altitude: pkgData.altitude || staticInfo.altitude,
                        highlights: pkgData.highlights,
                        tag: pkgData.tag,
                        category: pkgData.category,
                        packageSummary: {
                            duration: pkgData.duration || staticInfo.packageSummary?.duration,
                            price: pkgData.price,
                            destinations: pkgData.location,
                        },
                        itinerary: (pkgData.itinerary && pkgData.itinerary.length > 0)
                            ? pkgData.itinerary.map(item => ({
                                day: item.day,
                                title: item.title,
                                desc: item.activity || item.description
                            }))
                            : (staticInfo.itinerary || [
                                { day: 1, title: "Arrival", desc: "Arrival and local sightseeing." },
                                { day: 2, title: "Exploration", desc: "Full day of adventure and sightseeing." },
                                { day: 3, title: "Departure", desc: "Return journey with beautiful memories." }
                            ]),
                        inclusions: (pkgData.inclusions && pkgData.inclusions.length > 0) ? pkgData.inclusions : (staticInfo.inclusions || ["Stay", "Meals", "Transfers"]),
                        exclusions: (pkgData.exclusions && pkgData.exclusions.length > 0) ? pkgData.exclusions : (staticInfo.exclusions || ["Personal expenses", "Tips"]),
                        faqs: staticInfo.faqs || DEFAULT_FAQS,
                        packages: [{ price: pkgData.price }]
                    };

                    setData(mergedData);
                }
            } catch (error) {
                console.error("Failed to fetch destination details", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const trip = useMemo(() => (data ? normalize(data) : null), [data]);

    const sections = useMemo(() => {
        if (!trip) return [];
        return [
            { id: 'overview', label: 'Overview' },
            trip.highlights.length > 0 && { id: 'highlights', label: 'Highlights' },
            trip.itinerary.length > 0 && { id: 'itinerary', label: 'Itinerary' },
            (trip.inclusions.length > 0 || trip.exclusions.length > 0) && { id: 'inclusions', label: 'Inclusions' },
            trip.faqs.length > 0 && { id: 'faq', label: 'FAQ' },
        ].filter(Boolean);
    }, [trip]);

    // Scroll-spy: highlight the section currently under the sticky nav
    useEffect(() => {
        if (!sections.length) return undefined;
        const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-170px 0px -55% 0px' }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    // Keep the active pill visible inside the horizontally scrolling nav on mobile
    useEffect(() => {
        const nav = sectionNavRef.current;
        const btn = nav?.querySelector(`[data-section="${activeSection}"]`);
        if (!nav || !btn || nav.scrollWidth <= nav.clientWidth) return;
        nav.scrollTo({ left: btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2, behavior: 'smooth' });
    }, [activeSection]);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const showToast = (message) => {
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(''), 2400);
    };

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const share = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: trip.title, text: `${trip.title} · Safar Chaska`, url });
                return;
            } catch (err) {
                if (err?.name === 'AbortError') return;
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            showToast('Link copied');
        } catch {
            showToast("Couldn't copy — please copy the address bar");
        }
    };

    const book = () => {
        if (!trip?._id) {
            navigate('/booking');
            return;
        }
        const params = new URLSearchParams({ package: trip._id, guests: String(guests) });
        if (date) params.set('date', date);
        navigate(`/booking?${params.toString()}`);
    };

    if (loading) return <DetailsSkeleton />;

    if (!trip) {
        return (
            <div className="bg-sand min-h-screen flex flex-col overflow-x-clip">
                <Navbar />
                <main className="flex-1 flex items-center justify-center px-6 pt-36 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="max-w-lg text-center"
                    >
                        <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-white shadow-premium flex items-center justify-center">
                            <Compass className="w-8 h-8 text-primary" strokeWidth={1.5} />
                        </div>
                        <p className="eyebrow mb-5">Journey not found</p>
                        <h1 className="heading-premium text-4xl md:text-6xl mb-5">This trail has <em>gone quiet</em></h1>
                        <p className="text-slate-500 leading-relaxed mb-10">
                            The journey you're looking for may have been retired, renamed, or the server is waking up. Explore our current trips or ask a captain directly.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link to="/packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold transition-colors hover:bg-[#0d6961] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25">
                                Browse journeys <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/15 text-ink text-sm font-semibold transition-colors hover:bg-ink hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25">
                                <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    const wishId = trip._id || id;
    const saved = has(wishId);
    const off = discountPercent(trip.price, trip.originalPrice);

    const facts = [
        { icon: Clock, label: 'Duration', value: trip.duration },
        { icon: Gauge, label: 'Difficulty', value: trip.difficulty },
        { icon: Mountain, label: 'Altitude', value: trip.altitude },
        { icon: Sun, label: 'Best season', value: trip.bestSeason },
        { icon: Users, label: 'Group size', value: trip.groupSize },
    ].filter((f) => f.value);

    const gallery = trip.gallery.slice(0, 5);
    const seoDescription = String(trip.description || `${trip.title} — a handcrafted ${trip.duration || ''} journey in ${trip.location} by Safar Chaska.`).slice(0, 158);
    // No aggregateRating here on purpose: only add it once ratings come from real, verifiable reviews.
    const tripJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: trip.title,
        description: seoDescription,
        image: trip.hero?.startsWith('http') ? trip.hero : `${SITE_URL}${trip.hero}`,
        touristType: trip.category,
        itinerary: trip.itinerary.length ? {
            '@type': 'ItemList',
            itemListElement: trip.itinerary.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: `Day ${d.day}: ${d.title}` })),
        } : undefined,
        offers: trip.price ? {
            '@type': 'Offer',
            price: trip.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/destination/${id}`,
        } : undefined,
        provider: { '@type': 'TravelAgency', name: 'Safar Chaska', url: SITE_URL },
    };
    const paragraphs = String(trip.description || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    return (
        <div className="bg-sand min-h-screen overflow-x-clip pb-[84px] lg:pb-0 selection:bg-primary selection:text-white">
            <Navbar />
            <Seo title={trip.title} description={seoDescription} image={trip.hero} type="article" jsonLd={tripJsonLd} />

            {/* Hero */}
            <section className={`grain relative h-[85svh] min-h-[560px] flex items-end bg-ink overflow-hidden ${facts.length ? 'pb-20 md:pb-24' : 'pb-12 md:pb-16'}`}>
                <img
                    src={trip.hero}
                    alt={trip.title}
                    onError={onImageError}
                    className="absolute inset-0 w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/45" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

                <div className="container-custom relative z-10 w-full text-white">
                    <motion.nav
                        aria-label="Breadcrumb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-6 md:mb-8"
                    >
                        <ol className="flex items-center gap-1.5 text-xs text-white/60 min-w-0">
                            <li><Link to="/" className="hover:text-white transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">Home</Link></li>
                            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                            <li><Link to="/packages" className="hover:text-white transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">Packages</Link></li>
                            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                            <li className="text-white/90 truncate min-w-0" aria-current="page">{trip.title}</li>
                        </ol>
                    </motion.nav>

                    {trip.location && (
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                            className="eyebrow !text-secondary mb-5"
                        >
                            <MapPin className="w-3.5 h-3.5 -ml-1" /> {trip.location}
                        </motion.p>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
                        className="heading-premium !text-white text-[2.5rem] sm:text-6xl md:text-7xl max-w-4xl break-words"
                    >
                        {trip.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: EASE }}
                        className="mt-7 flex flex-wrap items-center gap-3"
                    >
                        {(trip.tag || trip.category) && (
                            <span className="py-1.5 px-3.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-medium uppercase tracking-[0.2em]">
                                {trip.tag || trip.category}
                            </span>
                        )}
                        {trip.rating && (
                            <span className="flex items-center gap-1.5 text-sm text-white/85">
                                <Star className="w-4 h-4 text-secondary fill-secondary" />
                                <span className="font-semibold text-white">{trip.rating.toFixed(1)}</span>
                                {trip.reviewCount && <span className="text-white/60">· {trip.reviewCount.toLocaleString('en-IN')} reviews</span>}
                            </span>
                        )}

                        <span className="flex items-center gap-2 sm:ml-auto">
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.85 }}
                                onClick={() => toggle(wishId)}
                                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                                aria-pressed={saved}
                                className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${saved ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/15 border-white/25 text-white hover:bg-white hover:text-rose-500'}`}
                            >
                                <motion.span key={saved ? 'on' : 'off'} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
                                    <Heart className={`w-[18px] h-[18px] ${saved ? 'fill-current' : ''}`} />
                                </motion.span>
                            </motion.button>
                            <button
                                type="button"
                                onClick={share}
                                aria-label="Share this journey"
                                className="h-11 px-4 rounded-full inline-flex items-center gap-2 text-sm font-medium bg-white/15 border border-white/25 backdrop-blur-md text-white transition-colors duration-300 hover:bg-white hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Quick facts */}
            {facts.length > 0 && (
                <div className="container-custom relative z-20 -mt-12 md:-mt-14">
                    <motion.dl
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: EASE }}
                        className="flex flex-wrap bg-white rounded-3xl shadow-premium border border-ink/5 overflow-hidden"
                    >
                        {facts.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div key={f.label} className="flex-1 basis-[140px] flex items-center gap-3 px-5 py-5 md:px-6 md:py-6 border-ink/5 border-b sm:border-b-0 sm:border-r last:border-r-0">
                                    <span className="shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                                    </span>
                                    <div className="min-w-0">
                                        <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-0.5">{f.label}</dt>
                                        <dd className="text-sm font-medium text-ink break-words">{f.value}</dd>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.dl>
                </div>
            )}

            {/* Sticky section nav */}
            <div className="sticky top-[72px] lg:top-16 z-30 mt-10 md:mt-14 bg-sand/85 backdrop-blur-xl backdrop-saturate-150 border-y border-ink/5">
                <div className="container-custom flex items-center justify-between gap-4">
                    <nav aria-label="Page sections" ref={sectionNavRef} className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide min-w-0">
                        <ul className="flex items-center gap-1 w-max py-3">
                            {sections.map((s) => {
                                const active = activeSection === s.id;
                                return (
                                    <li key={s.id}>
                                        <button
                                            type="button"
                                            data-section={s.id}
                                            onClick={() => scrollToSection(s.id)}
                                            aria-current={active ? 'true' : undefined}
                                            className={`relative h-10 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'text-white' : 'text-slate-600 hover:text-ink'}`}
                                        >
                                            {active && <motion.span layoutId="section-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE }} />}
                                            <span className="relative">{s.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <span className="font-serif text-xl text-ink">{formatINR(trip.price)}<span className="font-sans text-xs text-slate-500"> / person</span></span>
                        <Button size="sm" onClick={book} className="rounded-full !py-2">Book now</Button>
                    </div>
                </div>
            </div>

            <main className="container-custom py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
                    <div className="lg:col-span-8 min-w-0 space-y-20 md:space-y-28">
                        {/* Overview */}
                        <section id="overview" className="scroll-mt-[160px]" aria-labelledby="overview-title">
                            <p className="eyebrow mb-5">Overview</p>
                            <h2 id="overview-title" className="heading-premium text-3xl md:text-5xl mb-8">
                                About this <em>journey</em>
                            </h2>
                            {trip.tagline && <p className="font-serif italic font-light text-xl md:text-2xl text-primary mb-6">{trip.tagline}</p>}
                            <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed">
                                {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : (
                                    <p>A thoughtfully paced Himalayan journey with handpicked stays, local food and a trip captain who knows every bend of the road.</p>
                                )}
                            </div>

                            {gallery.length > 1 && <Gallery images={gallery} title={trip.title} />}
                        </section>

                        {/* Highlights */}
                        {trip.highlights.length > 0 && (
                            <section id="highlights" className="scroll-mt-[160px]" aria-labelledby="highlights-title">
                                <p className="eyebrow mb-5">Highlights</p>
                                <h2 id="highlights-title" className="heading-premium text-3xl md:text-5xl mb-10">
                                    Moments you'll <em>carry home</em>
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                    {trip.highlights.map((h, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 14 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
                                            className="flex items-start gap-4 py-4 border-b border-ink/10"
                                        >
                                            <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
                                            </span>
                                            <span className="pt-1.5 text-ink leading-relaxed">{h}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Itinerary */}
                        {trip.itinerary.length > 0 && (
                            <section id="itinerary" className="scroll-mt-[160px]" aria-labelledby="itinerary-title">
                                <p className="eyebrow mb-5">Itinerary</p>
                                <h2 id="itinerary-title" className="heading-premium text-3xl md:text-5xl mb-10">
                                    Day by <em>day</em>
                                </h2>
                                <ItineraryTimeline days={trip.itinerary} />
                            </section>
                        )}

                        {/* Inclusions */}
                        {(trip.inclusions.length > 0 || trip.exclusions.length > 0) && (
                            <section id="inclusions" className="scroll-mt-[160px]" aria-labelledby="inclusions-title">
                                <p className="eyebrow mb-5">What's included</p>
                                <h2 id="inclusions-title" className="heading-premium text-3xl md:text-5xl mb-10">
                                    The <em>fine print</em>, made simple
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {trip.inclusions.length > 0 && (
                                        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-premium border border-ink/5">
                                            <h3 className="font-serif font-light text-2xl text-ink mb-6">Included</h3>
                                            <ul className="space-y-4">
                                                {trip.inclusions.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                                                            <Check className="w-3 h-3" strokeWidth={3} />
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {trip.exclusions.length > 0 && (
                                        <div className="rounded-3xl bg-white/40 p-6 md:p-8 border border-ink/10">
                                            <h3 className="font-serif font-light text-2xl text-slate-500 mb-6">Not included</h3>
                                            <ul className="space-y-4">
                                                {trip.exclusions.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-500 leading-relaxed">
                                                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-ink/5 text-slate-400 flex items-center justify-center">
                                                            <X className="w-3 h-3" strokeWidth={3} />
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* FAQ */}
                        {trip.faqs.length > 0 && (
                            <section id="faq" className="scroll-mt-[160px]" aria-labelledby="faq-title">
                                <p className="eyebrow mb-5">FAQ</p>
                                <h2 id="faq-title" className="heading-premium text-3xl md:text-5xl mb-10">
                                    Good <em>questions</em>
                                </h2>
                                <FaqList faqs={trip.faqs} />
                            </section>
                        )}
                    </div>

                    {/* Booking card */}
                    <aside className="lg:col-span-4 min-w-0" aria-label="Book this trip">
                        <div className="lg:sticky lg:top-[160px] lg:max-h-[calc(100svh-180px)] lg:overflow-y-auto scrollbar-hide rounded-3xl">
                            <BookingCard
                                trip={trip}
                                routeId={id}
                                guests={guests}
                                setGuests={setGuests}
                                date={date}
                                setDate={setDate}
                                minDate={minDate}
                                onBook={book}
                            />
                        </div>
                    </aside>
                </div>
            </main>

            <SimilarJourneys currentId={trip._id || id} category={trip.category} />

            <CTA />
            <Footer />

            {/* Mobile booking bar */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
                className="lg:hidden fixed bottom-0 inset-x-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-ink/10 shadow-[0_-10px_30px_-15px_rgba(11,18,21,0.25)]"
            >
                <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">From</p>
                        <p className="flex items-baseline gap-2 whitespace-nowrap">
                            <span className="font-serif text-2xl text-ink leading-none">{formatINR(trip.price)}</span>
                            {off > 0 ? (
                                <span className="hidden min-[400px]:inline text-xs text-slate-400 line-through">{formatINR(trip.originalPrice)}</span>
                            ) : (
                                <span className="hidden min-[400px]:inline text-xs text-slate-500">/ person</span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href={whatsappLink(trip.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Enquire on WhatsApp"
                            className="w-12 h-12 rounded-2xl border border-[#25D366]/40 text-[#128C7E] flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/25"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </a>
                        <Button onClick={book} className="!px-6 !py-3.5 text-sm" aria-label={`Book ${trip.title}`}>
                            Book now
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        role="status"
                        initial={{ opacity: 0, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="fixed left-1/2 bottom-28 lg:bottom-10 z-[70] flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm shadow-premium whitespace-nowrap"
                    >
                        <Link2 className="w-4 h-4 text-secondary" /> {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Asymmetric gallery: first image is the hero tile, the rest fill around it.
const Gallery = ({ images, title }) => {
    const n = images.length;
    const cols = n === 2 ? 'grid-cols-2' : n === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4';
    const tile = (i) => {
        if (n === 2) return 'row-span-2';
        if (i === 0) return 'col-span-2 row-span-2';
        if (n === 4 && i === 3) return 'col-span-2';
        return '';
    };

    return (
        <div className={`mt-12 grid ${cols} auto-rows-[130px] sm:auto-rows-[170px] md:auto-rows-[190px] gap-3 md:gap-4`}>
            {images.map((src, i) => (
                <motion.figure
                    key={src + i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                    className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-ink ${tile(i)}`}
                >
                    <img
                        src={src}
                        alt={`${title} — photo ${i + 1}`}
                        loading="lazy"
                        onError={onImageError}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-premium group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                </motion.figure>
            ))}
        </div>
    );
};

const DetailsSkeleton = () => (
    <div className="bg-sand min-h-screen overflow-x-clip" aria-busy="true" aria-label="Loading journey">
        <Navbar />
        <div className="relative h-[85svh] min-h-[560px] bg-ink overflow-hidden flex items-end pb-24">
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-[#13202a] to-[#1b2b33] animate-pulse" />
            <div className="container-custom relative w-full space-y-5">
                <div className="h-3 w-48 rounded-full bg-white/10" />
                <div className="h-3 w-32 rounded-full bg-secondary/30" />
                <div className="h-12 md:h-16 w-4/5 md:w-3/5 rounded-2xl bg-white/10" />
                <div className="h-12 md:h-16 w-1/2 md:w-2/5 rounded-2xl bg-white/10" />
                <div className="flex gap-3 pt-2">
                    <div className="h-8 w-24 rounded-full bg-white/10" />
                    <div className="h-8 w-32 rounded-full bg-white/10" />
                </div>
            </div>
        </div>
        <div className="container-custom -mt-12 relative z-10">
            <div className="h-24 rounded-3xl bg-white shadow-premium animate-pulse" />
        </div>
        <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-4 animate-pulse">
                <div className="h-3 w-24 rounded-full bg-primary/20" />
                <div className="h-10 w-2/3 rounded-xl bg-sand-dark" />
                <div className="h-4 w-full rounded-full bg-sand-dark" />
                <div className="h-4 w-11/12 rounded-full bg-sand-dark" />
                <div className="h-4 w-4/5 rounded-full bg-sand-dark" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                    <div className="col-span-2 row-span-2 h-80 rounded-3xl bg-sand-dark" />
                    <div className="h-[152px] rounded-3xl bg-sand-dark" />
                    <div className="h-[152px] rounded-3xl bg-sand-dark" />
                    <div className="h-[152px] rounded-3xl bg-sand-dark" />
                    <div className="h-[152px] rounded-3xl bg-sand-dark" />
                </div>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
                <div className="h-[520px] rounded-3xl bg-white shadow-premium animate-pulse" />
            </div>
        </div>
    </div>
);

export default DestinationDetails;
