import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#0b0d12] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-cyan-400"></span>
          <span className="text-white/90 font-medium">Nebula Control</span>
        </div>
        <nav className="flex items-center gap-6">
          <a className="hover:text-white transition-colors" href="#features">Features</a>
          <a className="hover:text-white transition-colors" href="#launch">Launch</a>
          <a className="hover:text-white transition-colors" href="#">Privacy</a>
          <a className="hover:text-white transition-colors" href="#">Status</a>
        </nav>
        <p className="text-gray-500">© {year} Nebula Control. All rights reserved.</p>
      </div>
    </footer>
  );
}
