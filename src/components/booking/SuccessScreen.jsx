import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneCall, Wallet, Backpack, MessageCircle, ArrowRight, Copy, Check, CalendarDays, Users, MapPin } from 'lucide-react';
import AnimatedCheck from './AnimatedCheck';
import Confetti from './Confetti';
import { formatINR, onImageError } from '../../utils/format';
import { EASE, WHATSAPP_NUMBER, formatDate } from './bookingUtils';

const NEXT_STEPS = [
    { icon: PhoneCall, title: 'We call you within 2 hrs', text: 'A trip specialist confirms availability, pickup point and answers your questions.' },
    { icon: Wallet, title: 'Confirm & pay advance', text: 'Lock your dates with a small advance via UPI, card or bank transfer.' },
    { icon: Backpack, title: 'Pack your bags', text: 'Get your detailed itinerary, packing list and guide contact on WhatsApp.' },
];

const BTN = 'shine inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold tracking-wide transition-all duration-500 ease-premium hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25';

const fade = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
});

const SuccessScreen = ({ booking, pkg, form, total }) => {
    const [copied, setCopied] = useState(false);
    const ref = booking?.bookingRef;
    const firstName = (form.userName || '').trim().split(' ')[0];

    const waText = [
        `Hi Safar Chaska! I just requested a booking${ref ? ` (Ref: ${ref})` : ''}.`,
        `Trip: ${pkg?.title || ''}`,
        `Date: ${formatDate(form.travelDate, { day: 'numeric', month: 'short', year: 'numeric' })}`,
        `Guests: ${form.guests}`,
        `Name: ${form.userName}`,
    ].join('\n');
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    const copyRef = async () => {
        try {
            await navigator.clipboard.writeText(ref);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable — ignore */
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-live="polite"
            className="relative max-w-3xl mx-auto"
        >
            <div className="relative bg-white rounded-3xl shadow-premium border border-ink/5 px-5 py-10 sm:px-12 sm:py-14 text-center overflow-hidden">
                <Confetti />
                <div className="relative z-10">
                    <AnimatedCheck size={88} />
                    <motion.p {...fade(1.0)} className="eyebrow mt-8 justify-center">Request sent</motion.p>
                    <motion.h1 {...fade(1.1)} className="heading-premium text-4xl sm:text-5xl mt-4">
                        Booking request <em>received</em>
                    </motion.h1>
                    <motion.p {...fade(1.2)} className="mt-4 text-slate-500 max-w-md mx-auto leading-relaxed">
                        {firstName ? `Thank you, ${firstName}. ` : ''}Your mountain escape is on hold — our team will reach out on {form.phone} shortly.
                    </motion.p>

                    {ref && (
                        <motion.div {...fade(1.3)} className="mt-7 inline-flex items-center gap-3 rounded-full border border-dashed border-primary/40 bg-primary/[0.04] pl-5 pr-2 py-2">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Booking ref</span>
                            <span className="font-mono text-base tracking-wider text-ink">{ref}</span>
                            <button
                                type="button"
                                onClick={copyRef}
                                aria-label={copied ? 'Reference copied' : 'Copy booking reference'}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </motion.div>
                    )}

                    {/* Summary */}
                    <motion.div {...fade(1.4)} className="mt-9 text-left rounded-2xl border border-ink/5 bg-sand/60 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                        {pkg?.image && (
                            <img src={pkg.image} alt="" onError={onImageError} className="w-full sm:w-28 h-32 sm:h-20 rounded-xl object-cover" />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="font-serif text-xl font-light text-ink leading-tight">{pkg?.title}</p>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                {pkg?.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />{pkg.location}</span>}
                                <span className="inline-flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />{formatDate(form.travelDate)}</span>
                                <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" aria-hidden="true" />{form.guests} {Number(form.guests) === 1 ? 'guest' : 'guests'}</span>
                            </div>
                        </div>
                        <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-ink/10 pt-3 sm:pt-0 sm:pl-5">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Estimated total</p>
                            <p className="font-serif text-2xl font-light text-ink tabular-nums">{formatINR(total)}</p>
                        </div>
                    </motion.div>

                    {/* What happens next */}
                    <motion.div {...fade(1.5)} className="mt-10 text-left">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-5 text-center">What happens next</p>
                        <div className="relative">
                            <div aria-hidden="true" className="hidden sm:block absolute top-5 left-[16%] right-[16%] h-px bg-ink/10">
                                <motion.div
                                    className="h-full bg-primary origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.4, ease: EASE, delay: 1.8 }}
                                />
                            </div>
                            <ol className="relative grid gap-6 sm:grid-cols-3 sm:gap-4">
                            {NEXT_STEPS.map((s, i) => (
                                <motion.li
                                    key={s.title}
                                    {...fade(1.7 + i * 0.15)}
                                    className="relative flex sm:flex-col sm:items-center sm:text-center gap-4 sm:gap-3"
                                >
                                    <span className={`relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center ring-4 ring-white ${i === 0 ? 'bg-primary text-white' : 'bg-sand-dark text-ink'}`}>
                                        <s.icon className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="font-medium text-ink text-sm">{s.title}</p>
                                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.text}</p>
                                    </div>
                                </motion.li>
                            ))}
                            </ol>
                        </div>
                    </motion.div>

                    <motion.div {...fade(2.0)} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${BTN} bg-[#1FAF55] text-white shadow-[0_10px_30px_-10px_rgba(31,175,85,0.6)] hover:bg-[#1a9a4b]`}
                        >
                            <MessageCircle className="w-5 h-5" aria-hidden="true" /> Continue on WhatsApp
                        </a>
                        <Link to="/packages" className={`${BTN} border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white`}>
                            Explore more trips <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default SuccessScreen;
