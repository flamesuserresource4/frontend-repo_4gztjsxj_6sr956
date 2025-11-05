import React, { useMemo, useState } from 'react';
import { Plus, Search, Play, Square, Trash2, Cpu, HardDrive } from 'lucide-react';

function StatusBadge({ status }) {
  const isRunning = status === 'running';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
      isRunning ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-50 text-gray-700 ring-1 ring-gray-200'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'bg-emerald-500' : 'bg-gray-400'}`} />
      {status}
    </span>
  );
}

function Usage({ cpu = 0, ramUsed = 0, ramLimit = 1, diskUsed = 0, diskLimit = 1 }) {
  const cpuPct = Math.min(100, Math.max(0, cpu));
  const ramPct = Math.min(100, Math.max(0, (ramUsed / Math.max(ramLimit, 0.01)) * 100));
  const diskPct = Math.min(100, Math.max(0, (diskUsed / Math.max(diskLimit, 0.01)) * 100));
  return (
    <div className="mt-3 space-y-2 text-xs text-gray-600">
      <div className="flex items-center gap-2">
        <Cpu className="h-3.5 w-3.5 text-rose-600" />
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div className="h-1.5 rounded-full bg-rose-600" style={{ width: `${cpuPct}%` }} />
        </div>
        <span className="w-12 text-right tabular-nums">{cpuPct.toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-3.5 rounded-sm bg-indigo-600" />
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div className="h-1.5 rounded-full bg-indigo-600" style={{ width: `${ramPct}%` }} />
        </div>
        <span className="w-28 text-right tabular-nums">{ramUsed.toFixed(1)} / {ramLimit.toFixed(1)} GB</span>
      </div>
      <div className="flex items-center gap-2">
        <HardDrive className="h-3.5 w-3.5 text-emerald-600" />
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div className="h-1.5 rounded-full bg-emerald-600" style={{ width: `${diskPct}%` }} />
        </div>
        <span className="w-28 text-right tabular-nums">{diskUsed.toFixed(1)} / {diskLimit.toFixed(1)} GB</span>
      </div>
    </div>
  );
}

export default function ContainersGrid({ containers, onRun, onStop, onDelete, onCreateClick }) {
  const [query, setQuery] = useState('');
  const [imageFilter, setImageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const images = useMemo(() => {
    const set = new Set(containers.map(c => c.image));
    return ['all', ...Array.from(set)];
  }, [containers]);

  const filtered = useMemo(() => {
    return containers.filter((c) => {
      const matchQuery = c.name.toLowerCase().includes(query.toLowerCase());
      const matchImage = imageFilter === 'all' || c.image === imageFilter;
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchQuery && matchImage && matchStatus;
    });
  }, [containers, query, imageFilter, statusFilter]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search containers by name..."
            className="w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={imageFilter}
          onChange={(e) => setImageFilter(e.target.value)}
          className="rounded-lg border-gray-300 py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {images.map(img => (
            <option key={img} value={img}>{img === 'all' ? 'All images' : img}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border-gray-300 py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All status</option>
          <option value="running">Running</option>
          <option value="stopped">Stopped</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={onCreateClick}
          className="group aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 bg-gray-50 hover:bg-indigo-50/50 transition flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-gray-600 group-hover:text-indigo-600">
            <div className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center group-hover:shadow-md">
              <Plus className="h-6 w-6" />
            </div>
            <p className="mt-3 font-medium">Create a new container</p>
            <p className="text-sm text-gray-500 group-hover:text-indigo-500">Click to configure and deploy</p>
          </div>
        </button>

        {filtered.map((c) => (
          <div key={c.id} className="aspect-video rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900 truncate" title={c.name}>{c.name}</h3>
                <p className="text-xs text-gray-500 truncate" title={c.description}>{c.description || '—'}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <p className="mt-2 text-xs text-gray-600">{c.image} • {c.cores} cores • {c.ramLimit.toFixed(1)} GB • {c.diskLimit.toFixed(0)} GB</p>
            <Usage cpu={c.cpu} ramUsed={c.ramUsed} ramLimit={c.ramLimit} diskUsed={c.diskUsed} diskLimit={c.diskLimit} />
            <div className="mt-auto pt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500">Files: {c.projectFiles?.length || 0}</div>
              <div className="flex items-center gap-2">
                {c.status !== 'running' ? (
                  <button onClick={() => onRun(c.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700 shadow">
                    <Play className="h-4 w-4" /> Run
                  </button>
                ) : (
                  <button onClick={() => onStop(c.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700 shadow">
                    <Square className="h-4 w-4" /> Stop
                  </button>
                )}
                <button onClick={() => onDelete(c.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-700 shadow">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
