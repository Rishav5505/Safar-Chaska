import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';

const Lightbox = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
    if (!images || images.length === 0) return null;

    const handlePrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
                    onClick={onClose}
                >
                    {/* Top Controls */}
                    <div className="absolute top-6 left-0 w-full px-6 flex justify-between items-center z-[110]">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-black text-sm">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(images[currentIndex], '_blank');
                                }}
                            >
                                <Maximize2 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-3 bg-primary text-white rounded-full shadow-2xl shadow-primary/40"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Image Container */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative max-w-6xl w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Gallery ${currentIndex}`}
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-3xl select-none"
                        />
                    </motion.div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrevious}
                                className="absolute left-6 top-1/2 -translate-y-1/2 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white backdrop-blur-md z-[110]"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, x: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white backdrop-blur-md z-[110]"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </motion.button>
                        </>
                    )}

                    {/* Thumbnails */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] max-w-[90vw] overflow-x-auto no-scrollbar z-[110]">
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(i);
                                }}
                                className={`w-16 h-16 rounded-2xl overflow-hidden cursor-pointer shrink-0 border-2 transition-all ${currentIndex === i ? 'border-primary scale-110 shadow-lg shadow-primary/40' : 'border-transparent opacity-40 hover:opacity-100'}`}
                            >
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
