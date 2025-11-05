import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const IMAGE_PRESETS = [
  { label: 'Ubuntu 22.04', value: 'ubuntu:22.04' },
  { label: 'Node.js 20', value: 'node:20-alpine' },
  { label: 'Python 3.11', value: 'python:3.11-slim' },
  { label: 'PostgreSQL 16', value: 'postgres:16' },
];

export default function ContainerForm({ onCreate }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(IMAGE_PRESETS[0].value);
  const [cpuLimit, setCpuLimit] = useState(100);
  const [ramLimit, setRamLimit] = useState(2);
  const [diskLimit, setDiskLimit] = useState(10);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), image, cpuLimit, ramLimit, diskLimit });
    setName('');
    setImage(IMAGE_PRESETS[0].value);
    setCpuLimit(100);
    setRamLimit(2);
    setDiskLimit(10);
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Container name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. my-api"
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <select
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {IMAGE_PRESETS.map((img) => (
                <option key={img.value} value={img.value}>{img.label} ({img.value})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPU limit</label>
            <div className="mt-1 relative">
              <input
                type="number"
                min={10}
                max={400}
                value={cpuLimit}
                onChange={(e) => setCpuLimit(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Memory</label>
            <div className="mt-1 relative">
              <input
                type="number"
                min={0.25}
                step={0.25}
                value={ramLimit}
                onChange={(e) => setRamLimit(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">GB</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Disk</label>
            <div className="mt-1 relative">
              <input
                type="number"
                min={1}
                step={1}
                value={diskLimit}
                onChange={(e) => setDiskLimit(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">GB</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white shadow hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>
    </form>
  );
}
