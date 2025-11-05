import React, { useMemo, useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

const IMAGE_PRESETS = [
  { label: 'Ubuntu 22.04', value: 'ubuntu:22.04' },
  { label: 'Node.js 20', value: 'node:20-alpine' },
  { label: 'Python 3.11', value: 'python:3.11-slim' },
  { label: 'PostgreSQL 16', value: 'postgres:16' },
];

export default function NewContainerForm({ onBack, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(IMAGE_PRESETS[0].value);
  const [cores, setCores] = useState(1);
  const [ram, setRam] = useState(2);
  const [disk, setDisk] = useState(10);
  const [buildCommand, setBuildCommand] = useState('');
  const [runCommand, setRunCommand] = useState('');
  const [files, setFiles] = useState([]);

  const fileNames = useMemo(() => Array.from(files).map(f => f.name), [files]);

  const handleFileChange = (e) => {
    setFiles(e.target.files || []);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      image,
      cores: Math.max(1, Number(cores) || 1),
      ramLimit: Math.max(0.25, Number(ram) || 1),
      diskLimit: Math.max(1, Number(disk) || 10),
      buildCommand: buildCommand.trim(),
      runCommand: runCommand.trim(),
      projectFiles: fileNames,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" /> Back to containers
        </button>
        <h2 className="text-xl font-semibold">Create a new container</h2>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">General</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. my-app" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <select value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {IMAGE_PRESETS.map((img) => (
                    <option key={img.value} value={img.value}>{img.label} ({img.value})</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this container do?" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">Resources</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cores</label>
                <input type="number" min={1} max={32} value={cores} onChange={(e) => setCores(parseInt(e.target.value) || 1)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Memory (GB)</label>
                <input type="number" min={0.25} step={0.25} value={ram} onChange={(e) => setRam(parseFloat(e.target.value) || 0.25)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Disk (GB)</label>
                <input type="number" min={1} step={1} value={disk} onChange={(e) => setDisk(parseInt(e.target.value) || 1)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">Commands</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Build command</label>
                <input value={buildCommand} onChange={(e) => setBuildCommand(e.target.value)} placeholder="e.g. npm install" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Run command</label>
                <input value={runCommand} onChange={(e) => setRunCommand(e.target.value)} placeholder="e.g. npm run start" className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">Project files</h3>
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50/50">
              <Upload className="h-4 w-4" />
              <span>Upload files</span>
              <input type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>
            {fileNames.length > 0 && (
              <ul className="mt-3 max-h-40 overflow-auto text-sm text-gray-600 list-disc pl-5 space-y-1">
                {fileNames.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onBack} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 shadow">Create container</button>
          </div>
        </div>
      </form>
    </div>
  );
}
