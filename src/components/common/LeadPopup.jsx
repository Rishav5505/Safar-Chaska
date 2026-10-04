import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import API from '../../utils/api';
import AnimatedCheck from '../booking/AnimatedCheck';
import { EASE, WHATSAPP_NUMBER, normalizeIndianPhone, isValidIndianPhone, inputClass } from '../booking/bookingUtils';

const STORE_KEY = 'sc_lead_popup';
const SNOOZE_DAYS = 7;
const DELAY_MS = 35000;
const DESTINATIONS = ['Chakrata', 'Ladakh', 'Kashmir', 'Kedarnath', 'Spiti', 'Manali', 'Rajasthan', 'Not sure yet'];
const MONTHS = ['This month', 'Next month', 'In 2–3 months', 'Later this year', 'Just exploring'];
// Pages where a popup would interrupt someone already converting
const QUIET_PATHS = ['/booking', '/contact', '/admin'];

const readState = () => {
    try {
        return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch {
        return {};
    }
};
const writeState = (state) => {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
        // storage blocked — popup may show again next visit, acceptable
    }
};
const isSnoozed = () => {
    const { done, dismissedAt } = readState();
    return done || (dismissedAt && Date.now() - dismissedAt < SNOOZE_DAYS * 864e5);
};

// "Free custom trip plan" lead capture: opens after ~35s or on exit intent, at most once a week.
// After dismissal a small pill stays available so interested visitors can reopen it.
const LeadPopup = () => {
    const { pathname } = useLocation();
    const quiet = QUIET_PATHS.some((p) => pathname.startsWith(p));
    const [open, setOpen] = useState(false);
    const [showPill, setShowPill] = useState(() => !readState().done);
    const [form, setForm] = useState({ name: '', phone: '', destination: '', when: '', travellers: 2 });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | done | error
    const [serverError, setServerError] = useState('');
    const firstInput = useRef(null);

    // Auto-open triggers
    useEffect(() => {
        if (quiet || isSnoozed()) return;
        // Re-check the snooze at trigger time: the visitor may have closed or submitted it meanwhile
        const timer = setTimeout(() => !isSnoozed() && setOpen(true), DELAY_MS);
        const onExit = (e) => {
            if (e.clientY <= 0 && !e.relatedTarget && !isSnoozed()) setOpen(true);
        };
        document.addEventListener('mouseout', onExit);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseout', onExit);
        };
    }, [quiet]);

    const close = () => {
        setOpen(false);
        if (status !== 'done') writeState({ ...readState(), dismissedAt: Date.now() });
    };

    // Lock page scroll, focus first field, close on Escape
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const t = setTimeout(() => firstInput.current?.focus(), 400);
        const onKey = (e) => e.key === 'Escape' && close();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            clearTimeout(t);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    const set = (key, value) => {
        setForm((f) => ({ ...f, [key]: value }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const next = {};
        if (!form.name.trim()) next.name = 'Please tell us your name';
        if (!isValidIndianPhone(form.phone)) next.phone = 'Enter a valid 10-digit mobile number';
        setErrors(next);
        if (Object.keys(next).length) return;

        setStatus('sending');
        setServerError('');
        try {
            await API.post('/enquiries', {
                name: form.name.trim(),
                phone: `+91${normalizeIndianPhone(form.phone)}`,
                source: 'callback',
                message: `Free trip plan request — Destination: ${form.destination || 'Not specified'}; When: ${form.when || 'Not specified'}; Travellers: ${form.travellers}`,
            });
            setStatus('done');
            setShowPill(false);
            writeState({ done: true });
        } catch (err) {
            setStatus('error');
            setServerError(err.response?.data?.message || 'Could not send right now. Please try WhatsApp instead.');
        }
    };

    const waText = encodeURIComponent(`Hi Safar Chaska! I'd like a free trip plan${form.destination ? ` for ${form.destination}` : ''}.`);

    return (
        <>
            {/* Re-open pill */}
            <AnimatePresence>
                {!quiet && showPill && !open && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 0.6, ease: EASE } }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => setOpen(true)}
                        className={`${pathname.startsWith('/destination') ? 'hidden lg:inline-flex' : 'inline-flex'} fixed bottom-6 left-4 md:left-6 z-50 items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-ink text-white text-[12px] font-medium tracking-wide shadow-premium hover:-translate-y-0.5 transition-transform duration-500 ease-premium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40`}
                    >
                        <span className="w-6 h-6 rounded-full bg-secondary text-ink flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                        </span>
                        Free trip plan
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0.15 } }}
                    >
                        <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="lead-title"
                            initial={{ y: 60, opacity: 0, scale: 0.97 }}
                            animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } }}
                            exit={{ y: 40, opacity: 0, transition: { duration: 0.3 } }}
                            className="relative w-full sm:max-w-3xl max-h-[92svh] overflow-y-auto bg-sand rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl grid sm:grid-cols-5"
                        >
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-ink flex items-center justify-center hover:rotate-90 transition-transform duration-500 ease-premium shadow-premium"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Image side */}
                            <div className="grain relative hidden sm:block sm:col-span-2 bg-ink overflow-hidden">
                                <motion.img
                                    src="/kashmir.webp"
                                    alt=""
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1, transition: { duration: 2, ease: EASE } }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                                <div className="absolute bottom-0 p-7 text-white">
                                    <p className="font-serif italic text-2xl leading-snug">“They planned every detail — we just showed up.”</p>
                                    <div className="mt-6 space-y-2.5 text-[12px] text-white/75">
                                        <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-secondary" /> Plan on WhatsApp within 2 hours</p>
                                        <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-secondary" /> No spam, no obligation</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form side */}
                            <div className="sm:col-span-3 p-6 sm:p-9">
                                <AnimatePresence mode="wait">
                                    {status === 'done' ? (
                                        <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                                            <AnimatedCheck size={88} />
                                            <h2 className="mt-6 font-serif font-light text-3xl text-ink">You're on our list, {form.name.split(' ')[0]}!</h2>
                                            <p className="mt-3 text-slate-500 max-w-sm mx-auto">A trip captain will send your personalised plan on WhatsApp shortly. Keep an eye on <span className="text-ink font-medium">+91 {normalizeIndianPhone(form.phone)}</span>.</p>
                                            <button type="button" onClick={close} className="mt-8 px-8 py-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary transition-colors">
                                                Continue exploring
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }}>
                                            <p className="eyebrow mb-3">Free · Personalised</p>
                                            <h2 id="lead-title" className="font-serif font-light text-3xl sm:text-4xl text-ink leading-tight pr-10">
                                                Get your <em className="italic text-primary">custom trip plan</em>
                                            </h2>
                                            <p className="mt-3 text-sm text-slate-500">Tell us where and when — we'll craft an itinerary with prices, at no cost.</p>

                                            <fieldset className="mt-6">
                                                <legend className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2.5">Where to?</legend>
                                                <div className="flex flex-wrap gap-2">
                                                    {DESTINATIONS.map((d) => (
                                                        <button
                                                            type="button"
                                                            key={d}
                                                            aria-pressed={form.destination === d}
                                                            onClick={() => set('destination', form.destination === d ? '' : d)}
                                                            className={`px-3.5 py-2 rounded-full text-[13px] border transition-all duration-300 ${form.destination === d ? 'bg-ink text-white border-ink' : 'bg-white border-ink/10 text-slate-600 hover:border-ink/30'}`}
                                                        >
                                                            {d}
                                                        </button>
                                                    ))}
                                                </div>
                                            </fieldset>

                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <label className="block">
                                                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">When</span>
                                                    <select value={form.when} onChange={(e) => set('when', e.target.value)} className={`${inputClass()} mt-2`}>
                                                        <option value="">Select</option>
                                                        {MONTHS.map((m) => <option key={m}>{m}</option>)}
                                                    </select>
                                                </label>
                                                <label className="block">
                                                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Travellers</span>
                                                    <input type="number" min="1" max="50" value={form.travellers} onChange={(e) => set('travellers', Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={`${inputClass()} mt-2`} />
                                                </label>
                                            </div>

                                            <div className="mt-3 grid sm:grid-cols-2 gap-3">
                                                <label className="block">
                                                    <span className="sr-only">Your name</span>
                                                    <input ref={firstInput} placeholder="Your name" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} className={inputClass(errors.name)} />
                                                    {errors.name && <span className="block mt-1.5 text-xs text-rose-500">{errors.name}</span>}
                                                </label>
                                                <label className="block">
                                                    <span className="sr-only">WhatsApp number</span>
                                                    <input placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} className={inputClass(errors.phone)} />
                                                    {errors.phone && <span className="block mt-1.5 text-xs text-rose-500">{errors.phone}</span>}
                                                </label>
                                            </div>

                                            {status === 'error' && <p role="alert" className="mt-4 text-sm text-rose-600">{serverError}</p>}

                                            <button
                                                type="submit"
                                                disabled={status === 'sending'}
                                                className="shine mt-6 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-primary text-white font-semibold shadow-[0_10px_30px_-10px_rgba(15,118,110,0.6)] hover:-translate-y-0.5 transition-all duration-500 ease-premium disabled:opacity-60"
                                            >
                                                {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Send me my free plan</>}
                                            </button>
                                            <a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 text-sm text-slate-500 hover:text-[#1da851] transition-colors"
                                            >
                                                <MessageCircle className="w-4 h-4" /> Or chat with us on WhatsApp
                                            </a>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LeadPopup;
