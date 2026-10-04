import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Check, ArrowRight } from 'lucide-react';
import Button from './Button';

const ease = [0.22, 1, 0.36, 1];

const Slider = ({ id, label, value, min, max, onChange, suffix }) => {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div>
            <div className="flex justify-between items-end mb-4">
                <label htmlFor={id} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</label>
                <span className="font-serif text-3xl text-ink leading-none">{value}<span className="text-sm text-slate-400 ml-1 font-sans">{suffix}</span></span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                style={{ background: `linear-gradient(to right, #0F766E ${pct}%, rgba(11,18,21,0.1) ${pct}%)` }}
            />
            <div className="flex justify-between mt-2 text-[10px] text-slate-400"><span>{min}</span><span>{max}</span></div>
        </div>
    );
};

const BudgetCalculator = ({ basePrice = 4999 }) => {
    const [travelers, setTravelers] = useState(2);
    const [days, setDays] = useState(3);

    const priceInt = parseInt(basePrice.toString().replace(/,/g, ''), 10) || 0;
    const total = (priceInt * travelers) + (travelers * 500 * (days - 1)); // Base + extras per day

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-premium"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                    <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center mb-8">
                        <Calculator className="w-5 h-5" />
                    </span>
                    <p className="eyebrow mb-4">Plan ahead</p>
                    <h2 className="heading-premium text-4xl md:text-5xl mb-5">Smart budget <em>estimator</em></h2>
                    <p className="text-slate-500 mb-10 leading-relaxed">Plan your finances before the adventure. No hidden costs, just pure transparency.</p>

                    <div className="space-y-10">
                        <Slider id="bc-travellers" label="Travellers" value={travelers} min={1} max={15} onChange={setTravelers} suffix={travelers === 1 ? 'person' : 'people'} />
                        <Slider id="bc-days" label="Trip duration" value={days} min={2} max={10} onChange={setDays} suffix="days" />
                    </div>
                </div>

                <div className="grain relative bg-ink rounded-3xl p-8 md:p-12 text-white overflow-hidden">
                    <div aria-hidden="true" className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/25 blur-[90px]" />
                    <div className="relative z-[2]">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-4">Estimated total</p>
                        <motion.p
                            key={total}
                            initial={{ opacity: 0.4, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="font-serif font-light text-5xl sm:text-6xl md:text-7xl leading-none mb-3"
                            aria-live="polite"
                        >
                            ₹{total.toLocaleString('en-IN')}
                        </motion.p>
                        <p className="text-white/50 text-sm">Inclusive of stay, meals &amp; travel support</p>

                        <ul className="mt-8 pt-8 border-t border-white/10 space-y-3">
                            {['Group discount applied', 'Local support 24/7'].map((t) => (
                                <li key={t} className="flex items-center gap-3 text-sm text-white/80">
                                    <span className="w-6 h-6 rounded-full border border-secondary/40 text-secondary flex items-center justify-center"><Check className="w-3 h-3" /></span>
                                    {t}
                                </li>
                            ))}
                        </ul>

                        <Link to="/booking" className="block mt-10">
                            <Button variant="secondary" className="group w-full rounded-full">
                                Book this budget <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default BudgetCalculator;
