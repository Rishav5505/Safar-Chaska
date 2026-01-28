import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, CloudMoon, Wind } from 'lucide-react';

const AmbientController = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // High quality soft mountain wind & birds ambient sound
    const audioUrl = "https://www.soundjay.com/nature/sounds/wind-blowing-01.mp3";

    const toggleAmbience = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
            audioRef.current.loop = true;
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-28 left-6 z-50">
            <audio ref={audioRef} src={audioUrl} />

            <div className="relative group">
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: 20 }}
                            className="absolute left-full ml-4 whitespace-nowrap bg-slate-900/80 backdrop-blur-xl text-white px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl"
                        >
                            <span className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <motion.span
                                        key={i}
                                        animate={{ height: [4, 12, 4] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-primary rounded-full"
                                    ></motion.span>
                                ))}
                            </span>
                            <span className="text-xs font-black uppercase tracking-widest">Mountain Ambience Active</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleAmbience}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-3xl overflow-hidden relative ${isPlaying ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-100 border'}`}
                >
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="on"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                            >
                                <Wind className="w-7 h-7" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="off"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                            >
                                <VolumeX className="w-7 h-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                </motion.button>
            </div>
        </div>
    );
};

export default AmbientController;
