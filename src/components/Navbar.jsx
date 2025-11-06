import React from 'react';
import { Home, Settings, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="h-6 w-6 rounded bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-cyan-400 shadow-md"></span>
          <span className="text-white font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300">Nebula</span>
            <span className="text-white"> Control</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
            <Home size={16} /> Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
            <Settings size={16} /> Settings
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#launch"
            className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 text-white px-3 py-2 text-sm font-medium transition-colors border border-white/10"
          >
            Launch App
          </a>
        </div>
      </nav>
    </header>
  );
}
