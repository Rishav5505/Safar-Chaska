import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, CalendarDays, Users, MessageCircle, FileText, PhoneCall, ShieldCheck, Headphones, RotateCcw, Check, Loader2, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import AnimatedPrice from './AnimatedPrice';
import API from '../../utils/api';
import { formatINR, discountPercent } from '../../utils/format';
import { MIN_GUESTS, MAX_GUESTS, whatsappLink } from './constants';

const trust = [
    { icon: RotateCcw, label: 'Free cancellation up to 7 days*' },
    { icon: ShieldCheck, label: 'Secure booking' },
    { icon: Headphones, label: '24/7 captain support' },
];

const fieldLabel = 'block text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2';

const CallbackForm = ({ packageId, title }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '' });
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    const submit = async (e) => {
        e.preventDefault();
        const phone = form.phone.replace(/[^\d+]/g, '');
        if (form.name.trim().length < 2) return setStatus({ state: 'error', message: 'Please enter your name.' });
        if (phone.replace(/\D/g, '').length < 10) return setStatus({ state: 'error', message: 'Please enter a valid 10-digit phone number.' });

        setStatus({ state: 'loading', message: '' });
        try {
            await API.post('/enquiries', {
                name: form.name.trim(),
                phone,
                source: 'package',
                ...(packageId ? { packageId } : {}),
                message: title,
            });
            setStatus({ state: 'success', message: "Thanks! A trip captain will call you within a few hours." });
            setForm({ name: '', phone: '' });
        } catch {
            setStatus({ state: 'error', message: "Couldn't send right now — please try WhatsApp instead." });
        }
    };

    return (
        <div className="rounded-2xl bg-sand/70 border border-ink/5">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="callback-form"
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-ink rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-primary" /> Request a callback</span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}><Plus className="w-4 h-4" /></motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id="callback-form"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        {status.state === 'success' ? (
                            <p role="status" className="mx-4 mb-4 flex items-start gap-2 rounded-xl bg-primary/10 text-primary text-sm p-3">
                                <Check className="w-4 h-4 mt-0.5 shrink-0" /> {status.message}
                            </p>
                        ) : (
                            <form onSubmit={submit} className="px-4 pb-4 space-y-2.5" noValidate>
                                <label className="sr-only" htmlFor="cb-name">Your name</label>
                                <input
                                    id="cb-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-white border border-ink/10 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                                <label className="sr-only" htmlFor="cb-phone">Phone number</label>
                                <input
                                    id="cb-phone"
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="Phone number"
                                    value={form.phone}
                                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-xl bg-white border border-ink/10 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                                {status.state === 'error' && (
                                    <p role="alert" className="text-xs text-rose-600">{status.message}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status.state === 'loading'}
                                    className="w-full h-11 rounded-xl bg-ink text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-primary disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                                >
                                    {status.state === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Call me back <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BookingCard = ({ trip, routeId, guests, setGuests, date, setDate, minDate, onBook }) => {
    const off = discountPercent(trip.price, trip.originalPrice);
    const total = trip.price * guests;

    const openBrochure = (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = `/brochures/${routeId}.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="book" className="scroll-mt-40 rounded-3xl bg-white shadow-premium border border-ink/5 overflow-hidden">
            <div className="p-6 md:p-7 border-b border-ink/5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">Starting from</p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif font-light text-4xl text-ink leading-none">{formatINR(trip.price)}</span>
                    {off > 0 && <span className="text-sm text-slate-400 line-through">{formatINR(trip.originalPrice)}</span>}
                    {off > 0 && (
                        <span className="py-1 px-2.5 rounded-full bg-secondary/15 text-secondary-dark text-[10px] font-bold uppercase tracking-[0.15em]">
                            Save {off}%
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500 mt-2">per person · taxes included</p>
            </div>

            <div className="p-6 md:p-7 space-y-4">
                <div>
                    <label htmlFor="travel-date" className={fieldLabel}>Travel date</label>
                    <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <input
                            id="travel-date"
                            type="date"
                            min={minDate}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 rounded-xl bg-sand/60 border border-ink/10 text-sm text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div>
                    <span id="guests-label" className={fieldLabel}>Travellers</span>
                    <div className="flex items-center justify-between h-12 px-2 rounded-xl bg-sand/60 border border-ink/10" role="group" aria-labelledby="guests-label">
                        <button
                            type="button"
                            onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                            disabled={guests <= MIN_GUESTS}
                            aria-label="Remove a traveller"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex items-center gap-2 text-sm font-medium text-ink" aria-live="polite">
                            <Users className="w-4 h-4 text-primary" /> {guests} {guests === 1 ? 'traveller' : 'travellers'}
                        </span>
                        <button
                            type="button"
                            onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                            disabled={guests >= MAX_GUESTS}
                            aria-label="Add a traveller"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between pt-1">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-1">Total</p>
                        <p className="text-xs text-slate-400">{formatINR(trip.price)} × {guests}</p>
                    </div>
                    <AnimatedPrice value={total} className="font-serif text-3xl text-ink leading-none" />
                </div>

                <Button onClick={onBook} className="hidden lg:inline-flex w-full rounded-xl" aria-label={`Book ${trip.title}`}>
                    Book this trip <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-2.5">
                    <a
                        href={whatsappLink(trip.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 px-3 inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 text-[#128C7E] text-sm font-semibold whitespace-nowrap transition-colors hover:bg-[#25D366]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/25"
                    >
                        <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                    </a>
                    <a
                        href={`/brochures/${routeId}.pdf`}
                        onClick={openBrochure}
                        aria-label="View brochure (PDF)"
                        className="h-12 px-3 inline-flex items-center justify-center gap-2 rounded-xl border border-ink/10 text-ink text-sm font-medium whitespace-nowrap transition-colors hover:border-ink/30 hover:bg-sand/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                    >
                        <FileText className="w-4 h-4 text-secondary-dark" /> Brochure
                    </a>
                </div>

                <CallbackForm packageId={trip._id} title={trip.title} />
            </div>

            <ul className="grid grid-cols-3 gap-2 px-4 md:px-5 py-4 bg-sand/50 border-t border-ink/5">
                {trust.map((t) => {
                    const Icon = t.icon;
                    return (
                        <li key={t.label} className="flex flex-col items-center text-center gap-1.5 text-[11px] leading-snug text-slate-600">
                            <Icon className="w-4 h-4 text-primary shrink-0" /> {t.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BookingCard;
