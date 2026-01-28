import React from 'react';
import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-slate-900 flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated Background Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <motion.div
                    animate={{
                        scale: [1, 2, 1],
                        rotate: [0, 360],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-[500px] h-[500px] border-2 border-white rounded-[40%]"
                />
                <motion.div
                    animate={{
                        scale: [1.5, 1, 1.5],
                        rotate: [360, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[700px] h-[700px] border-2 border-primary rounded-[45%]"
                />
            </div>

            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="w-24 h-24 bg-primary/20 rounded-[2rem] flex items-center justify-center mb-6 border border-primary/30 backdrop-blur-xl">
                        <Mountain className="w-12 h-12 text-white" />
                    </div>

                    <motion.h2
                        className="text-4xl font-black text-white tracking-tighter"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Safar<span className="text-secondary">Chaska</span>
                    </motion.h2>

                    <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-slate-500 font-bold uppercase tracking-[0.3em] text-xs"
                    >
                        Mapping Your Adventure...
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Loader;
