import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';


// Labelled input wrapper with an animated inline error message
const Field = ({ id, label, hint, error, optional, children, className = '' }) => (
    <div className={className}>
        <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor={id} className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                {label}
            </label>
            {optional && <span className="text-[11px] text-slate-400">Optional</span>}
        </div>
        {children}
        <AnimatePresence initial={false} mode="wait">
            {error ? (
                <motion.p
                    key="err"
                    id={`${id}-error`}
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 flex items-center gap-1.5 text-xs text-rose-600"
                >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {error}
                </motion.p>
            ) : hint ? (
                <motion.p key="hint" id={`${id}-hint`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-slate-400">
                    {hint}
                </motion.p>
            ) : null}
        </AnimatePresence>
    </div>
);

export default Field;
