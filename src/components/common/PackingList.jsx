import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Check, Wind, ThermometerSnowflake, Mountain, Zap } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const packingItems = [
    { id: 1, text: "Gore-Tex or Waterproof Jacket", category: "Apparel" },
    { id: 2, text: "High-Ankle Trekking Boots", category: "Footwear" },
    { id: 3, text: "Thermal Layers (Base & Mid)", category: "Apparel" },
    { id: 4, text: "Polarized Sunglasses (Cat 3/4)", category: "Gear" },
    { id: 5, text: "20,000mAh Power Bank", category: "Misc" },
    { id: 6, text: "Personal Medicine Kit", category: "Misc" },
    { id: 7, text: "Fleece or Warm Hoodie", category: "Apparel" },
    { id: 8, text: "Microfiber Travel Towel", category: "Misc" },
];

const PackingList = () => {
    const [checkedItems, setCheckedItems] = useState([]);

    const toggleItem = (id) => {
        setCheckedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const progress = (checkedItems.length / packingItems.length) * 100;

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="bg-white rounded-3xl shadow-premium p-6 sm:p-10 md:p-14"
        >
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                <div className="lg:w-5/12">
                    <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center mb-8">
                        <Briefcase className="w-5 h-5" />
                    </span>
                    <p className="eyebrow mb-4">Before you go</p>
                    <h2 className="heading-premium text-4xl md:text-5xl mb-5">Himalayan <em>checklist</em></h2>
                    <p className="text-slate-500 mb-10 leading-relaxed">Don&rsquo;t leave without these essentials. Tick them off as you pack.</p>

                    <div className="rounded-2xl bg-sand p-6 mb-8">
                        <div className="flex justify-between items-baseline mb-4">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Packing progress</p>
                            <span className="font-serif text-2xl text-primary">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1 bg-ink/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Packing progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.6, ease }}
                                className="h-full bg-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: ThermometerSnowflake, label: "Cold ready" },
                            { icon: Wind, label: "Windproof" },
                            { icon: Mountain, label: "All terrain" },
                            { icon: Zap, label: "High energy" }
                        ].map((tag) => (
                            <div key={tag.label} className="flex items-center gap-2.5 text-slate-500">
                                <tag.icon className="w-4 h-4 text-primary" />
                                <span className="text-[11px] uppercase tracking-[0.2em]">{tag.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <ul className="lg:w-7/12 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packingItems.map((item, i) => {
                        const checked = checkedItems.includes(item.id);
                        return (
                            <motion.li
                                key={item.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleItem(item.id)}
                                    aria-pressed={checked}
                                    className={`w-full h-full flex items-start gap-4 p-5 rounded-2xl text-left border transition-all duration-500 ease-premium hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${checked ? 'bg-primary/[0.05] border-primary/30' : 'bg-white border-ink/10 hover:border-primary/30'}`}
                                >
                                    <span className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${checked ? 'bg-primary text-white' : 'border border-ink/20 text-transparent'}`}>
                                        <Check className="w-3.5 h-3.5" />
                                    </span>
                                    <span>
                                        <span className={`block font-serif text-lg leading-snug transition-colors duration-300 ${checked ? 'text-slate-400 line-through decoration-primary/40' : 'text-ink'}`}>{item.text}</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{item.category}</span>
                                    </span>
                                </button>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </motion.section>
    );
};

export default PackingList;
