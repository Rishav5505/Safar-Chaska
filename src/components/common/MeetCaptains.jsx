import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Star, Award, Compass } from 'lucide-react';
import Reveal from './Reveal';

const captains = [
    {
        name: "Jaspal Rana",
        role: "Founder & Captain",
        exp: "Founder",
        img: "/cap-jaspal.jpg",
        specialty: "High Altitude Leadership",
        insta: "#"
    },
    {
        name: "Rishav",
        role: "Captain",
        exp: "8+ Years",
        img: "/cap-rishav.jpg",
        specialty: "Expedition Planning",
        insta: "#"
    },
    {
        name: "Vinay Badnoriya",
        role: "Expert Trek Leader",
        exp: "6+ Years",
        img: "/cap-vinay.png",
        specialty: "Mountain Safety Specialist",
        insta: "#"
    }
];

const MeetCaptains = () => {
    return (
        <section className="py-8 md:py-24 bg-slate-900 text-white">
            <div className="container-custom">
                <div className="text-center mb-10 md:mb-16">
                    <Reveal center>
                        <h2 className="text-4xl font-bold text-white tracking-tight">Meet Your Captains</h2>
                    </Reveal>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Led by certified mountain professionals who know these trails by heart.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                    {captains.map((cap, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-primary/50 transition-colors"
                        >
                            <div className="relative h-[380px] overflow-hidden">
                                <img src={cap.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={cap.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-0 right-0 px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (i * 0.2) + 0.5 }}
                                        className="flex items-center justify-center gap-2 text-secondary mb-2"
                                    >
                                        <Award className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cap.role}</span>
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (i * 0.2) + 0.6 }}
                                        className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl uppercase tracking-tight leading-none"
                                    >
                                        {cap.name}
                                    </motion.h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Experience</div>
                                    <div className="text-sm font-bold text-primary">{cap.exp}</div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-sm mb-8">
                                    <Compass className="w-4 h-4 text-primary" />
                                    <span>{cap.specialty}</span>
                                </div>
                                <a href={cap.insta} className="flex items-center justify-center w-full py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white hover:text-slate-900 transition-all font-bold text-sm gap-2">
                                    <Instagram className="w-4 h-4" /> Follow Feed
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MeetCaptains;
