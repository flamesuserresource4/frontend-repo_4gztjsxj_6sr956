import React, { useEffect, useMemo, useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import MetricsOverview from './components/MetricsOverview';
import ContainersGrid from './components/ContainersGrid';
import NewContainerForm from './components/NewContainerForm';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const STORAGE_KEY = 'containers';

export default function App() {
  const [page, setPage] = useState(() => (window.location.hash === '#/create' ? 'create' : 'containers'));
  const [containers, setContainers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [
      {
        id: crypto.randomUUID(),
        name: 'web-frontend',
        description: 'Static site served by Node',
        image: 'node:20-alpine',
        status: 'running',
        cpu: 18,
        cores: 1,
        ramLimit: 1.5,
        ramUsed: 0.6,
        diskLimit: 8,
        diskUsed: 2.1,
        projectFiles: ['index.html', 'package.json'],
        buildCommand: 'npm ci',
        runCommand: 'npm run start',
        createdAt: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: 'api-server',
        description: 'Python FastAPI service',
        image: 'python:3.11-slim',
        status: 'stopped',
        cpu: 0,
        cores: 2,
        ramLimit: 2,
        ramUsed: 0.0,
        diskLimit: 10,
        diskUsed: 3.2,
        projectFiles: ['main.py', 'requirements.txt'],
        buildCommand: 'pip install -r requirements.txt',
        runCommand: 'uvicorn main:app',
        createdAt: Date.now(),
      },
    ];
  });

  // Persist containers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(containers));
  }, [containers]);

  // Hash-based routing without external deps
  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === '#/create' ? 'create' : 'containers');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Simulate live metrics updates for running containers
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers((prev) =>
        prev.map((c) => {
          if (c.status !== 'running') return { ...c, cpu: 0, ramUsed: Math.max(0, Math.min(c.ramLimit, (c.ramUsed || 0) * 0.98)) };
          const newCpu = Math.min(100, Math.max(3, (c.cpu || 0) + randomBetween(-8, 10)));
          const ramDrift = randomBetween(-0.05, 0.08);
          const newRam = Math.min(c.ramLimit, Math.max(0.1, (c.ramUsed || 0.1) + ramDrift));
          const diskDrift = randomBetween(0, 0.05);
          const newDisk = Math.min(c.diskLimit, (c.diskUsed || 0) + diskDrift);
          return { ...c, cpu: newCpu, ramUsed: newRam, diskUsed: newDisk };
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const totals = useMemo(() => {
    const running = containers.filter((c) => c.status === 'running');
    const cpuPercent = running.length ? running.reduce((acc, c) => acc + (c.cpu || 0), 0) / running.length : 0;
    const ramUsedGb = containers.reduce((acc, c) => acc + (c.ramUsed || 0), 0);
    const ramTotalGb = containers.reduce((acc, c) => acc + (c.ramLimit || 0), 0);
    const diskUsedGb = containers.reduce((acc, c) => acc + (c.diskUsed || 0), 0);
    const diskTotalGb = containers.reduce((acc, c) => acc + (c.diskLimit || 0), 0);
    return { cpuPercent, ramUsedGb, ramTotalGb, diskUsedGb, diskTotalGb };
  }, [containers]);

  const runningCount = containers.filter((c) => c.status === 'running').length;

  const navigate = (to) => {
    window.location.hash = to === 'create' ? '#/create' : '#/containers';
  };

  const createContainer = ({ name, description, image, cores, ramLimit, diskLimit, projectFiles, buildCommand, runCommand }) => {
    setContainers((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        description,
        image,
        status: 'stopped',
        cpu: 0,
        cores: cores || 1,
        ramLimit: ramLimit || 1,
        ramUsed: 0,
        diskLimit: diskLimit || 10,
        diskUsed: Math.max(0.2, randomBetween(0.2, 0.8)),
        projectFiles: projectFiles || [],
        buildCommand: buildCommand || '',
        runCommand: runCommand || '',
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    navigate('containers');
  };

  const runContainer = (id) => {
    setContainers((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'running', cpu: randomBetween(5, 20), ramUsed: Math.max(0.2, c.ramUsed || 0.2) } : c)));
  };
  const stopContainer = (id) => {
    setContainers((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'stopped', cpu: 0 } : c)));
  };
  const deleteContainer = (id) => {
    setContainers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <DashboardHeader totalContainers={containers.length} runningCount={runningCount} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {page === 'containers' && (
          <>
            <MetricsOverview totals={totals} />
            <ContainersGrid
              containers={containers}
              onRun={runContainer}
              onStop={stopContainer}
              onDelete={deleteContainer}
              onCreateClick={() => navigate('create')}
            />
          </>
        )}
        {page === 'create' && (
          <NewContainerForm
            onBack={() => navigate('containers')}
            onSubmit={createContainer}
          />
        )}
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">Built with love for infrastructure enthusiasts</footer>
    </div>
  );
}
