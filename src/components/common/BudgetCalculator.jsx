import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Calendar, Wallet, CheckCircle2 } from 'lucide-react';
import Button from './Button';

const BudgetCalculator = ({ basePrice = 4999 }) => {
    const [travelers, setTravelers] = useState(2);
    const [days, setDays] = useState(3);

    const priceInt = parseInt(basePrice.toString().replace(',', ''));
    const total = (priceInt * travelers) + (travelers * 500 * (days - 1)); // Base + extras per day

    return (
        <section className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-3xl shadow-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                        <Calculator className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-6">Smart Budget <br />Estimator.</h2>
                    <p className="text-xl text-slate-500 font-medium mb-12">Plan your finances before the adventure. No hidden costs, just pure transparency.</p>

                    <div className="space-y-10">
                        {/* Travelers Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Number of Travelers</label>
                                <span className="text-2xl font-black text-primary">{travelers}</span>
                            </div>
                            <input
                                type="range" min="1" max="15" value={travelers}
                                onChange={(e) => setTravelers(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        {/* Days Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Trip Duration (Days)</label>
                                <span className="text-2xl font-black text-primary">{days}</span>
                            </div>
                            <input
                                type="range" min="2" max="10" value={days}
                                onChange={(e) => setDays(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <div className="space-y-8 relative z-10">
                        <div className="flex items-center gap-4 text-primary-light">
                            <Wallet className="w-6 h-6" />
                            <span className="font-black uppercase tracking-widest text-sm">Estimated Total</span>
                        </div>

                        <div>
                            <p className="text-7xl font-black text-white leading-none mb-2">₹{total.toLocaleString()}</p>
                            <p className="text-white/40 font-bold">Inclusive of stay, meals & travel support</p>
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                                <CheckCircle2 className="w-5 h-5 text-secondary" /> Group Discount Applied
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                                <CheckCircle2 className="w-5 h-5 text-secondary" /> Local Support 24/7
                            </div>
                        </div>

                        <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-light text-white font-black text-lg border-none mt-4 transition-all shadow-xl shadow-primary/20">
                            Book This Budget
                        </Button>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
                </div>
            </div>
        </section>
    );
};

export default BudgetCalculator;
