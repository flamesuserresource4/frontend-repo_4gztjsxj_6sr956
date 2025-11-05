import React from 'react';
import { Play, Square, Trash2 } from 'lucide-react';

function UsageBar({ percent, color = 'bg-indigo-600' }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="h-2 w-full rounded-full bg-gray-100">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${clamped}%` }} />
    </div>
  );
}

export default function ContainersTable({ containers, onRun, onStop, onDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Your Containers</h3>
        <p className="text-sm text-gray-500">{containers.length} total</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Name</th>
              <th className="px-5 py-3 text-left font-medium">Image</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium w-48">CPU</th>
              <th className="px-5 py-3 text-left font-medium w-48">Memory</th>
              <th className="px-5 py-3 text-left font-medium w-48">Disk</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((c) => (
              <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50/40">
                <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-5 py-3 text-gray-600">{c.image}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                    c.status === 'running'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-gray-50 text-gray-700 ring-1 ring-gray-200'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${c.status === 'running' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <UsageBar percent={c.cpu} color="bg-rose-600" />
                    <span className="w-12 text-right tabular-nums text-gray-700">{c.cpu.toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <UsageBar percent={(c.ramUsed / c.ramLimit) * 100} color="bg-indigo-600" />
                    <span className="w-28 text-right tabular-nums text-gray-700">{c.ramUsed.toFixed(2)} / {c.ramLimit.toFixed(2)} GB</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <UsageBar percent={(c.diskUsed / c.diskLimit) * 100} color="bg-emerald-600" />
                    <span className="w-28 text-right tabular-nums text-gray-700">{c.diskUsed.toFixed(1)} / {c.diskLimit.toFixed(1)} GB</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {c.status !== 'running' ? (
                      <button
                        onClick={() => onRun(c.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700 shadow"
                      >
                        <Play className="h-4 w-4" /> Run
                      </button>
                    ) : (
                      <button
                        onClick={() => onStop(c.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700 shadow"
                      >
                        <Square className="h-4 w-4" /> Stop
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(c.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-700 shadow"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {containers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-500">No containers yet. Create one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
