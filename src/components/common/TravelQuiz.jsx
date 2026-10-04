import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Heart, Zap, Compass, Mountain, Check, Star } from 'lucide-react';
import Button from './Button';

const ease = [0.22, 1, 0.36, 1];

const questions = [
    {
        id: 1,
        question: "What's your primary mountain goal?",
        options: [
            { text: "Absolute Peace & Quiet", value: "serene", icon: Mountain },
            { text: "Adrenaline & Adventure", value: "adventurous", icon: Zap },
            { text: "Cultural Connection", value: "cultural", icon: Heart },
            { text: "Stunning Photography", value: "active", icon: Sparkles }
        ]
    },
    {
        id: 2,
        question: "Who's coming along for the ride?",
        options: [
            { text: "Going Solo", value: "serene", icon: Compass },
            { text: "My Adventure Squad", value: "adventurous", icon: Zap },
            { text: "Family & Loved Ones", value: "cultural", icon: Heart },
            { text: "A Professional Partner", value: "active", icon: Sparkles }
        ]
    },
    {
        id: 3,
        question: "What kind of stay do you prefer?",
        options: [
            { text: "Luxury Hillside Resort", value: "active", icon: Star },
            { text: "Cozy Homestay with Locals", value: "cultural", icon: Heart },
            { text: "Wild Camping Under Stars", value: "adventurous", icon: Mountain },
            { text: "A Quiet Forest Log Cabin", value: "serene", icon: Compass }
        ]
    }
];

const personas = {
    serene: {
        title: "Cloud Chaser",
        desc: "You find peace in the silence of the mountains. Your soul craves the golden hour and quiet trails.",
        recommend: "Deoban Forest & Chilmiri Sunset",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    },
    active: {
        title: "Peak Conqueror",
        desc: "You live for the adrenaline. Higher the peak, better the view. You don't just visit, you dominate the terrain.",
        recommend: "Tiger Falls Trek & Budher Caves",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    },
    adventurous: {
        title: "Wild Explorer",
        desc: "You are the first to jump into the unknown. Caving, camping, and bushcraft are your true callings.",
        recommend: "Moila Alpine Meadows & Caving",
        image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=800"
    },
    cultural: {
        title: "Local Soul",
        desc: "You travel to connect. Stories, traditions, and local food are what make your journeys meaningful.",
        recommend: "Kanasar Village & Ancient Temples",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    }
};

const stepMotion = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.6, ease },
};

const TravelQuiz = () => {
    const [step, setStep] = useState('start'); // start, quiz, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (value) => {
        const newAnswers = [...answers.slice(0, currentQuestion), value];
        setAnswers(newAnswers);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setStep('result');
        }
    };

    const goBack = () => {
        if (currentQuestion === 0) setStep('start');
        else setCurrentQuestion((prev) => prev - 1);
    };

    const getRecommendation = () => {
        const counts = {};
        answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
        const keys = Object.keys(counts);
        if (!keys.length) return personas.serene;
        const max = keys.reduce((a, b) => (counts[a] >= counts[b] ? a : b));
        return personas[max];
    };

    const resetQuiz = () => {
        setStep('start');
        setCurrentQuestion(0);
        setAnswers([]);
    };

    const result = step === 'result' ? getRecommendation() : null;

    return (
        <section className="py-16 md:py-28 bg-sand">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="max-w-6xl mx-auto"
                >
                    <AnimatePresence mode="wait">
                        {step === 'start' && (
                            <motion.div key="start" {...stepMotion} className="relative overflow-hidden bg-white rounded-3xl shadow-premium grid md:grid-cols-2">
                                <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-center">
                                    <p className="eyebrow mb-5">Travel Quiz</p>
                                    <h2 className="heading-premium text-4xl md:text-5xl mb-5">Find your <em>perfect trail</em></h2>
                                    <p className="text-slate-500 mb-10 max-w-md leading-relaxed">
                                        Answer three simple questions and we&rsquo;ll recommend the Himalayan experience made for you.
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <Button onClick={() => setStep('quiz')} className="group rounded-full px-8">
                                            Start the quiz <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                        </Button>
                                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">~ 30 sec</span>
                                    </div>
                                </div>
                                <div className="relative hidden md:block min-h-[380px] overflow-hidden">
                                    <img src={personas.serene.image} alt="Misty Himalayan valley" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
                                </div>
                            </motion.div>
                        )}

                        {step === 'quiz' && (
                            <motion.div key="quiz" {...stepMotion} className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-premium">
                                <div className="flex justify-between items-center gap-4 mb-10 md:mb-12">
                                    <button
                                        type="button"
                                        onClick={goBack}
                                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                            <span className="font-serif italic normal-case tracking-normal text-primary text-base">{currentQuestion + 1}</span> / {questions.length}
                                        </span>
                                        <div className="flex gap-1.5" aria-hidden="true">
                                            {questions.map((_, i) => (
                                                <span key={i} className={`h-1 rounded-full transition-all duration-500 ease-premium ${i <= currentQuestion ? 'w-8 bg-primary' : 'w-4 bg-ink/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div key={currentQuestion} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease }}>
                                        <h3 className="heading-premium text-3xl md:text-5xl mb-10 md:mb-12">{questions[currentQuestion].question}</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            {questions[currentQuestion].options.map((opt, i) => {
                                                const chosen = answers[currentQuestion] === opt.value;
                                                return (
                                                    <motion.button
                                                        type="button"
                                                        key={opt.text}
                                                        initial={{ opacity: 0, y: 16 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                                                        onClick={() => handleAnswer(opt.value)}
                                                        className={`group flex items-center gap-5 p-5 md:p-6 rounded-2xl border text-left transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${chosen ? 'border-primary/50 bg-primary/[0.04]' : 'border-ink/10 bg-sand/40'}`}
                                                    >
                                                        <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                                                            <opt.icon className="w-5 h-5" />
                                                        </span>
                                                        <span className="font-serif font-light text-xl text-ink">{opt.text}</span>
                                                        <ArrowRight className="ml-auto w-4 h-4 text-primary opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {step === 'result' && result && (
                            <motion.div key="result" {...stepMotion} className="bg-ink rounded-3xl overflow-hidden text-white shadow-premium">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="relative h-64 md:h-auto md:order-2 overflow-hidden">
                                        <motion.img
                                            initial={{ scale: 1.12 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1.6, ease }}
                                            src={result.image}
                                            alt={result.recommend}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent md:bg-gradient-to-r" />
                                    </div>
                                    <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-center">
                                        <p className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.25em] text-white/50">
                                            <span className="w-8 h-8 rounded-full border border-secondary/40 text-secondary flex items-center justify-center"><Check className="w-4 h-4" /></span>
                                            Your travel persona
                                        </p>
                                        <h2 className="font-serif font-light !text-white text-4xl md:text-6xl leading-[1.05] mb-5">
                                            The <em className="italic text-secondary-light">{result.title}</em>
                                        </h2>
                                        <p className="text-white/60 mb-8 leading-relaxed">{result.desc}</p>

                                        <div className="border-t border-b border-white/10 py-6 mb-10">
                                            <p className="text-[10px] uppercase tracking-[0.25em] text-secondary mb-2">Recommended for you</p>
                                            <p className="font-serif text-2xl">{result.recommend}</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link to="/booking" className="w-full sm:w-auto">
                                                <Button variant="secondary" className="w-full sm:w-auto rounded-full px-8">Book adventure <ArrowRight className="w-4 h-4" /></Button>
                                            </Link>
                                            <Button variant="glass" onClick={resetQuiz} className="rounded-full px-8">
                                                <RefreshCw className="w-4 h-4" /> Try again
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default TravelQuiz;
