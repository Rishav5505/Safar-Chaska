import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ease = [0.22, 1, 0.36, 1];
const CTA_IMG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000';

const CTA = () => {
    return (
        <section className="grain relative isolate overflow-hidden bg-ink min-h-[560px] md:min-h-[680px] flex items-center">
            <div className="absolute inset-0 -z-0 overflow-hidden">
                <img
                    src={CTA_IMG}
                    alt="Sunlit Himalayan peaks above the clouds"
                    loading="lazy"
                    className="w-full h-full object-cover animate-kenburns"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

            <div className="relative z-10 container-custom py-24 md:py-32">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease }}
                        className="eyebrow !text-secondary mb-6"
                    >
                        Limited slots this season
                    </motion.p>

                    <h2 className="font-serif font-light !text-white text-[2.6rem] leading-[1.03] sm:text-6xl md:text-7xl tracking-tight">
                        {['Ready for the', 'ultimate escape?'].map((line, i) => (
                            <span key={i} className="block overflow-hidden pb-[0.08em]">
                                <motion.span
                                    initial={{ y: '110%' }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
                                    className={`block ${i === 1 ? 'italic text-secondary-light' : ''}`}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.35, ease }}
                        className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed font-light"
                    >
                        Join 500+ adventure seekers who have already booked their Himalayan journey this month.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.5, ease }}
                        className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                        <Link to="/booking" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="group w-full sm:w-auto rounded-full px-9 text-base">
                                Secure my spot <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link to="/contact" className="w-full sm:w-auto">
                            <Button variant="glass" size="lg" className="w-full sm:w-auto rounded-full px-9 text-base">
                                Talk to a captain
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
