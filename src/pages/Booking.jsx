import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Minus, Plus, Loader2, Lock, AlertCircle, CalendarDays, Users, Mail, Phone, User, MessageSquare, Pencil, Check, Star, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import PackagePicker from '../components/booking/PackagePicker';
import Field from '../components/booking/Field';
import CancellationPolicy from '../components/booking/CancellationPolicy';
import SuccessScreen from '../components/booking/SuccessScreen';
import { TripSummaryCard, TripSummaryBar } from '../components/booking/TripSummary';
import {
    EASE, todayISO, formatDate, isValidEmail, isValidIndianPhone, normalizeIndianPhone,
    clampGuests, getTripTotals, inputClass,
} from '../components/booking/bookingUtils';
import { formatINR, FALLBACK_IMAGE } from '../utils/format';
import API from '../utils/api';

const STEPS = [
    { id: 1, label: 'Choose', hint: 'Trip, date & guests' },
    { id: 2, label: 'Details', hint: 'Who is travelling' },
    { id: 3, label: 'Review', hint: 'Confirm & send' },
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000';

const slide = {
    enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
    exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0, transition: { duration: 0.3, ease: EASE } }),
};

const validate = (step, f, agreed) => {
    const e = {};
    if (step === 1) {
        if (!f.packageId) e.packageId = 'Please choose a journey to continue.';
        if (!f.travelDate) e.travelDate = 'Pick your preferred travel date.';
        else if (f.travelDate < todayISO()) e.travelDate = 'Travel date can’t be in the past.';
        if (f.guests < 1 || f.guests > 20) e.guests = 'Groups of 1–20 can book online.';
    }
    if (step === 2) {
        if (f.userName.trim().length < 2) e.userName = 'Please enter your full name.';
        if (!f.email.trim()) e.email = 'We’ll send your itinerary here.';
        else if (!isValidEmail(f.email)) e.email = 'That email doesn’t look right.';
        if (!f.phone.trim()) e.phone = 'We’ll call you on this number to confirm.';
        else if (!isValidIndianPhone(f.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
        if (f.specialRequests.length > 1000) e.specialRequests = 'Please keep this under 1000 characters.';
    }
    if (step === 3 && !agreed) e.agreed = 'Please accept the cancellation policy to continue.';
    return e;
};

const Stepper = ({ step, onJump }) => (
    <nav aria-label="Booking progress" className="mb-8">
        <ol className="grid grid-cols-3 gap-2 sm:gap-4">
            {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                    <li key={s.id}>
                        <button
                            type="button"
                            disabled={!done}
                            onClick={() => onJump(s.id)}
                            aria-current={active ? 'step' : undefined}
                            className="group w-full text-left disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-lg"
                        >
                            <div className="h-1 rounded-full bg-ink/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={false}
                                    animate={{ width: done ? '100%' : active ? '50%' : '0%' }}
                                    transition={{ duration: 0.7, ease: EASE }}
                                />
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center shrink-0 transition-colors duration-500 ${done ? 'bg-primary text-white' : active ? 'bg-ink text-white' : 'bg-ink/5 text-slate-400'}`}>
                                    {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" /> : s.id}
                                </span>
                                <span className={`text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-colors ${active || done ? 'text-ink' : 'text-slate-400'} ${done ? 'group-hover:text-primary' : ''}`}>
                                    {s.label}
                                </span>
                            </div>
                            <p className="hidden sm:block mt-1 pl-8 text-xs text-slate-400">{s.hint}</p>
                        </button>
                    </li>
                );
            })}
        </ol>
    </nav>
);

const ReviewRow = ({ icon: Icon, label, children, onEdit }) => (
    <div className="flex items-start gap-4 py-4">
        <span className="w-9 h-9 rounded-xl bg-sand flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
        </span>
        <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <div className="mt-1 text-ink break-words">{children}</div>
        </div>
        {onEdit && (
            <button type="button" onClick={onEdit} className="shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1">
                <Pencil className="w-3 h-3" aria-hidden="true" /> Edit
            </button>
        )}
    </div>
);

const Booking = () => {
    const [searchParams] = useSearchParams();
    const [packages, setPackages] = useState([]);
    const [pkgLoading, setPkgLoading] = useState(true);
    const [pkgError, setPkgError] = useState('');

    const [[step, direction], setStepState] = useState([1, 0]);
    const [form, setForm] = useState(() => {
        const date = searchParams.get('date') || '';
        return {
            packageId: searchParams.get('package') || '',
            travelDate: /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= todayISO() ? date : '',
            guests: clampGuests(searchParams.get('guests') || 1),
            userName: '',
            email: '',
            phone: '',
            specialRequests: '',
        };
    });
    const [errors, setErrors] = useState({});
    const [agreed, setAgreed] = useState(false);
    const [policyOpen, setPolicyOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const [result, setResult] = useState(null);

    const formTopRef = useRef(null);
    const submittingRef = useRef(false);

    useEffect(() => {
        let alive = true;
        API.get('/packages')
            .then(({ data }) => {
                if (!alive) return;
                const list = Array.isArray(data) ? data : [];
                setPackages(list);
                // Drop a stale ?package= id that no longer exists
                setForm((f) => (f.packageId && !list.some((p) => p._id === f.packageId) ? { ...f, packageId: '' } : f));
            })
            .catch(() => alive && setPkgError('We couldn’t load our journeys right now. Please refresh or try again shortly.'))
            .finally(() => alive && setPkgLoading(false));
        return () => { alive = false; };
    }, []);

    const pkg = useMemo(() => packages.find((p) => p._id === form.packageId), [packages, form.packageId]);
    const { total, savings } = getTripTotals(pkg, form.guests);

    const update = (name, value) => {
        setForm((f) => ({ ...f, [name]: value }));
        setServerError('');
        // Clear an error as soon as the field becomes valid
        if (errors[name]) {
            const next = validate(step, { ...form, [name]: value }, agreed);
            setErrors((e) => ({ ...e, [name]: next[name] }));
        }
    };

    const onBlur = (name) => {
        const next = validate(step, form, agreed);
        if (form[name] !== '' || errors[name]) setErrors((e) => ({ ...e, [name]: next[name] }));
    };

    const scrollToForm = () => {
        const el = formTopRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    };

    const goTo = (target) => {
        setStepState(([cur]) => [target, target > cur ? 1 : -1]);
        setErrors({});
        setServerError('');
        requestAnimationFrame(scrollToForm);
    };

    const closePolicy = useCallback(() => setPolicyOpen(false), []);

    const focusFirstError = (errs) => {
        const first = Object.keys(errs)[0];
        requestAnimationFrame(() => {
            const el = document.querySelector(`[data-field="${first}"]`) || document.getElementById(first);
            el?.focus?.({ preventScroll: false });
        });
    };

    const next = () => {
        const errs = validate(step, form, agreed);
        if (Object.keys(errs).length) {
            setErrors(errs);
            focusFirstError(errs);
            return;
        }
        goTo(step + 1);
    };

    const submit = async () => {
        if (submittingRef.current) return;
        const errs = { ...validate(1, form), ...validate(2, form), ...validate(3, form, agreed) };
        if (errs.agreed && Object.keys(errs).length === 1) {
            setErrors(errs);
            return;
        }
        if (Object.keys(errs).length) {
            // Something upstream went stale (e.g. date rolled into the past) — send them back to fix it
            const backTo = errs.packageId || errs.travelDate || errs.guests ? 1 : 2;
            goTo(backTo);
            requestAnimationFrame(() => setErrors(errs));
            return;
        }

        submittingRef.current = true;
        setSubmitting(true);
        setServerError('');
        try {
            const payload = {
                packageId: form.packageId,
                userName: form.userName.trim(),
                email: form.email.trim(),
                phone: `+91${normalizeIndianPhone(form.phone)}`,
                travelDate: form.travelDate,
                guests: form.guests,
                specialRequests: form.specialRequests.trim(),
            };
            const { data } = await API.post('/bookings', payload);
            setResult({ booking: data, total: Number(data?.totalPrice) || total, pkg, form: { ...form } });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            const status = err?.response?.status;
            const msg = err?.response?.data?.message;
            setServerError(
                status === 429
                    ? msg || 'Too many requests from this device. Please wait a minute and try again.'
                    : msg || (err?.request && !err?.response
                        ? 'We couldn’t reach our servers. Check your connection and try again.'
                        : 'Something went wrong while sending your request. Please try again.')
            );
        } finally {
            submittingRef.current = false;
            setSubmitting(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (step < 3) next();
        else submit();
    };

    const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

    return (
        <div className="bg-sand min-h-screen overflow-x-hidden">
            <Navbar />
            <Seo title={'Book Your Trip'} description="Reserve your Himalayan journey with Safar Chaska in three simple steps. No payment now — our team confirms availability and calls you back." />

            {/* Header */}
            <header className="relative bg-ink text-white overflow-hidden grain">
                <img src={HERO_IMAGE} alt="" aria-hidden="true" onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }} className="absolute inset-0 w-full h-full object-cover opacity-35 animate-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
                <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/30 blur-[120px]" aria-hidden="true" />
                <div className="relative z-10 container-custom pt-32 pb-24 md:pt-44 md:pb-32">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="eyebrow !text-secondary">
                        {result ? 'All set' : 'Reserve in 3 easy steps'}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                        className="heading-premium !text-white text-5xl sm:text-6xl md:text-7xl mt-5 [&_em]:!text-primary-light"
                    >
                        Plan your <em>journey</em>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                        className="mt-5 max-w-xl text-white/65 leading-relaxed"
                    >
                        Tell us when you want to go — a local trip specialist confirms everything with you personally. No payment needed to request.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.45 }}
                        className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70"
                    >
                        <span className="inline-flex items-center gap-2"><Star className="w-4 h-4 text-secondary fill-secondary" aria-hidden="true" /> 4.9 from 1,200+ travellers</span>
                        <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary-light" aria-hidden="true" /> Free cancellation up to 7 days</span>
                    </motion.div>
                </div>
            </header>

            <main className="relative z-10 container-custom -mt-12 md:-mt-16 pb-24 md:pb-32">
                {result ? (
                    <SuccessScreen booking={result.booking} pkg={result.pkg} form={result.form} total={result.total} />
                ) : (
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 xl:gap-12 items-start">
                        {/* Form */}
                        <div ref={formTopRef} className="bg-white rounded-3xl shadow-premium border border-ink/5 p-5 sm:p-8 md:p-10 min-w-0">
                            <Stepper step={step} onJump={goTo} />
                            <TripSummaryBar pkg={pkg} travelDate={form.travelDate} guests={form.guests} />

                            <form onSubmit={onSubmit} noValidate>
                                <div className="relative">
                                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                                        <motion.div key={step} custom={direction} variants={slide} initial="enter" animate="center" exit="exit">
                                            {step === 1 && (
                                                <div className="space-y-8">
                                                    <div>
                                                        <h2 className="font-serif font-light text-2xl md:text-3xl text-ink">Where would you like to go?</h2>
                                                        <p className="mt-2 text-sm text-slate-500">Pick a journey, then choose your dates and group size.</p>
                                                    </div>

                                                    <div>
                                                        <p id="packageId-label" className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Journey</p>
                                                        <div data-field="packageId" tabIndex={-1} className="focus:outline-none">
                                                            <PackagePicker
                                                                packages={packages}
                                                                loading={pkgLoading}
                                                                error={pkgError}
                                                                value={form.packageId}
                                                                onChange={(id) => update('packageId', id)}
                                                                invalid={!!errors.packageId}
                                                            />
                                                        </div>
                                                        {errors.packageId && (
                                                            <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
                                                                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.packageId}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-6">
                                                        <Field id="travelDate" label="Travel date" error={errors.travelDate} hint={form.travelDate ? formatDate(form.travelDate, { weekday: 'long', day: 'numeric', month: 'long' }) : 'Flexible? Pick a tentative date.'}>
                                                            <div className="relative">
                                                                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                                                                <input
                                                                    id="travelDate"
                                                                    type="date"
                                                                    min={todayISO()}
                                                                    value={form.travelDate}
                                                                    onChange={(e) => update('travelDate', e.target.value)}
                                                                    onBlur={() => onBlur('travelDate')}
                                                                    aria-invalid={!!errors.travelDate}
                                                                    aria-describedby={describedBy('travelDate')}
                                                                    className={`${inputClass(errors.travelDate)} pl-11 min-h-[52px]`}
                                                                />
                                                            </div>
                                                        </Field>

                                                        <Field id="guests" label="Travellers" error={errors.guests} hint="Up to 20 per booking">
                                                            <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-1.5 min-h-[52px]">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => update('guests', clampGuests(form.guests - 1))}
                                                                    disabled={form.guests <= 1}
                                                                    aria-label="Remove a traveller"
                                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-ink hover:bg-sand transition disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <div id="guests" tabIndex={-1} className="flex items-center gap-2 focus:outline-none" aria-live="polite">
                                                                    <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
                                                                    <AnimatePresence mode="popLayout" initial={false}>
                                                                        <motion.span
                                                                            key={form.guests}
                                                                            initial={{ y: 10, opacity: 0 }}
                                                                            animate={{ y: 0, opacity: 1 }}
                                                                            exit={{ y: -10, opacity: 0 }}
                                                                            transition={{ duration: 0.25 }}
                                                                            className="font-medium text-ink tabular-nums w-6 text-center"
                                                                        >
                                                                            {form.guests}
                                                                        </motion.span>
                                                                    </AnimatePresence>
                                                                    <span className="text-sm text-slate-500">{form.guests === 1 ? 'guest' : 'guests'}</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => update('guests', clampGuests(form.guests + 1))}
                                                                    disabled={form.guests >= 20}
                                                                    aria-label="Add a traveller"
                                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-ink hover:bg-sand transition disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </Field>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="font-serif font-light text-2xl md:text-3xl text-ink">Who’s travelling?</h2>
                                                        <p className="mt-2 text-sm text-slate-500">We’ll only use these details to confirm your trip.</p>
                                                    </div>
                                                    <Field id="userName" label="Full name" error={errors.userName}>
                                                        <input
                                                            id="userName"
                                                            type="text"
                                                            autoComplete="name"
                                                            value={form.userName}
                                                            onChange={(e) => update('userName', e.target.value)}
                                                            onBlur={() => onBlur('userName')}
                                                            aria-invalid={!!errors.userName}
                                                            aria-describedby={describedBy('userName')}
                                                            placeholder="e.g. Aarav Sharma"
                                                            className={inputClass(errors.userName)}
                                                        />
                                                    </Field>
                                                    <div className="grid sm:grid-cols-2 gap-6">
                                                        <Field id="email" label="Email" error={errors.email}>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                inputMode="email"
                                                                autoComplete="email"
                                                                value={form.email}
                                                                onChange={(e) => update('email', e.target.value)}
                                                                onBlur={() => onBlur('email')}
                                                                aria-invalid={!!errors.email}
                                                                aria-describedby={describedBy('email')}
                                                                placeholder="you@example.com"
                                                                className={inputClass(errors.email)}
                                                            />
                                                        </Field>
                                                        <Field id="phone" label="Mobile number" error={errors.phone} hint="We’ll call or WhatsApp you here">
                                                            <div className="relative">
                                                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-slate-400">+91</span>
                                                                <input
                                                                    id="phone"
                                                                    type="tel"
                                                                    inputMode="tel"
                                                                    autoComplete="tel-national"
                                                                    value={form.phone}
                                                                    onChange={(e) => update('phone', e.target.value.replace(/[^\d+\s-]/g, '').slice(0, 16))}
                                                                    onBlur={() => onBlur('phone')}
                                                                    aria-invalid={!!errors.phone}
                                                                    aria-describedby={describedBy('phone') || 'phone-hint'}
                                                                    placeholder="98765 43210"
                                                                    className={`${inputClass(errors.phone)} pl-14`}
                                                                />
                                                            </div>
                                                        </Field>
                                                    </div>
                                                    <Field id="specialRequests" label="Special requests" optional error={errors.specialRequests} hint={`${form.specialRequests.length}/1000 · dietary needs, pickup point, celebrations…`}>
                                                        <textarea
                                                            id="specialRequests"
                                                            rows={4}
                                                            value={form.specialRequests}
                                                            onChange={(e) => update('specialRequests', e.target.value)}
                                                            aria-invalid={!!errors.specialRequests}
                                                            aria-describedby={describedBy('specialRequests')}
                                                            placeholder="Anything we should know to make this trip perfect?"
                                                            className={`${inputClass(errors.specialRequests)} resize-none`}
                                                        />
                                                    </Field>
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="font-serif font-light text-2xl md:text-3xl text-ink">Review your request</h2>
                                                        <p className="mt-2 text-sm text-slate-500">Double-check everything — you can edit any section.</p>
                                                    </div>

                                                    <div className="rounded-2xl border border-ink/5 bg-sand/40 px-4 sm:px-6 divide-y divide-ink/5">
                                                        <ReviewRow icon={CalendarDays} label="Journey" onEdit={() => goTo(1)}>
                                                            <p className="font-medium">{pkg?.title}</p>
                                                            <p className="text-sm text-slate-500">{formatDate(form.travelDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}{pkg?.duration ? ` · ${pkg.duration}` : ''}</p>
                                                        </ReviewRow>
                                                        <ReviewRow icon={Users} label="Travellers" onEdit={() => goTo(1)}>
                                                            {form.guests} {form.guests === 1 ? 'guest' : 'guests'}
                                                        </ReviewRow>
                                                        <ReviewRow icon={User} label="Lead traveller" onEdit={() => goTo(2)}>
                                                            <p className="font-medium">{form.userName}</p>
                                                            <p className="text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                                                                <span className="inline-flex items-center gap-1.5 min-w-0 break-all"><Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{form.email}</span>
                                                                <span className="inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />+91 {normalizeIndianPhone(form.phone)}</span>
                                                            </p>
                                                        </ReviewRow>
                                                        {form.specialRequests.trim() && (
                                                            <ReviewRow icon={MessageSquare} label="Special requests" onEdit={() => goTo(2)}>
                                                                <p className="text-sm text-slate-600 whitespace-pre-line">{form.specialRequests}</p>
                                                            </ReviewRow>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-ink text-white px-5 py-4">
                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Estimated total</p>
                                                            {savings > 0 && <p className="text-xs text-primary-light mt-0.5">Includes {formatINR(savings)} savings</p>}
                                                        </div>
                                                        <p className="font-serif font-light text-2xl sm:text-3xl tabular-nums">{formatINR(total)}</p>
                                                    </div>

                                                    <div>
                                                        <label className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${errors.agreed ? 'border-rose-300 bg-rose-50/50' : 'border-ink/10 hover:border-ink/20'}`}>
                                                            <input
                                                                id="agreed"
                                                                type="checkbox"
                                                                checked={agreed}
                                                                onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setErrors((er) => ({ ...er, agreed: undefined })); }}
                                                                aria-invalid={!!errors.agreed}
                                                                aria-describedby={errors.agreed ? 'agreed-error' : undefined}
                                                                className="mt-0.5 w-5 h-5 shrink-0 rounded border-ink/30 accent-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                                            />
                                                            <span className="text-sm text-slate-600 leading-relaxed">
                                                                I agree to the{' '}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => { e.preventDefault(); setPolicyOpen(true); }}
                                                                    className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                                                                >
                                                                    cancellation policy
                                                                </button>
                                                                {' '}— free cancellation up to 7 days before departure.
                                                            </span>
                                                        </label>
                                                        {errors.agreed && (
                                                            <p id="agreed-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
                                                                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.agreed}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <AnimatePresence>
                                    {serverError && (
                                        <motion.div
                                            role="alert"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                                                <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                                                <p>{serverError}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Actions */}
                                <div className="mt-10 pt-6 border-t border-ink/5 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                                    {step > 1 ? (
                                        <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} disabled={submitting} className="sm:w-auto w-full">
                                            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                                        </Button>
                                    ) : (
                                        <p className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                                            <Lock className="w-3.5 h-3.5" aria-hidden="true" /> Your details are never shared
                                        </p>
                                    )}
                                    <Button type="submit" disabled={submitting || (step === 1 && pkgLoading)} aria-busy={submitting} className="sm:w-auto w-full sm:min-w-[220px]">
                                        {submitting ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending request…</>
                                        ) : step < 3 ? (
                                            <>Continue <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                                        ) : (
                                            <>Request booking <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                                        )}
                                    </Button>
                                </div>
                                {step === 3 && (
                                    <p className="mt-4 text-center sm:text-right text-xs text-slate-400">No payment now — pay after confirmation.</p>
                                )}
                            </form>
                        </div>

                        {/* Summary */}
                        <div className="hidden lg:block sticky top-28">
                            <TripSummaryCard pkg={pkg} travelDate={form.travelDate} guests={form.guests} />
                        </div>
                    </div>
                )}
            </main>

            <CancellationPolicy open={policyOpen} onClose={closePolicy} />
            <Footer />
        </div>
    );
};

export default Booking;
