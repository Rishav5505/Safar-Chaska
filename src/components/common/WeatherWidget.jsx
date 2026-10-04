import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Snowflake, Droplets, Wind, Moon, Compass, Sparkles } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const getVibeStatus = (temp, condition) => {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 5;
    const c = condition.toLowerCase();

    if (isNight && c.includes('clear')) {
        return { text: "Ideal for stargazing", activity: "Head to Chilmiri Neck for the clearest Milky Way views.", icon: Moon };
    }
    if (temp < 10) {
        return { text: "Chilly — perfect for a bonfire", activity: "Grab some hot tea and sit by the wood-fire at our camp.", icon: Snowflake };
    }
    if (c.includes('rain')) {
        return { text: "Cozy monsoon vibes", activity: "Perfect time for a forest drive or indoor photography.", icon: CloudRain };
    }
    if (temp > 18 && c.includes('clear')) {
        return { text: "Perfect for trekking", activity: "Tiger Falls trek is highly recommended today.", icon: Sun };
    }
    return { text: "Pure mountain air", activity: "Explore the local Chakrata market and Deodar trails.", icon: Compass };
};

const WeatherWidget = ({ location = "Chakrata" }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Simulated fetch with realistic values for Chakrata
        const timer = setTimeout(() => {
            const mockData = { temp: 14, condition: 'Mostly Clear', humidity: '42%', wind: '8 km/h' };
            const vibe = getVibeStatus(mockData.temp, mockData.condition);
            setWeather({
                temp: mockData.temp,
                condition: mockData.condition,
                humidity: mockData.humidity,
                wind: mockData.wind,
                vibe: vibe.text,
                activity: vibe.activity,
                vibeIcon: vibe.icon,
            });
        }, 1200);
        return () => clearTimeout(timer);
    }, [location]);

    const VibeIcon = weather?.vibeIcon || Sun;
    const loading = !weather;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="grain relative overflow-hidden bg-ink rounded-3xl shadow-premium text-white"
            aria-busy={loading}
        >
            <div aria-hidden="true" className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-[100px]" />
            <div aria-hidden="true" className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />

            <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-12">
                {/* Now */}
                <div className="lg:col-span-4 p-8 md:p-10 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/10">
                    <span className="w-16 h-16 rounded-full border border-secondary/30 text-secondary flex items-center justify-center shrink-0">
                        <VibeIcon className="w-6 h-6" />
                    </span>
                    <div>
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                            <span className="relative flex w-2 h-2">
                                <span className="absolute inline-flex w-full h-full rounded-full bg-primary-light opacity-60 animate-ping" />
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary-light" />
                            </span>
                            Live · {location}
                        </p>
                        {loading ? (
                            <div className="space-y-2" aria-label="Loading weather">
                                <div className="h-12 w-28 rounded-lg bg-white/10 animate-pulse" />
                                <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                                <p className="font-serif font-light text-6xl leading-none">{weather.temp}<span className="text-secondary-light">°</span><span className="text-2xl text-white/50 ml-1">C</span></p>
                                <p className="mt-2 text-white/70">{weather.condition}</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Vibe */}
                <div className="lg:col-span-5 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">Today&rsquo;s vibe</p>
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div key="l" exit={{ opacity: 0 }} className="space-y-2">
                                <div className="h-8 w-3/4 rounded-lg bg-white/10 animate-pulse" />
                                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                            </motion.div>
                        ) : (
                            <motion.div key="v" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
                                <p className="font-serif font-light text-3xl md:text-4xl leading-tight">{weather.vibe}</p>
                                <p className="mt-3 text-sm text-white/60 leading-relaxed flex gap-2">
                                    <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" /> {weather.activity}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Stats */}
                <div className="lg:col-span-3 grid grid-cols-2">
                    {[
                        { icon: Droplets, label: 'Humidity', value: weather?.humidity },
                        { icon: Wind, label: 'Wind', value: weather?.wind },
                    ].map((s, i) => (
                        <div key={s.label} className={`p-8 md:p-10 flex flex-col justify-center ${i === 0 ? 'border-r border-white/10' : ''}`}>
                            <s.icon className="w-4 h-4 text-secondary mb-4" />
                            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1">{s.label}</p>
                            <p className="font-serif text-2xl">{s.value || '—'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
