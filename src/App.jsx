import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Chakrata from './pages/Chakrata';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
import DestinationDetails from './pages/DestinationDetails';
import { MessageCircle } from 'lucide-react';
import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTop from './components/common/BackToTop';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Shorter loader for a snappier feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="antialiased text-slate-900 bg-white">
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        {!loading && <BackToTop />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chakrata" element={<Chakrata />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>

        {/* WhatsApp Float */}
        <a
          href="https://wa.me/918171379469"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-[#25D366]/40 hover:scale-105 transition-all group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
            Support
          </span>
        </a>
      </div>
    </Router>
  );
};

export default App;
