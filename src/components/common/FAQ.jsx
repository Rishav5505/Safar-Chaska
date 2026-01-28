import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
    {
        question: "How do I reach Chakrata?",
        answer: "Chakrata is approximately 90 km from Dehradun. You can take a private taxi from Dehradun Railway Station or Airport, which takes around 3 hours. We also provide pick-up services from Dehradun as part of our premium packages."
    },
    {
        question: "What is the best time to visit?",
        answer: "March to June is perfect for pleasant weather. October to February is the snowy season - ideal if you want to witness snowfall and enjoy the winter charm of the Himalayas."
    },
    {
        question: "Is it safe for solo travelers?",
        answer: "Absolutely! Chakrata is one of the safest destinations in Uttarakhand. Our local captains are always available to guide you, and we ensure all our guest stays are verified and secure."
    },
    {
        question: "What should I carry with me?",
        answer: "Even in summer, evenings can be cool, so carry a light jacket. In winter, heavy woolens are a must. Don't forget comfortable trekking shoes, a power bank, and your camera!"
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-20 bg-white relative">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <Reveal center>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Commonly Asked</h2>
                        </Reveal>
                        <p className="text-slate-500 mt-2 text-sm">Everything you need to know before your trip.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-xl transition-all duration-300 border ${activeIndex === i ? 'bg-slate-900 border-slate-900 shadow-md' : 'bg-slate-50 border-slate-100'}`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                                >
                                    <span className={`text-base font-semibold transition-colors ${activeIndex === i ? 'text-white' : 'text-slate-900'}`}>{faq.question}</span>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${activeIndex === i ? 'bg-primary text-white rotate-180' : 'bg-white text-slate-400 border border-slate-100'}`}>
                                        {activeIndex === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-sm text-slate-400 font-medium leading-relaxed border-t border-white/5">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-base font-bold text-slate-900">Still have questions?</h4>
                                <p className="text-xs text-slate-500 font-medium">Chat with our captains for help.</p>
                            </div>
                        </div>
                        <a href="https://wa.me/918171379469" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <button className="w-full px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all active:scale-95">
                                WhatsApp Us
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
