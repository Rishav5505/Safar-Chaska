import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Wind, Zap, Moon, Compass, Map } from 'lucide-react';

const WeatherWidget = ({ location = "Chakrata" }) => {
    const [weather, setWeather] = useState({
        temp: '--°',
        condition: 'Fetching...',
        icon: Sun,
        humidity: '--',
        wind: '--',
        vibe: 'Analyzing Vibe...',
        color: 'from-blue-500 to-indigo-600'
    });

    const getVibeStatus = (temp, condition) => {
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour <= 5;

        if (isNight && condition.toLowerCase().includes('clear')) {
            return {
                text: "Ideal for Stargazing",
                activity: "Head to Chilmiri Neck for the clearest Milky Way views.",
                color: "from-slate-900 to-violet-950",
                icon: Moon
            };
        }
        if (temp < 10) {
            return {
                text: "Chilly - Perfect for Bonfire",
                activity: "Grab some hot tea and sit by the wood-fire at our camp.",
                color: "from-blue-600 to-cyan-500",
                icon: Snowflake
            };
        }
        if (condition.toLowerCase().includes('rain')) {
            return {
                text: "Cozy Monsoon Vibes",
                activity: "Perfect time for a forest drive or indoor photography.",
                color: "from-indigo-600 to-blue-800",
                icon: CloudRain
            };
        }
        if (temp > 18 && condition.toLowerCase().includes('clear')) {
            return {
                text: "Perfect for Trekking",
                activity: "Tiger Falls trek is highly recommended today.",
                color: "from-orange-500 to-red-500",
                icon: Sun
            };
        }
        return {
            text: "Pure Mountain Air",
            activity: "Explore the local Chakrata market and Deodar trails.",
            color: "from-teal-500 to-emerald-600",
            icon: Compass
        };
    };

    useEffect(() => {
        // Simulate real data fetching with realistic values for Chakrata
        const timer = setTimeout(() => {
            const mockData = {
                temp: 14,
                condition: 'Mostly Clear',
                humidity: '42%',
                wind: '8 km/h'
            };

            const vibe = getVibeStatus(mockData.temp, mockData.condition);

            setWeather({
                temp: `${mockData.temp}°C`,
                condition: mockData.condition,
                icon: Sun,
                humidity: mockData.humidity,
                wind: mockData.wind,
                vibe: vibe.text,
                activity: vibe.activity,
                vibeIcon: vibe.icon,
                color: vibe.color
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative group overflow-hidden bg-gradient-to-br ${weather.color} p-[1px] rounded-[3rem] shadow-2xl shadow-indigo-500/20`}
        >
            <div className="bg-slate-950/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.9rem] flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10">
                {/* Real-time Status */}
                <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 bg-white/10 rounded-full blur-2xl absolute inset-0"
                        />
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 relative z-10">
                            {weather.vibeIcon ? <weather.vibeIcon className="w-10 h-10 text-white" /> : <Sun className="w-10 h-10 text-white" />}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full border-4 border-slate-950 animate-pulse" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Live Status • {location}</p>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">{weather.temp}</h3>
                        <p className="text-lg font-bold text-white/90">{weather.condition}</p>
                    </div>
                </div>

                {/* Vibe Indicator */}
                <div className="flex-1 w-full text-center md:text-left md:px-12 md:border-x border-white/10">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-3">Current Vibe</p>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={weather.vibe}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-2"
                        >
                            <span className="text-2xl md:text-3xl font-black text-white">
                                {weather.vibe}
                            </span>
                            <p className="text-sm font-medium text-white/60 max-w-xs mx-auto md:mx-0">
                                <Zap className="w-3 h-3 inline mr-1 text-secondary" /> {weather.activity}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Secondary Stats */}
                <div className="flex gap-10 w-full md:w-auto justify-center md:justify-end">
                    <div className="text-center">
                        <Thermometer className="w-6 h-6 text-white/40 mx-auto mb-3" />
                        <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">Humidity</p>
                        <p className="font-black text-white text-lg">{weather.humidity}</p>
                    </div>
                    <div className="text-center">
                        <Wind className="w-6 h-6 text-white/40 mx-auto mb-3" />
                        <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">Wind Speed</p>
                        <p className="font-black text-white text-lg">{weather.wind}</p>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
    );
};

export default WeatherWidget;
