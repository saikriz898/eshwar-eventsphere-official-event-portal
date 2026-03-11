import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Phone,
    Mail,
    MapPin,
    ChevronRight,
    ArrowRight,
    Globe,
    Zap
} from 'lucide-react';
import seceLogo from '../../../assets/logo/sece-logo-primary.png';

const PublicFooter = () => {
    const socialLinks = [
        { icon: Globe, href: 'https://sece.ac.in' },
        { icon: Instagram, href: 'https://www.instagram.com/srieshwar_cbe/' },
        { icon: Linkedin, href: 'https://www.linkedin.com/school/srieshwar/' },
        { icon: Facebook, href: 'https://www.facebook.com/srieshwarcollegeofengineering/' },
        { icon: Twitter, href: 'https://x.com/srieshwar_cbe' },
    ];

    const linkCategories = {
        discover: [
            { name: 'Upcoming Events', path: '/events' },
            { name: 'Trending Hub', path: '/#trending' },
            { name: 'Hackathons', path: '/events?category=hackathon' },
            { name: 'Workshops', path: '/events?category=workshop' },
            { name: 'Chronos Schedule', path: '/#schedule' }
        ],
        quickLinks: [
            { name: 'Gallery Hub', path: '/gallery' },
            { name: 'Interactive Map', path: '/map' },
            { name: 'Contact Hub', path: '/contact' },
            { name: 'About Platform', path: '/about' },
            { name: 'System Status', path: '/status' }
        ]
    };

    return (
        <footer className="bg-white pt-20 pb-10 px-6 sm:px-12 lg:px-24 border-t border-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.img
                            src={seceLogo}
                            alt="SECE"
                            className="h-16 w-auto object-contain"
                        />
                        <p className="text-[13px] leading-relaxed text-slate-500 font-medium italic">
                            EventSphere is the official premiere event portal of Sri Eshwar College of Engineering, built to foster a culture of innovation, learning, and limitless collaboration. Dive into the most exclusive workshops, elite hackathons, and dynamic symposiums happening across our vibrant campus.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, backgroundColor: '#f8fafc', color: '#4f46e5' }}
                                    className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 transition-all shadow-sm"
                                >
                                    <social.icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Discover Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Discover</h4>
                        <ul className="space-y-4">
                            {linkCategories.discover.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group text-[13px] text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-all"
                                    >
                                        <ChevronRight size={14} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Quick Links</h4>
                        <ul className="space-y-4">
                            {linkCategories.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group text-[13px] text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-all"
                                    >
                                        <ChevronRight size={14} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Contact</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-50">
                                    <MapPin size={16} />
                                </div>
                                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                                    Kondampatti [Post], Vadasithur,<br />
                                    Kinathukadavu, Coimbatore - 641 202
                                </p>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-50">
                                    <Phone size={16} />
                                </div>
                                <p className="text-[13px] text-slate-500 font-medium">+91-4259 200 300</p>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-50">
                                    <Mail size={16} />
                                </div>
                                <p className="text-[13px] text-slate-500 font-medium">sece@sece.ac.in</p>
                            </div>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-[#0a0c10] transition-all group"
                            >
                                <Mail size={16} />
                                CONTACT US <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        © 2026 Sri Eshwar College of Engineering. EventSphere All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        Developed with <Zap size={12} className="text-amber-500 fill-amber-500 animate-pulse" /> by SECE Innovators.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
