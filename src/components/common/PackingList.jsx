import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, Circle, Wind, ThermometerSnowflake, Mountain, Zap } from 'lucide-react';

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
        if (checkedItems.includes(id)) {
            setCheckedItems(prev => prev.filter(item => item !== id));
        } else {
            setCheckedItems(prev => [...prev, id]);
        }
    };

    const progress = (checkedItems.length / packingItems.length) * 100;

    return (
        <section className="py-24 bg-white rounded-[4rem] border border-slate-100 shadow-3xl shadow-black/5 overflow-hidden">
            <div className="container mx-auto px-8 md:px-16">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2">
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
                            <Briefcase className="w-8 h-8 text-secondary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Himalayan <br />Checklist.</h2>
                        <p className="text-xl text-slate-500 font-medium mb-12">Don't leave without these essentials. Check them off as you pack your bags!</p>

                        <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-black text-slate-900 uppercase tracking-widest text-xs">Packing Progress</p>
                                <span className="text-primary font-black">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-primary"
                                ></motion.div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: ThermometerSnowflake, label: "Cold Ready" },
                                { icon: Wind, label: "Windproof" },
                                { icon: Mountain, label: "All Terrain" },
                                { icon: Zap, label: "High Energy" }
                            ].map((tag, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-400 font-bold">
                                    <tag.icon className="w-5 h-5" />
                                    <span className="text-sm uppercase tracking-widest">{tag.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full grid grid-cols-1 gap-3">
                        {packingItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-6 p-6 rounded-3xl text-left transition-all border ${checkedItems.includes(item.id) ? 'bg-primary/5 border-primary/20' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${checkedItems.includes(item.id) ? 'bg-primary text-white' : 'border-2 border-slate-200 text-transparent'}`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className={`font-black tracking-tight text-lg transition-colors ${checkedItems.includes(item.id) ? 'text-primary line-through opacity-50' : 'text-slate-900'}`}>{item.text}</p>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{item.category}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackingList;
