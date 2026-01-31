import React, { useState, useEffect } from 'react';
import {
    Settings, User, Bell, Shield, Lock, Megaphone,
    Gift, Timer, Zap, Plus, X, Laptop, Smartphone,
    CheckCircle2, ArrowLeft, Send, Sparkles, Trash2, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [selectedCampaignType, setSelectedCampaignType] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (activeTab === 'campaigns') {
            fetchCampaigns();
        }
    }, [activeTab]);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/campaigns');
            setCampaigns(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCampaignSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Add campaign type
        data.type = selectedCampaignType;

        try {
            await API.post('/campaigns', data);
            setShowCampaignModal(false);
            setSelectedCampaignType(null);
            fetchCampaigns();
        } catch (error) {
            alert('Failed to deploy campaign');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCampaign = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await API.delete(`/campaigns/${id}`);
                fetchCampaigns();
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const renderCampaignForm = () => {
        switch (selectedCampaignType) {
            case 'Coupons':
                return (
                    <form onSubmit={handleCampaignSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                            <input name="title" required type="text" placeholder="e.g. Summer Special" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coupon Code</label>
                                <input name="code" required type="text" placeholder="e.g. SUMMER20" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount %</label>
                                <input name="discount" required type="number" placeholder="15" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                            </div>
                        </div>
                        <button disabled={submitting} type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Create Coupon</>}
                        </button>
                    </form>
                );
            case 'Flash':
                return (
                    <form onSubmit={handleCampaignSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                            <input name="title" required type="text" placeholder="e.g. Midnight Madness" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Starts At</label>
                                <input name="startDate" required type="datetime-local" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ends At</label>
                                <input name="endDate" required type="datetime-local" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                            </div>
                        </div>
                        <button disabled={submitting} type="submit" className="w-full bg-amber-500 text-white py-4 rounded-xl font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4" /> Launch Flash Sale</>}
                        </button>
                    </form>
                );
            case 'Banners':
                return (
                    <form onSubmit={handleCampaignSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Banner Title</label>
                            <input name="title" required type="text" placeholder="e.g. Hero Banner Winter" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Banner Image URL</label>
                            <input name="imageUrl" required type="text" placeholder="https://unsplash.com/..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Link</label>
                            <input name="targetLink" required type="text" placeholder="/packages" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <button disabled={submitting} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Laptop className="w-4 h-4" /> Update Site Banners</>}
                        </button>
                    </form>
                );
            case 'Trust':
                return (
                    <form onSubmit={handleCampaignSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trust Message Title</label>
                            <input name="title" required type="text" placeholder="e.g. Live Views" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Simulation Multiplier</label>
                            <input name="multiplier" required type="number" placeholder="2.5" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold text-slate-800" />
                        </div>
                        <button disabled={submitting} type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Enable Trust Engine</>}
                        </button>
                    </form>
                );
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button onClick={() => setSelectedCampaignType('Coupons')} className="p-8 rounded-[2.2rem] bg-slate-50 border-2 border-transparent hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-left group">
                            <Gift className="w-8 h-8 text-indigo-500 mb-4" />
                            <h4 className="font-black text-slate-900 mb-1">Promo Coupons</h4>
                            <p className="text-xs text-slate-500 font-medium">Create discount codes for specific packages.</p>
                        </button>
                        <button onClick={() => setSelectedCampaignType('Flash')} className="p-8 rounded-[2.2rem] bg-slate-50 border-2 border-transparent hover:border-amber-500 hover:bg-amber-50/30 transition-all text-left group">
                            <Zap className="w-8 h-8 text-amber-500 mb-4" />
                            <h4 className="font-black text-slate-900 mb-1">Flash Sales</h4>
                            <p className="text-xs text-slate-500 font-medium">Deploy limited-time urgent offers.</p>
                        </button>
                        <button onClick={() => setSelectedCampaignType('Banners')} className="p-8 rounded-[2.2rem] bg-slate-50 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all text-left group">
                            <Laptop className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-black text-slate-900 mb-1">Banner Ads</h4>
                            <p className="text-xs text-slate-500 font-medium">Manage homepage & package hero banners.</p>
                        </button>
                        <button onClick={() => setSelectedCampaignType('Trust')} className="p-8 rounded-[2.2rem] bg-slate-50 border-2 border-transparent hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left group">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
                            <h4 className="font-black text-slate-900 mb-1">Trust Score</h4>
                            <p className="text-xs text-slate-500 font-medium">Display live traveler count notifications.</p>
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Management Suite</h1>
                <p className="text-slate-500 mt-1">Control your business preferences, security, and active campaigns.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-3 space-y-3">
                    <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${activeTab === 'profile' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}>
                        <User className="w-5 h-5" /> Account Details
                    </button>
                    <button onClick={() => setActiveTab('campaigns')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${activeTab === 'campaigns' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}>
                        <Megaphone className="w-5 h-5" /> Campaign Hub
                    </button>
                </div>

                <div className="md:col-span-9">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-black text-slate-900 mb-10">System Identity</h3>
                                <div className="space-y-6 max-w-xl">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Display Name</label>
                                        <input type="text" readOnly value="Safar Chaska Master" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-800" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Email Node</label>
                                        <input type="email" readOnly value="admin@safarchaska.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-800" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'campaigns' && (
                            <motion.div key="campaigns" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
                                    <h3 className="text-3xl font-black mb-8 relative z-10">Active Promotions</h3>
                                    <button onClick={() => { setSelectedCampaignType(null); setShowCampaignModal(true); }} className="relative z-10 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black text-sm transition-all flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Deploy Campaign
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {loading ? (
                                        <div className="col-span-full py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-primary opacity-20" /></div>
                                    ) : campaigns.length === 0 ? (
                                        <div className="col-span-full py-20 text-center text-slate-400 italic">No campaigns found.</div>
                                    ) : campaigns.map(campaign => (
                                        <div key={campaign._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                                                        {campaign.type === 'Coupons' ? <Gift className="w-5 h-5" /> : campaign.type === 'Flash' ? <Zap className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900">{campaign.title}</h4>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{campaign.type}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDeleteCampaign(campaign._id)} className="p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {campaign.code && <code className="bg-slate-50 px-3 py-1 rounded-lg text-primary font-black mr-4">{campaign.code}</code>}
                                            {campaign.discount && <span className="text-emerald-600 font-bold">{campaign.discount}% OFF</span>}
                                            <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${campaign.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                    {campaign.isActive ? 'LIVE' : 'INACTIVE'}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-300">{new Date(campaign.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showCampaignModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !submitting && setShowCampaignModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <button onClick={() => !submitting && setShowCampaignModal(false)} className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full"><X className="w-6 h-6 text-slate-400" /></button>
                            {selectedCampaignType && <button onClick={() => setSelectedCampaignType(null)} className="flex items-center gap-2 text-slate-400 mb-8 font-black text-xs uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Categories</button>}
                            <header className="mb-10 text-center">
                                <h3 className="text-3xl font-black text-slate-900">{selectedCampaignType ? `Configure ${selectedCampaignType}` : 'Deploy Intelligence'}</h3>
                            </header>
                            {renderCampaignForm()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminSettings;
