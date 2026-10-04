import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Collapse from './Collapse';

const FaqList = ({ faqs }) => {
    const [open, setOpen] = useState(0);

    return (
        <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                return (
                    <div key={i}>
                        <h3 className="!font-sans">
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="w-full flex items-start justify-between gap-6 py-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
                            >
                                <span className={`font-serif font-light text-lg md:text-xl leading-snug transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-ink group-hover:text-primary'}`}>
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className={`shrink-0 mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-primary border-primary text-white' : 'border-ink/15 text-ink'}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </motion.span>
                            </button>
                        </h3>
                        <Collapse open={isOpen} id={panelId}>
                            <p className="pb-6 pr-4 md:pr-12 text-slate-600 leading-relaxed">{faq.answer}</p>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};

export default FaqList;
