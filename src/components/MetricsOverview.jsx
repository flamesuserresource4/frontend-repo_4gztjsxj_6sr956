import React from 'react';
import { Cpu, HardDrive, Activity } from 'lucide-react';

function MetricCard({ icon: Icon, title, value, unit, percent, color }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-gray-900">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
        <div className={`h-10 w-10 rounded-lg ${color} bg-opacity-10 text-current flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {typeof percent === 'number' && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, percent))}%`, background: 'currentColor' }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">{percent.toFixed(0)}% used</p>
        </div>
      )}
    </div>
  );
}

export default function MetricsOverview({ totals }) {
  const { cpuPercent, ramUsedGb, ramTotalGb, diskUsedGb, diskTotalGb } = totals;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard icon={Cpu} title="CPU" value={cpuPercent.toFixed(1)} unit="%" percent={cpuPercent} color="text-rose-600" />
      <MetricCard icon={Activity} title="Memory" value={`${ramUsedGb.toFixed(1)} / ${ramTotalGb.toFixed(1)}`} unit="GB" percent={(ramUsedGb / Math.max(1, ramTotalGb)) * 100} color="text-indigo-600" />
      <MetricCard icon={HardDrive} title="Disk" value={`${diskUsedGb.toFixed(1)} / ${diskTotalGb.toFixed(1)}`} unit="GB" percent={(diskUsedGb / Math.max(1, diskTotalGb)) * 100} color="text-emerald-600" />
    </section>
  );
}
