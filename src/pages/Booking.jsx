import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Users, Package, PhoneCall, ChevronLeft, ArrowRight, MapPin, CreditCard, Send, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import API from '../utils/api';

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        packageId: '',
        travelDate: '',
        guests: 1,
        userName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages", error);
            }
        };
        fetchPackages();
    }, []);

    const nextStep = (e) => {
        if (e) e.preventDefault();
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/bookings', formData);

            // Still opening WhatsApp for better conversion as requested before, but now data is saved in DB too
            const selectedPackage = packages.find(p => p._id === formData.packageId);
            const message = `Booking Inquiry for ${selectedPackage?.title}. Name: ${formData.userName}, Phone: ${formData.phone}, Guests: ${formData.guests}`;
            window.open(`https://wa.me/918171379469?text=${encodeURIComponent(message)}`, '_blank');

            alert('Booking request sent successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to process booking');
        } finally {
            setLoading(false);
        }
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
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Select Your Experience</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Choose Package</label>
                                            <select name="packageId" value={formData.packageId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" required>
                                                <option value="">Select a journey</option>
                                                {packages.map(p => <option key={p._id} value={p._id}>{p.title} - ₹{p.price}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                                            <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium text-sm" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Total Guests</label>
                                            <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" required />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <Button onClick={nextStep} disabled={!formData.packageId || !formData.travelDate} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue <ArrowRight className="w-5 h-5" /></Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Personal Information</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="Your Name" required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email ID</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="email@example.com" required />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium" placeholder="+91 XXXX XXXX" required />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Special Requests</label>
                                            <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary font-medium resize-none" placeholder="Any special requirements?"></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-6">
                                        <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                        <Button onClick={nextStep} disabled={!formData.userName || !formData.email || !formData.phone} className="px-10 py-4 rounded-xl font-bold flex items-center gap-3">Continue <ArrowRight className="w-5 h-5" /></Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">Review & Confirm</h2>
                                    <div className="bg-slate-50 rounded-2xl p-8 space-y-4 text-left">
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Selected Journey</span>
                                            <span className="text-slate-900 font-bold">{packages.find(p => p._id === formData.packageId)?.title}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Travel Date</span>
                                            <span className="text-slate-900 font-bold">{formData.travelDate || 'TBD'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-200 pb-4">
                                            <span className="text-slate-400 font-medium">Party Size</span>
                                            <span className="text-slate-900 font-bold">{formData.guests} Guest(s)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 font-medium">Contact Details</span>
                                            <span className="text-slate-900 font-bold">{formData.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-6">
                                        <Button variant="outline" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold flex items-center gap-3">Back</Button>
                                        <Button type="submit" disabled={loading} className="px-12 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-primary/20 bg-primary text-white">
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Confirm & Book</>}
                                        </Button>
                                    </div>
                                    <p className="text-center text-xs text-slate-400">Your details will be saved and our team will contact you on WhatsApp.</p>
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
