import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, MessageCircle, Copy, Check, Send, Loader2, AlertCircle,
    PhoneCall, Instagram, Facebook, Twitter, Zap, ShieldCheck, ArrowUpRight, RotateCcw,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Field from '../components/booking/Field';
import AnimatedCheck from '../components/booking/AnimatedCheck';
import { EASE, inputClass, isValidEmail, isValidIndianPhone, normalizeIndianPhone, WHATSAPP_NUMBER } from '../components/booking/bookingUtils';
import API from '../utils/api';

const PHONE_DISPLAY = '+91 81713 79469';
const PHONE_TEL = '+918171379469';
const EMAIL = 'hello@safarchaska.com';
const ADDRESS = 'Chakrata, Uttarakhand, India';
const MAP_QUERY = 'Chakrata, Uttarakhand';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000';

const CALL_TIMES = ['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–8)'];

const FAQS = [
    { q: 'How quickly will you reply?', a: 'Our team replies to every message in under 2 hours, 9 AM – 8 PM IST — usually much faster on WhatsApp.' },
    { q: 'Can you customise a trip?', a: 'Absolutely. Share your dates, group size and budget and we’ll craft a private itinerary around you.' },
    { q: 'Do I pay to enquire?', a: 'Never. Enquiries and callbacks are free — you only pay an advance once your trip is confirmed.' },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
});

const CopyButton = ({ value, label }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable */
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? `${label} copied` : `Copy ${label}`}
            className="relative w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={copied ? 'y' : 'n'}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </motion.span>
            </AnimatePresence>
            <AnimatePresence>
                {copied && (
                    <motion.span
                        role="status"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 right-0 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white"
                    >
                        Copied
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

const InfoCard = ({ icon: Icon, title, children, action, index }) => (
    <motion.div
        {...fadeUp(0.15 + index * 0.08)}
        className="group bg-white rounded-3xl p-5 sm:p-6 border border-ink/5 shadow-premium flex items-start gap-4 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(11,18,21,0.25)]"
    >
        <span className="w-11 h-11 rounded-2xl bg-sand flex items-center justify-center shrink-0 transition-colors duration-500 group-hover:bg-primary group-hover:text-white text-primary">
            <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{title}</p>
            <div className="mt-1 text-ink break-words">{children}</div>
        </div>
        {action}
    </motion.div>
);

const initialForm = { name: '', phone: '', email: '', message: '' };

const validate = (f, callback) => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please tell us your name.';
    if (!f.phone.trim()) e.phone = 'We need a number to reach you.';
    else if (!isValidIndianPhone(f.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (f.email.trim() && !isValidEmail(f.email)) e.email = 'That email doesn’t look right.';
    if (!callback && f.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
    if (f.message.length > 2000) e.message = 'Please keep it under 2000 characters.';
    return e;
};

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [callback, setCallback] = useState(false);
    const [callTime, setCallTime] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success
    const [serverError, setServerError] = useState('');

    const update = (name, value) => {
        const nextForm = { ...form, [name]: value };
        setForm(nextForm);
        setServerError('');
        if (errors[name]) setErrors((e) => ({ ...e, [name]: validate(nextForm, callback)[name] }));
    };

    const onBlur = (name) => {
        if (form[name] || errors[name]) setErrors((e) => ({ ...e, [name]: validate(form, callback)[name] }));
    };

    const toggleCallback = () => {
        setCallback((c) => !c);
        setErrors((e) => ({ ...e, message: undefined }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        const errs = validate(form, callback);
        if (Object.keys(errs).length) {
            setErrors(errs);
            document.getElementById(Object.keys(errs)[0])?.focus();
            return;
        }
        setStatus('sending');
        setServerError('');
        try {
            const message = [callback && callTime ? `Preferred call time: ${callTime}` : '', form.message.trim()]
                .filter(Boolean).join('\n');
            await API.post('/enquiries', {
                name: form.name.trim(),
                phone: `+91${normalizeIndianPhone(form.phone)}`,
                email: form.email.trim() || undefined,
                message: message || undefined,
                source: callback ? 'callback' : 'contact',
            });
            setStatus('success');
        } catch (err) {
            const res = err?.response;
            setServerError(
                res?.status === 429
                    ? res?.data?.message || 'You’ve sent a few messages already — please wait a minute and try again.'
                    : res?.data?.message || (err?.request && !res
                        ? 'We couldn’t reach our servers. Check your connection or message us on WhatsApp.'
                        : 'Something went wrong. Please try again or call us directly.')
            );
            setStatus('idle');
        }
    };

    const reset = () => {
        setForm(initialForm);
        setCallTime('');
        setErrors({});
        setStatus('idle');
    };

    const firstName = form.name.trim().split(' ')[0];

    return (
        <div className="bg-sand min-h-screen overflow-x-hidden">
            <Navbar />
            <Seo title={'Contact Us'} description="Talk to a Safar Chaska trip captain on call or WhatsApp at +91 81713 79469. Custom itineraries, group bookings and callback requests answered within 2 hours." />

            {/* Hero */}
            <header className="relative bg-ink text-white overflow-hidden grain">
                <img src={HERO_IMAGE} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 animate-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
                <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-primary/25 blur-[120px]" aria-hidden="true" />
                <div className="relative z-10 container-custom pt-32 pb-28 md:pt-44 md:pb-36">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="eyebrow !text-secondary">
                        Get in touch
                    </motion.p>
                    <motion.h1 {...fadeUp(0.1)} className="heading-premium !text-white text-5xl sm:text-6xl md:text-7xl mt-5 max-w-3xl [&_em]:!text-primary-light">
                        Let’s plan something <em>unforgettable</em>
                    </motion.h1>
                    <motion.p {...fadeUp(0.25)} className="mt-5 max-w-xl text-white/65 leading-relaxed">
                        Questions about a trek, a custom itinerary or a group trip? Real people from the mountains — not a call centre — will get back to you.
                    </motion.p>
                    <motion.div {...fadeUp(0.4)} className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-sm text-white/80">
                        <span className="relative flex w-2.5 h-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </span>
                        Average response time: under 2 hours
                    </motion.div>
                </div>
            </header>

            {/* Info + form */}
            <section className="relative z-10 -mt-16 md:-mt-20 pb-16 md:pb-24">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                        <InfoCard index={0} icon={Phone} title="Call us" action={<CopyButton value={PHONE_DISPLAY} label="phone number" />}>
                            <a href={`tel:${PHONE_TEL}`} className="text-lg hover:text-primary transition-colors focus:outline-none focus-visible:underline">{PHONE_DISPLAY}</a>
                        </InfoCard>
                        <InfoCard
                            index={1}
                            icon={MessageCircle}
                            title="WhatsApp"
                            action={
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Safar Chaska! I have a question about a trip.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open WhatsApp chat"
                                    className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1FAF55] hover:bg-[#1FAF55]/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            }
                        >
                            <p className="text-lg">Chat with a trip expert</p>
                            <p className="text-sm text-slate-500">Fastest way to reach us</p>
                        </InfoCard>
                        <InfoCard index={2} icon={Mail} title="Email" action={<CopyButton value={EMAIL} label="email address" />}>
                            <a href={`mailto:${EMAIL}`} className="text-lg hover:text-primary transition-colors break-all focus:outline-none focus-visible:underline">{EMAIL}</a>
                        </InfoCard>
                        <InfoCard index={3} icon={MapPin} title="Base camp">
                            <p className="text-lg">{ADDRESS}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline underline-offset-4"
                            >
                                Get directions <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                        </InfoCard>
                        <InfoCard index={4} icon={Clock} title="Hours">
                            <p className="text-lg">Mon – Sun, 9 AM – 8 PM IST</p>
                            <p className="text-sm text-slate-500">On-trip emergency line open 24×7</p>
                        </InfoCard>

                        <motion.div {...fadeUp(0.6)} className="flex items-center gap-3 pt-2">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mr-1">Follow</span>
                            {[
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Twitter, label: 'Twitter' },
                            ].map(({ Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full border border-ink/10 bg-white flex items-center justify-center text-slate-500 hover:bg-ink hover:text-white hover:border-ink transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Form card */}
                    <motion.div {...fadeUp(0.1)} className="lg:col-span-7 order-1 lg:order-2">
                        <div className="bg-white rounded-3xl shadow-premium border border-ink/5 p-5 sm:p-8 md:p-10 overflow-hidden">
                            <AnimatePresence mode="wait" initial={false}>
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                        className="py-8 sm:py-12 text-center"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <AnimatedCheck size={80} />
                                        <motion.h2 {...fadeUp(0.9)} className="heading-premium text-3xl sm:text-4xl mt-8">
                                            {callback ? <>Callback <em>requested</em></> : <>Message <em>sent</em></>}
                                        </motion.h2>
                                        <motion.p {...fadeUp(1.0)} className="mt-4 text-slate-500 max-w-sm mx-auto leading-relaxed">
                                            {firstName ? `Thanks, ${firstName}! ` : 'Thanks! '}
                                            {callback
                                                ? `We’ll call you on +91 ${normalizeIndianPhone(form.phone)}${callTime ? ` in the ${callTime.split(' ')[0].toLowerCase()}` : ''} — usually within 2 hours.`
                                                : 'A trip specialist will get back to you within 2 hours.'}
                                        </motion.p>
                                        <motion.div {...fadeUp(1.15)} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                            <a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shine inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold bg-[#1FAF55] text-white hover:bg-[#1a9a4b] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                                            >
                                                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Chat on WhatsApp
                                            </a>
                                            <Button type="button" variant="outline" size="sm" onClick={reset} className="py-3.5">
                                                <RotateCcw className="w-4 h-4" aria-hidden="true" /> Send another
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={onSubmit}
                                        noValidate
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                                            <div>
                                                <h2 className="font-serif font-light text-3xl text-ink">
                                                    {callback ? 'Request a callback' : 'Send us a message'}
                                                </h2>
                                                <p className="mt-2 text-sm text-slate-500">
                                                    {callback ? 'Leave your number — we’ll ring you back.' : 'We usually reply within 2 hours.'}
                                                </p>
                                            </div>
                                            {/* Callback toggle */}
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={callback}
                                                onClick={toggleCallback}
                                                className="shrink-0 self-start inline-flex items-center gap-3 rounded-full border border-ink/10 bg-sand/60 pl-3 pr-1.5 py-1.5 text-sm text-ink hover:border-ink/25 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                                            >
                                                <PhoneCall className="w-4 h-4 text-primary" aria-hidden="true" />
                                                Request a callback instead
                                                <span className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${callback ? 'bg-primary' : 'bg-ink/15'}`}>
                                                    <motion.span
                                                        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
                                                        animate={{ x: callback ? 16 : 0 }}
                                                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                                    />
                                                </span>
                                            </button>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <Field id="name" label="Your name" error={errors.name}>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    value={form.name}
                                                    onChange={(e) => update('name', e.target.value)}
                                                    onBlur={() => onBlur('name')}
                                                    aria-invalid={!!errors.name}
                                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                                    placeholder="e.g. Priya Negi"
                                                    className={inputClass(errors.name)}
                                                />
                                            </Field>
                                            <Field id="phone" label="Mobile number" error={errors.phone}>
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
                                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                                        placeholder="98765 43210"
                                                        className={`${inputClass(errors.phone)} pl-14`}
                                                    />
                                                </div>
                                            </Field>
                                        </div>

                                        <Field id="email" label="Email" optional error={errors.email}>
                                            <input
                                                id="email"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                value={form.email}
                                                onChange={(e) => update('email', e.target.value)}
                                                onBlur={() => onBlur('email')}
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                                placeholder="you@example.com"
                                                className={inputClass(errors.email)}
                                            />
                                        </Field>

                                        <AnimatePresence initial={false}>
                                            {callback && (
                                                <motion.fieldset
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.4, ease: EASE }}
                                                    className="overflow-hidden"
                                                >
                                                    <legend className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Best time to call</legend>
                                                    <div className="flex flex-wrap gap-2">
                                                        {CALL_TIMES.map((t) => (
                                                            <button
                                                                key={t}
                                                                type="button"
                                                                aria-pressed={callTime === t}
                                                                onClick={() => setCallTime((c) => (c === t ? '' : t))}
                                                                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${callTime === t ? 'border-primary bg-primary text-white' : 'border-ink/10 bg-white text-slate-600 hover:border-ink/25'}`}
                                                            >
                                                                {t}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.fieldset>
                                            )}
                                        </AnimatePresence>

                                        <Field
                                            id="message"
                                            label={callback ? 'Anything we should know?' : 'Message'}
                                            optional={callback}
                                            error={errors.message}
                                            hint={!callback ? 'Dates, group size and the kind of trip you have in mind help us reply faster.' : undefined}
                                        >
                                            <textarea
                                                id="message"
                                                rows={callback ? 3 : 5}
                                                value={form.message}
                                                onChange={(e) => update('message', e.target.value)}
                                                onBlur={() => onBlur('message')}
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                                placeholder={callback ? 'e.g. Interested in a family trip to Chakrata in May' : 'Tell us how we can help…'}
                                                className={`${inputClass(errors.message)} resize-none`}
                                            />
                                        </Field>

                                        <AnimatePresence>
                                            {serverError && (
                                                <motion.div
                                                    role="alert"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                                                        <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                                                        <p>{serverError}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                            <p className="flex items-center gap-2 text-xs text-slate-400">
                                                <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" /> No spam. We never share your details.
                                            </p>
                                            <Button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="w-full sm:w-auto sm:min-w-[200px]">
                                                {status === 'sending' ? (
                                                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending…</>
                                                ) : callback ? (
                                                    <>Request callback <PhoneCall className="w-4 h-4" aria-hidden="true" /></>
                                                ) : (
                                                    <>Send message <Send className="w-4 h-4" aria-hidden="true" /></>
                                                )}
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map + FAQ */}
            <section className="pb-20 md:pb-28">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-premium border border-ink/5 bg-sand-dark min-h-[320px]"
                    >
                        <iframe
                            title={`Map of ${MAP_QUERY}`}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=12&output=embed`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full border-0 grayscale-[35%] contrast-[1.05]"
                        />
                        <div className="absolute left-4 bottom-4 right-4 sm:right-auto rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-premium flex items-center gap-3 pointer-events-none">
                            <span className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-ink">Safar Chaska base camp</p>
                                <p className="text-xs text-slate-500">{ADDRESS}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 flex flex-col">
                        <p className="eyebrow mb-4">Good to know</p>
                        <h2 className="heading-premium text-3xl md:text-4xl">Quick <em>answers</em></h2>
                        <dl className="mt-6 space-y-3 flex-1">
                            {FAQS.map((f, i) => (
                                <motion.div
                                    key={f.q}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                                    className="rounded-2xl bg-white border border-ink/5 p-5"
                                >
                                    <dt className="font-medium text-ink">{f.q}</dt>
                                    <dd className="mt-1.5 text-sm text-slate-500 leading-relaxed">{f.a}</dd>
                                </motion.div>
                            ))}
                        </dl>
                        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-ink text-white p-5">
                            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                <Zap className="w-5 h-5 text-secondary" aria-hidden="true" />
                            </span>
                            <p className="text-sm text-white/75 leading-relaxed">
                                <span className="text-white font-medium">Response time under 2 hours.</span> Every enquiry is handled by a local trip specialist.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
