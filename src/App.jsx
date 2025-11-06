import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0a0b10] text-white">
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}
