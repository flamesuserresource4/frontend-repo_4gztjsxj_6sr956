import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] w-full bg-[#0b0d12]">
      {/* Spline scene as full-width cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/t7ourXf4CdN9XTF3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Orchestrate the Cosmos of Your Infrastructure
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-2xl">
            Nebula Control brings a minimalist, futuristic command surface for provisioning, metrics, and secure control—designed for the dark void.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#launch"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-500/90 hover:bg-indigo-500 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/30"
            >
              <Rocket size={18} /> Launch Nebula
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 text-white px-5 py-3 text-sm font-semibold border border-white/10"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>

      {/* Gradient overlays (non-interactive) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
    </section>
  );
}
