import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { EASE } from './bookingUtils';

const POLICY = [
    { window: 'More than 7 days before departure', refund: 'Full refund', tone: 'text-primary bg-primary/10' },
    { window: '3 – 7 days before departure', refund: '50% refund', tone: 'text-secondary-dark bg-secondary/15' },
    { window: 'Within 72 hours of departure', refund: 'No refund', tone: 'text-rose-600 bg-rose-50' },
];

const CancellationPolicy = ({ open, onClose }) => {
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="policy-title"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-premium"
                    >
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            aria-label="Close cancellation policy"
                            className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-sand hover:text-ink transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <p className="eyebrow mb-3">Fair & simple</p>
                        <h2 id="policy-title" className="heading-premium text-3xl">Cancellation <em>policy</em></h2>
                        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                            Plans change — we get it. Refunds apply to any advance paid and are processed to the original payment method within 7 working days.
                        </p>
                        <ul className="mt-6 space-y-2.5">
                            {POLICY.map((p) => (
                                <li key={p.window} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/5 bg-sand/50 px-4 py-3.5">
                                    <span className="text-sm text-ink">{p.window}</span>
                                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${p.tone}`}>{p.refund}</span>
                                </li>
                            ))}
                        </ul>
                        <ul className="mt-6 space-y-2 text-sm text-slate-500 leading-relaxed list-disc pl-5">
                            <li>Date changes are free up to 7 days before departure, subject to availability.</li>
                            <li>If we cancel due to weather or road closures, you get a full refund or a free reschedule.</li>
                            <li>Cancellations must be requested by phone, WhatsApp or email with your booking reference.</li>
                        </ul>
                        <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                            <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" /> No payment is taken when you submit a request.
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CancellationPolicy;
