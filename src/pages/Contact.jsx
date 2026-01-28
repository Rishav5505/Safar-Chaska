import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Reveal from '../components/common/Reveal';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-slate-900 text-center text-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl text-white">
                            Contact Us
                        </h1>
                    </Reveal>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        Have questions? We're just a message away.
                    </motion.p>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
                </div>
            </section>

            <section className="py-8 md:py-20 -mt-16 relative z-30">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info */}
                        <div className="lg:col-span-4 space-y-6">
                            {[
                                { icon: Phone, title: "Call Us", details: ["+91 81713 79469"], color: "bg-blue-50 text-blue-600" },
                                { icon: Mail, title: "Email Us", details: ["hello@safarchaska.com"], color: "bg-primary/10 text-primary" },
                                { icon: MapPin, title: "Visit Us", details: ["Chakrata, Uttarakhand, India"], color: "bg-amber-50 text-amber-600" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-6">
                                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                        {item.details.map((detail, idx) => (
                                            <p key={idx} className="text-slate-500 font-medium">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-primary font-medium" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email ID</label>
                                            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-primary font-medium" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                        <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-6 text-slate-900 focus:outline-none focus:border-primary font-medium resize-none" placeholder="Tell us how we can help..."></textarea>
                                    </div>
                                    <Button className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                                        Send Message <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social */}
            <section className="py-8 md:py-24 bg-white border-t border-slate-50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Connect With Us</h2>
                    <div className="flex justify-center gap-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-400">
                                <Icon className="w-8 h-8" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
