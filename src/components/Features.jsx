import React from 'react';
import { Rocket, Activity, Shield } from 'lucide-react';

const features = [
  {
    title: 'Instant Provisioning',
    description: 'Spin up environments at light speed with opinionated defaults and zero-drift config.',
    icon: Rocket,
    accent: 'from-indigo-500/20 to-indigo-400/10',
  },
  {
    title: 'Live Metrics',
    description: 'Observe CPU, memory, and I/O in real-time with cosmic-level clarity.',
    icon: Activity,
    accent: 'from-cyan-500/20 to-cyan-400/10',
  },
  {
    title: 'Hardened Control',
    description: 'Role-based access and encrypted channels to keep your fleet safe.',
    icon: Shield,
    accent: 'from-fuchsia-500/20 to-fuchsia-400/10',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative w-full bg-[#0b0d12] py-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Core Capabilities</h2>
          <p className="mt-3 text-gray-300">Purpose-built modules that make operating at scale feel elegant.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ title, description, icon: Icon, accent }) => (
            <div key={title} className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 hover:border-white/20 transition-colors">
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity pointer-events-none`} />
              <div className="relative">
                <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-300">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
    </section>
  );
}
