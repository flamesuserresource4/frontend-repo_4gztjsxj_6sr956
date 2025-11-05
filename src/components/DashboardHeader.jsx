import React from 'react';
import { Server, Play, Square } from 'lucide-react';

export default function DashboardHeader({ totalContainers, runningCount }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Container Control Panel</h1>
            <p className="text-sm text-gray-500">Manage, monitor, and orchestrate your containers</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <Play className="h-4 w-4 text-emerald-600" />
            <span>{runningCount} running</span>
            <span className="text-gray-300">|</span>
            <Square className="h-4 w-4 text-gray-500" />
            <span>{totalContainers - runningCount} stopped</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-inner">
            <span className="font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
