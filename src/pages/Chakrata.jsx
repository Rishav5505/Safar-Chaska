import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ArrowRight, Sun, Star, CheckCircle, XCircle, Plane, Train, Car, Phone, Mail, Shield, Camera, Info, MessageSquare, ChevronDown, Mountain, Heart, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import { chakrataData } from '../data/chakrata';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import Separator from '../components/common/Separator';
import Lightbox from '../components/common/Lightbox';
import { useInView } from 'framer-motion';

const Chakrata = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        guests: '2',
        message: ''
    });

    const [activeDay, setActiveDay] = useState(1);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const itineraryImages = [
        chakrataData.images.hero,
        ...chakrataData.images.others
    ];

    const openLightbox = (imageIndex) => {
        setCurrentImageIndex(imageIndex);
        setIsLightboxOpen(true);
    };

    const itineraryCoordinates = [
        { day: 1, x: 50, y: 50, name: "Chakrata Town" },
        { day: 2, x: 45, y: 35, name: "Tiger Falls" },
        { day: 3, x: 30, y: 15, name: "Deoban & Kanasar" },
        { day: 4, x: 70, y: 80, name: "Dehradun (Drop)" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Hi, I want to book Chakrata package for ${formData.guests} guests on ${formData.date}. Name: ${formData.name}, Phone: ${formData.phone}`;
        window.open(`https://wa.me/918171379469?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-40 md:pt-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${chakrataData.images.hero})` }}>
                    <div className="absolute inset-0 bg-slate-900/40"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto md:pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
                    >
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-bold tracking-widest uppercase">{chakrataData.state}, India</span>
                    </motion.div>

                    <Reveal width="100%" delay={0.2} center>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                            Explore {chakrataData.title}
                        </h1>
                    </Reveal>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Escape to the mist-covered mountains where dense forests of Deodar and Oak whisper secrets of the old world.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            onClick={() => document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' })}
                            size="lg"
                            className="w-full sm:w-auto rounded-xl px-10"
                        >
                            Plan Your Trip
                        </Button>
                        <Button
                            onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
                            variant="white"
                            size="lg"
                            className="w-full sm:w-auto rounded-xl px-10 bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                            Book Now
                        </Button>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20">
                    <Separator variant="horizon" color="fill-white" height="h-16 md:h-32" />
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-8 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Altitude", value: "7,000+ ft", icon: Mountain },
                            { label: "Best Season", value: "March - Oct", icon: Sun },
                            { label: "From Delhi", value: "330 km", icon: Car },
                            { label: "Difficulty", value: "Moderate", icon: Zap }
                        ].map((stat, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 text-center">
                                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Package Summary */}
            <section className="py-8 md:py-24 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col lg:flex-row">
                        <div className="lg:w-7/12 p-12 lg:p-16">
                            <span className="text-primary font-bold uppercase text-xs tracking-widest mb-4 block">Inclusive Package</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-10 tracking-tight">Handcrafted Mountain Getaway</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Clock, label: "Duration", value: chakrataData.packageSummary.duration },
                                    { icon: MapPin, label: "Coverage", value: chakrataData.packageSummary.destinations },
                                    { icon: Heart, label: "Meals", value: chakrataData.packageSummary.meals },
                                    { icon: Shield, label: "Stay", value: chakrataData.packageSummary.stay }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                            <p className="text-slate-800 font-bold">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-5/12 bg-slate-900 p-12 lg:p-16 text-white text-center flex flex-col justify-center items-center">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Best Price Guaranteed</p>
                            <h2 className="text-6xl font-bold mb-4">₹{chakrataData.packages[0].price.toLocaleString()}</h2>
                            <p className="text-slate-400 mb-10">Per Person • All Inclusive</p>
                            <Button
                                onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
                                size="lg"
                                className="w-full py-5 rounded-xl font-bold"
                            >
                                Secure My Spot
                            </Button>
                            <p className="mt-6 text-xs font-medium text-slate-500 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> No Hidden Taxes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="py-8 md:py-24 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Your 4-Day Journey</h2>
                    </div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12 space-y-8">
                            {chakrataData.itinerary.map((item, index) => (
                                <div key={item.day} className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10">
                                    <div className="md:w-1/3 h-64 rounded-2xl overflow-hidden cursor-pointer group" onClick={() => openLightbox(index)}>
                                        <img
                                            src={index === 0 ? chakrataData.images.hero : chakrataData.images.others[index % chakrataData.images.others.length]}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt=""
                                        />
                                    </div>
                                    <div className="md:w-2/3 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl">0{item.day}</span>
                                            <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Inclusions */}
            <section className="py-8 md:py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                            <h3 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-3">
                                <CheckCircle className="text-primary" /> What's Included
                            </h3>
                            <ul className="space-y-4">
                                {chakrataData.inclusions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 opacity-60">
                            <h3 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-3">
                                <XCircle className="text-slate-400" /> Not Included
                            </h3>
                            <ul className="space-y-4">
                                {chakrataData.exclusions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                                        <span className="text-slate-700 font-medium line-through decoration-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking */}
            <section id="booking" className="py-8 md:py-24 bg-slate-900 text-white relative">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Ready for the Adventure?</h2>
                            <p className="text-slate-400 mb-10 leading-relaxed text-lg">Leave your details and our trip captains will reach out to you within 30 minutes to finalize.</p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Call or WhatsApp</p>
                                        <p className="text-lg font-bold">{chakrataData.contact.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email Support</p>
                                        <p className="text-lg font-bold">ops@safarchaska.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-10 text-slate-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-primary font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-primary font-medium"
                                        placeholder="+91 XXXX XXXX"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-primary font-medium text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Guests</label>
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-primary font-medium"
                                        >
                                            {[1, 2, 3, 4, 5, 6, '7+'].map(n => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full py-4 rounded-xl font-bold text-lg">Send Request</Button>
                                <div className="text-center text-slate-400 text-xs mt-4">
                                    Fast response via WhatsApp message.
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
            <Footer />

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={itineraryImages}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
            />
        </div>
    );
};

export default Chakrata;
