import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, CalendarDays, Users, ShieldCheck, BadgeCheck, Headphones, ChevronDown, Wallet } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import { formatINR, onImageError } from '../../utils/format';
import { formatDate, getTripTotals, EASE } from './bookingUtils';

const TRUST = [
    { icon: ShieldCheck, label: 'Secure & private' },
    { icon: BadgeCheck, label: 'Verified local guides' },
    { icon: Headphones, label: '24×7 trip support' },
];

const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
        <span className="flex items-center gap-2.5 text-slate-500">
            <Icon className="w-4 h-4 text-primary/70" aria-hidden="true" /> {label}
        </span>
        <span className="font-medium text-ink text-right">{value}</span>
    </div>
);

const Breakdown = ({ pkg, guests }) => {
    const { price, savings, total } = getTripTotals(pkg, guests);
    return (
        <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-500">
                <span>{formatINR(price)} × {guests} {guests === 1 ? 'traveller' : 'travellers'}</span>
                <span className="text-ink tabular-nums">{formatINR(price * guests)}</span>
            </div>
            {savings > 0 && (
                <div className="flex justify-between text-primary">
                    <span>You save</span>
                    <span className="tabular-nums">−{formatINR(savings)}</span>
                </div>
            )}
            <div className="flex items-end justify-between pt-4 mt-2 border-t border-dashed border-ink/10">
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Estimated total</span>
                <AnimatedNumber value={total} className="font-serif font-light text-3xl text-ink" />
            </div>
        </div>
    );
};

const PayLaterNote = () => (
    <div className="flex gap-3 rounded-2xl bg-primary/[0.06] border border-primary/10 p-4 text-sm">
        <Wallet className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-slate-600 leading-relaxed">
            <span className="font-medium text-ink">No payment now.</span> Pay a small advance only after our team confirms availability.
        </p>
    </div>
);

const EmptyState = () => (
    <div className="p-8 text-center">
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-sand flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
        <p className="font-serif font-light text-xl text-ink">Pick a journey</p>
        <p className="mt-2 text-sm text-slate-500">Your trip summary and price will appear here.</p>
    </div>
);

// Desktop sticky card
export const TripSummaryCard = ({ pkg, travelDate, guests }) => (
    <aside aria-label="Trip summary" className="bg-white rounded-3xl shadow-premium border border-ink/5 overflow-hidden">
        <div className="px-7 pt-6 pb-4 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Trip summary</p>
            {pkg?.category && <span className="text-[11px] uppercase tracking-[0.2em] text-primary">{pkg.category}</span>}
        </div>
        <AnimatePresence mode="wait" initial={false}>
            {pkg ? (
                <motion.div
                    key={pkg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                >
                    <div className="relative mx-4 h-44 rounded-2xl overflow-hidden">
                        <img src={pkg.image} alt="" onError={onImageError} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-serif font-light text-2xl leading-tight !text-white">{pkg.title}</h3>
                            {pkg.location && (
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/75">
                                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {pkg.location}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="px-7 pt-3 divide-y divide-ink/5">
                        {pkg.duration && <Row icon={Clock} label="Duration" value={pkg.duration} />}
                        <Row icon={CalendarDays} label="Departure" value={travelDate ? formatDate(travelDate) : <span className="text-slate-400 font-normal">Not selected</span>} />
                        <Row icon={Users} label="Travellers" value={`${guests} ${guests === 1 ? 'guest' : 'guests'}`} />
                    </div>
                    <div className="px-7 pt-4 pb-6 space-y-5">
                        <Breakdown pkg={pkg} guests={guests} />
                        <PayLaterNote />
                    </div>
                </motion.div>
            ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <EmptyState />
                </motion.div>
            )}
        </AnimatePresence>
        <div className="grid grid-cols-3 border-t border-ink/5 bg-sand/60">
            {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-[10px] leading-tight text-slate-500">{label}</span>
                </div>
            ))}
        </div>
    </aside>
);

// Mobile compact bar, expandable
export const TripSummaryBar = ({ pkg, travelDate, guests }) => {
    const [open, setOpen] = useState(false);
    const { total } = getTripTotals(pkg, guests);
    if (!pkg) return null;
    return (
        <div className="lg:hidden mb-6 rounded-2xl bg-white border border-ink/5 shadow-premium overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="w-full flex items-center gap-3 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
            >
                <img src={pkg.image} alt="" onError={onImageError} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink truncate">{pkg.title}</p>
                    <p className="text-xs text-slate-500 truncate">
                        {travelDate ? formatDate(travelDate, { day: 'numeric', month: 'short' }) : 'Date TBD'} · {guests} {guests === 1 ? 'guest' : 'guests'}
                    </p>
                </div>
                <div className="text-right shrink-0">
                    <AnimatedNumber value={total} className="block font-serif text-lg text-ink" />
                    <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 inline-flex items-center gap-1">
                        Details <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </span>
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-1 space-y-4 border-t border-ink/5">
                            <div className="pt-3"><Breakdown pkg={pkg} guests={guests} /></div>
                            <PayLaterNote />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
