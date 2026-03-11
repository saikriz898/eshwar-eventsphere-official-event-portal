import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';

// Pages
import HomePage from './pages/Home/HomePage';
import ContactPage from './pages/Public/ContactPage';
import EventsPage from './pages/Public/EventsPage';
import SchedulePage from './pages/Public/SchedulePage';
import GalleryPage from './pages/Public/GalleryPage';
import MapPage from './pages/Public/MapPage';

// Auth Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Error Pages
import NotFound from './pages/Error/NotFound';
import Forbidden from './pages/Error/Forbidden';
import ServerError from './pages/Error/ServerError';
import Maintenance from './pages/Error/Maintenance';
import UnderConstruction from './pages/Error/UnderConstruction';

// Smooth Scroll Hook
const useLenis = () => {
  useEffect(() => {
    // Check if the current path is NOT the contact page (if we want to disable Lenis for no-scroll pages)
    // But since it's a SPA, we can just let it be or disable specifically
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};

function App() {
  useLenis();

  return (
    <div className="min-h-screen selection:bg-indigo-100">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            borderRadius: '16px',
            padding: '12px 24px',
          }
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/calendar" element={<SchedulePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Error & Status Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/under-construction" element={<UnderConstruction />} />

        {/* Wildcard 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
