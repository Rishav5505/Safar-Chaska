import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
                    {/* Background Accents (Subtle) */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-10"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-10"></div>

                    <div className="relative z-10 p-10 md:p-16 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Limited Slots for February</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready for the Ultimate Escape?
                        </h2>

                        <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 font-medium">
                            Join 500+ adventure seekers who have already booked their Himalayan journey this month.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/booking" className="w-full sm:w-auto">
                                <Button className="w-full h-14 px-10 rounded-xl font-bold flex items-center justify-center gap-2 group">
                                    Secure My Spot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full sm:w-auto">
                                <button className="w-full h-14 px-10 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">
                                    Talk to Captain
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
