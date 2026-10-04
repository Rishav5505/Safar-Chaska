import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import ScrollProgress from './components/common/ScrollProgress';
import PageTransition from './components/common/PageTransition';
import SmoothScroll from './components/effects/SmoothScroll';
import LeadPopup from './components/common/LeadPopup';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AddPackage from './pages/admin/AddPackage';
import AdminBookings from './pages/admin/AdminBookings';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSettings from './pages/admin/AdminSettings';

const LOADER_KEY = 'sc_intro_seen';

// Intro loader only on the first visit of a browser session.
const shouldShowLoader = () => {
  try {
    return !sessionStorage.getItem(LOADER_KEY);
  } catch {
    return false;
  }
};

const page = (el) => <PageTransition>{el}</PageTransition>;

const AppShell = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  // These pages have their own mobile bottom action bar, so the floating button moves to desktop only.
  const hasMobileActionBar = location.pathname.startsWith('/destination');

  return (
    <>
      <SmoothScroll />
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <BackToTop />}

      <AnimatePresence mode="wait">
        {/* Admin routes share one key so the dashboard layout doesn't re-animate on every tab */}
        <Routes location={location} key={isAdmin ? 'admin' : location.pathname}>
          <Route path="/" element={page(<Home />)} />
          <Route path="/chakrata" element={page(<Chakrata />)} />
          <Route path="/destination/:id" element={page(<DestinationDetails />)} />
          <Route path="/booking" element={page(<Booking />)} />
          <Route path="/about" element={page(<About />)} />
          <Route path="/contact" element={page(<Contact />)} />
          <Route path="/packages" element={page(<Packages />)} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="packages/add" element={<AddPackage />} />
            <Route path="packages/edit/:id" element={<AddPackage />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </AnimatePresence>

      <LeadPopup />

      {/* WhatsApp Float */}
      {!isAdmin && (
        <a
          href="https://wa.me/918171379469"
          target="_blank"
          rel="noopener noreferrer"
          className={`${hasMobileActionBar ? 'hidden lg:flex' : 'flex'} fixed bottom-6 right-6 z-50 w-14 h-14 items-center justify-center bg-[#25D366] text-white rounded-full shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 transition-transform duration-500 ease-premium group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40`}
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 motion-reduce:hidden" aria-hidden="true" />
          <MessageCircle className="relative w-6 h-6" />
          <span className="pointer-events-none absolute right-full mr-4 bg-ink text-white text-[11px] font-medium tracking-wide px-3.5 py-2 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-premium">
            Chat with a trip captain
          </span>
        </a>
      )}
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(shouldShowLoader);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem(LOADER_KEY, '1');
      } catch {
        // Storage blocked — loader will simply show again next visit
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="antialiased text-slate-900 bg-sand min-h-screen relative">
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>

          {!loading && <AppShell />}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
