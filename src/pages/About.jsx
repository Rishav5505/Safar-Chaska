import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star, Globe, Compass, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Reveal from '../components/common/Reveal';
import Separator from '../components/common/Separator';

const About = () => {
    const stats = [
        { label: "Happy Travelers", value: "2,500+", icon: Users },
        { label: "Destinations", value: "15+", icon: Globe },
        { label: "Guest Rating", value: "4.9/5", icon: Star },
        { label: "Safety Score", value: "100%", icon: Shield },
    ];

    return (
        <div className="bg-white min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')` }}
                >
                    <div className="absolute inset-0 bg-slate-900/60"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 pt-20">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl">
                            Our Story
                        </h1>
                    </Reveal>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1.5 w-32 bg-secondary mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20">
                    <Separator variant="horizon" color="fill-white" height="h-16 md:h-32" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The Safar Chaska Vision</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Authentic Adventures <br />Guided by Passion.</h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Welcome to <span className="text-slate-900 font-bold">SafarChaska</span>, where we believe travel is more than just checking off destinations—it's about the connection between humans and the raw beauty of our planet.
                                </p>
                                <p>
                                    Founded in the trails of the Himalayas, we evolved from a group of trekking enthusiasts into a professional travel boutique dedicated to creating seamless, safe, and soulful mountain experiences.
                                </p>
                                <div className="border-l-4 border-secondary pl-6 py-2 bg-slate-50 italic font-medium text-slate-800">
                                    "We bridge the gap between human curiosity and the whispering silence of the peaks."
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200"
                                alt="Mountain Expedition"
                                className="rounded-3xl shadow-xl w-full aspect-[4/5] object-cover"
                            />
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-lg hidden xl:block border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">100%</p>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pure Satisfaction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl text-center border border-slate-100 shadow-sm">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <stat.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-32 bg-white text-center">
                <div className="container-custom max-w-4xl mx-auto">
                    <Compass className="w-12 h-12 text-secondary/40 mx-auto mb-10" />
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 italic">
                        "Tradition in hospitality, <br className="hidden md:block" /> innovation in exploration."
                    </h2>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">The SafarChaska DNA</p>
                </div>
            </section>

            <CTA />
            <Footer />
        </div>
    );
};

export default About;
