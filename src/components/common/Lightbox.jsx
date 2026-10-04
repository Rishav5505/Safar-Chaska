import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const Lightbox = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
    const count = images?.length || 0;

    const prev = useCallback(() => setCurrentIndex((p) => (p === 0 ? count - 1 : p - 1)), [count, setCurrentIndex]);
    const next = useCallback(() => setCurrentIndex((p) => (p === count - 1 ? 0 : p + 1)), [count, setCurrentIndex]);

    // Keyboard navigation + scroll lock while open
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, onClose, prev, next]);

    if (!count) return null;

    const stop = (fn) => (e) => { e.stopPropagation(); fn(); };
    const iconBtn = "w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center transition-all duration-500 ease-premium hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[110] flex flex-col bg-ink/[0.97] backdrop-blur-xl"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery"
                >
                    {/* Top bar */}
                    <div className="relative z-10 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
                        <p className="text-white/60 text-sm tracking-wide">
                            <span className="font-serif italic text-secondary-light text-xl mr-1">{String(currentIndex + 1).padStart(2, '0')}</span>
                            / {String(count).padStart(2, '0')}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Open full size in new tab"
                                className={iconBtn}
                                onClick={stop(() => window.open(images[currentIndex], '_blank'))}
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                            <button type="button" autoFocus aria-label="Close gallery" onClick={stop(onClose)} className={iconBtn}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1} of ${count}`}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease }}
                                drag={count > 1 ? 'x' : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, { offset, velocity }) => {
                                    if (offset.x < -60 || velocity.x < -400) next();
                                    else if (offset.x > 60 || velocity.x > 400) prev();
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-full max-h-full object-contain rounded-2xl select-none cursor-grab active:cursor-grabbing touch-pan-y"
                                draggable={false}
                            />
                        </AnimatePresence>

                        {count > 1 && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={stop(prev)}
                                    className={`hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 !w-12 !h-12 ${iconBtn}`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={stop(next)}
                                    className={`hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 !w-12 !h-12 ${iconBtn}`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="relative z-10 py-5 sm:py-6 flex justify-center">
                        <div className="flex gap-2 px-4 max-w-full overflow-x-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
                            {images.map((img, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    aria-label={`Show image ${i + 1}`}
                                    aria-current={currentIndex === i}
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${currentIndex === i ? 'ring-2 ring-secondary opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                >
                                    <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
