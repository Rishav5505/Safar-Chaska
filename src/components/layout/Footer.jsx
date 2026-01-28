import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send, Youtube, Mountain, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Safar<span className="text-secondary">Chaska.</span></span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Handcrafting raw and premium mountain experiences for the modern soul. Founded in the trails of Chakrata.
                        </p>
                        <div className="flex items-center space-x-4">
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition-colors border border-white/10">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Trails</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/packages" className="hover:text-white transition-colors">Expeditions</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Get Help</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Reach Out</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+91 81713 79469</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>ops@safarchaska.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Chakrata, Uttarakhand</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Join The Tribe</h4>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">Subscribe to get monthly trail updates and private deals.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary"
                            />
                            <button className="absolute right-2 top-2 p-1.5 bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-500 text-xs">
                    <p>© 2026 SafarChaska. All Rights Reserved.</p>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Credits</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
