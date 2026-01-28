import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCw, Heart, Zap, Compass, Mountain, CheckCircle2, Star } from 'lucide-react';
import Button from './Button';

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
        title: "The Cloud Chaser",
        desc: "You find peace in the silence of the mountains. Your soul craves the golden hour and quiet trails.",
        recommend: "Deoban Forest & Chilmiri Sunset",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    },
    active: {
        title: "The Peak Conqueror",
        desc: "You live for the adrenaline. Higher the peak, better the view. You don't just visit, you dominate the terrain.",
        recommend: "Tiger Falls Trek & Budher Caves",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    },
    adventurous: {
        title: "The Wild Explorer",
        desc: "You are the first to jump into the unknown. Caving, camping, and bushcraft are your true callings.",
        recommend: "Moila Alpine Meadows & Caving",
        image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=800"
    },
    cultural: {
        title: "The Local Soul",
        desc: "You travel to connect. Stories, traditions, and local food are what make your journeys meaningful.",
        recommend: "Kanasar Village & Ancient Temples",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    }
};

const TravelQuiz = () => {
    const [step, setStep] = useState('start'); // start, quiz, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (value) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    const getRecommendation = () => {
        const counts = {};
        answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
        const max = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        return personas[max];
    };

    const resetQuiz = () => {
        setStep('start');
        setCurrentQuestion(0);
        setAnswers([]);
    };

    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="container-custom">
                <AnimatePresence mode="wait">
                    {step === 'start' && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-sm border border-slate-100 max-w-4xl mx-auto"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                                <Sparkles className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Find Your Perfect Trail</h2>
                            <p className="text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed font-medium">Answer 3 simple questions and we'll recommend the best Himalayan experience for you.</p>
                            <Button
                                onClick={() => setStep('quiz')}
                                className="px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 mx-auto"
                            >
                                Start Quiz <ArrowRight className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-slate-100 max-w-5xl mx-auto"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Question {currentQuestion + 1} of {questions.length}</span>
                                <div className="flex gap-2">
                                    {questions.map((_, i) => (
                                        <div key={i} className={`h-1.5 rounded-full transition-all ${i <= currentQuestion ? 'w-10 bg-primary' : 'w-4 bg-slate-100'}`} />
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-12 tracking-tight">{questions[currentQuestion].question}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {questions[currentQuestion].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all text-left group"
                                    >
                                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            <opt.icon className="w-7 h-7" />
                                        </div>
                                        <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">{opt.text}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 rounded-[2.5rem] overflow-hidden text-white shadow-xl max-w-6xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-10 md:p-20 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Persona Identified</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The {getRecommendation().title}</h2>
                                    <p className="text-lg text-white/60 mb-10 leading-relaxed font-medium italic">"{getRecommendation().desc}"</p>

                                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-12">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Recommended For You</p>
                                        <p className="text-2xl font-bold text-white tracking-tight">{getRecommendation().recommend}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <Button className="h-14 px-10 rounded-xl font-bold text-lg">Book Adventure</Button>
                                        <button
                                            onClick={resetQuiz}
                                            className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-slate-900"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Try Again
                                        </button>
                                    </div>
                                </div>
                                <div className="h-80 md:h-auto relative overflow-hidden">
                                    <img
                                        src={getRecommendation().image}
                                        alt="Recommendation"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TravelQuiz;
