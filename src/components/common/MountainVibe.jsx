import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sunrise, Sunset, Moon, Stars, Sparkles } from 'lucide-react';

const MountainVibe = () => {
    const [vibe, setVibe] = useState({
        label: "Stargazing",
        icon: Stars,
        color: "from-indigo-600 to-slate-900",
        desc: "Billions of stars are visible tonight."
    });

    useEffect(() => {
        const updateVibe = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 8) {
                setVibe({ label: "Sunrise", icon: Sunrise, color: "from-orange-400 to-rose-500", desc: "First light hitting the peaks." });
            } else if (hour >= 8 && hour < 16) {
                setVibe({ label: "Alpine Sun", icon: Sun, color: "from-sky-400 to-blue-500", desc: "Crystal clear mountain views." });
            } else if (hour >= 16 && hour < 19) {
                setVibe({ label: "Golden Hour", icon: Sunset, color: "from-amber-400 to-orange-600", desc: "The mountains are turning gold." });
            } else {
                setVibe({ label: "Stargazing", icon: Stars, color: "from-indigo-900 to-slate-900", desc: "Milky way is visible above." });
            }
        };

        updateVibe();
        const interval = setInterval(updateVibe, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-4 bg-gradient-to-r ${vibe.color} p-1 pr-6 rounded-full shadow-2xl border border-white/20`}
        >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <vibe.icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Current Vibe</span>
                    <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                </div>
                <p className="text-sm font-black text-white leading-none">{vibe.label}</p>
            </div>
        </motion.div>
    );
};

export default MountainVibe;
