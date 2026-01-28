import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Users, Package, PhoneCall, ChevronLeft, ArrowRight, MapPin, CreditCard, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const Booking = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: '',
        package: '',
        date: '',
        guests: 1,
        fullName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    const destinations = ['Chakrata', 'Mussoorie', 'Kanatal', 'Rishikesh'];
    const packages = ['Budget Friendly', 'Premium Experience', 'Luxury Stay'];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Booking Inquiry for ${formData.destination} (${formData.package}). Name: ${formData.fullName}, Phone: ${formData.phone}, Guests: ${formData.guests}`;
        window.open(`https://wa.me/918171379469?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Simple Header */}
            <div className="bg-slate-900 py-16 pt-32 text-center text-white">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Plan Your Trip</h1>
                <p className="text-slate-400">Simple 3-step process to secure your mountain adventure.</p>
            </div>

            <main className="container-custom py-16 -mt-10 mb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Stepper Header */}
                    <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-slate-100 flex justify-between items-center overflow-x-auto gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-3 shrink-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {s}
                                </div>
                                <span className={`text-sm font-bold uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {s === 1 ? 'Plan' : s === 2 ? 'Details' : 'Confirm'}
                                </span>
                                {s < 3 && <div className="w-10 h-px bg-slate-200 ml-2"></div>}
                            </div>
                        ))}
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Select Your Destination</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                                            <select name="destination" value={formData.destination} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium">
                                                <option value="">Select Location</option>
                                                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Package Type</label>
                                            <select name="package" value={formData.package} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium">
                                                <option value="">Select Package</option>
                                                {packages.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium text-sm" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Total Guests</label>
                                            <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <Button onClick={nextStep} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue <ArrowRight className="w-5 h-5" /></Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Personal Information</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="John Doe" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email ID</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="+91 XXXX XXXX" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Special Requests</label>
                                            <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium resize-none" placeholder="Dietary needs, extra bed, etc."></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-6">
                                        <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                        <Button onClick={nextStep} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue <ArrowRight className="w-5 h-5" /></Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Review & Confirm</h2>
                                    <div className="bg-slate-50 rounded-2xl p-8 space-y-4">
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Trip To</span>
                                            <span className="text-slate-900 font-bold">{formData.destination}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Travel Date</span>
                                            <span className="text-slate-900 font-bold">{formData.date || 'TBD'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Party Size</span>
                                            <span className="text-slate-900 font-bold">{formData.guests} Guest(s)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 font-medium">Contact</span>
                                            <span className="text-slate-900 font-bold">{formData.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-6">
                                        <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                        <Button type="submit" className="px-12 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-primary/20">Send Inquiry <Send className="w-5 h-5" /></Button>
                                    </div>
                                    <p className="text-center text-xs text-slate-400">Total payable will be shared by our representative via WhatsApp.</p>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Booking;
