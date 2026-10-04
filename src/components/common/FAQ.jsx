import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const ease = [0.22, 1, 0.36, 1];

const faqs = [
    {
        question: "How do I reach Chakrata?",
        answer: "Chakrata is approximately 90 km from Dehradun. You can take a private taxi from Dehradun Railway Station or Airport, which takes around 3 hours. We also provide pick-up services from Dehradun as part of our premium packages."
    },
    {
        question: "What is the best time to visit?",
        answer: "March to June is perfect for pleasant weather. October to February is the snowy season — ideal if you want to witness snowfall and enjoy the winter charm of the Himalayas."
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
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-16 md:py-28 bg-sand">
            <div className="container-custom">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Title + help card */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                        <SectionHeader
                            className="!mb-10"
                            eyebrow="Good to know"
                            title={<>The trip <em>bible</em></>}
                            subtitle="Everything you need to know before your trip."
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2, ease }}
                            className="hidden lg:flex items-center gap-5 rounded-3xl bg-white shadow-premium p-6"
                        >
                            <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center shrink-0">
                                <MessageCircle className="w-5 h-5" />
                            </span>
                            <div className="flex-1">
                                <p className="font-serif text-xl text-ink">Still have questions?</p>
                                <p className="text-sm text-slate-500">Chat with our captains for help.</p>
                            </div>
                            <a
                                href="https://wa.me/918171379469"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp us"
                                className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center transition-all duration-500 ease-premium hover:bg-primary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Accordion */}
                    <div className="lg:col-span-7">
                        <div className="border-t border-ink/10">
                            {faqs.map((faq, i) => {
                                const open = activeIndex === i;
                                const id = `faq-panel-${i}`;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: i * 0.08, ease }}
                                        className="border-b border-ink/10"
                                    >
                                        <h3 className="font-sans">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIndex(open ? null : i)}
                                                aria-expanded={open}
                                                aria-controls={id}
                                                className="group w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg"
                                            >
                                                <span className="flex items-baseline gap-4 md:gap-6">
                                                    <span className="font-serif italic text-sm text-primary/70 w-6 shrink-0">0{i + 1}</span>
                                                    <span className={`font-serif font-light text-xl md:text-2xl leading-snug transition-colors duration-300 ${open ? 'text-primary' : 'text-ink group-hover:text-primary'}`}>
                                                        {faq.question}
                                                    </span>
                                                </span>
                                                <span className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ease-premium ${open ? 'bg-primary border-primary text-white rotate-45' : 'border-ink/15 text-ink group-hover:border-primary group-hover:text-primary'}`}>
                                                    <Plus className="w-4 h-4" />
                                                </span>
                                            </button>
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {open && (
                                                <motion.div
                                                    id={id}
                                                    role="region"
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ height: { duration: 0.5, ease }, opacity: { duration: 0.35 } }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-7 pl-10 md:pl-12 pr-4 md:pr-16 text-slate-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Mobile help card */}
                        <div className="lg:hidden mt-10 rounded-3xl bg-white shadow-premium p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                            <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center shrink-0">
                                <MessageCircle className="w-5 h-5" />
                            </span>
                            <div className="flex-1">
                                <p className="font-serif text-xl text-ink">Still have questions?</p>
                                <p className="text-sm text-slate-500">Chat with our captains for help.</p>
                            </div>
                            <a
                                href="https://wa.me/918171379469"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-medium transition-colors duration-500 hover:bg-primary"
                            >
                                WhatsApp us <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
