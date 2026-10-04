import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

// Accessible modal confirmation (replaces window.confirm). Escape / backdrop click cancels.
const ConfirmDialog = ({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel, busy = false }) => {
    const cancelRef = useRef(null);

    useEffect(() => {
        if (open) cancelRef.current?.focus();
    }, [open]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => { if (e.key === 'Escape' && !busy) onCancel(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, busy, onCancel]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => !busy && onCancel()} />
                    <motion.div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="confirm-title"
                        aria-describedby="confirm-message"
                        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
                        className="relative bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-md p-6 md:p-8"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-5">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 id="confirm-title" className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
                        <p id="confirm-message" className="text-slate-500 mt-2 text-sm leading-relaxed">{message}</p>
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
                            <button
                                ref={cancelRef}
                                type="button"
                                onClick={onCancel}
                                disabled={busy}
                                className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={busy}
                                className="px-6 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-60 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 transition-all"
                            >
                                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                                {confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDialog;
