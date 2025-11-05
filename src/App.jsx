import React, { useEffect, useMemo, useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import MetricsOverview from './components/MetricsOverview';
import ContainerForm from './components/ContainerForm';
import ContainersTable from './components/ContainersTable';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function App() {
  const [containers, setContainers] = useState(() => [
    {
      id: crypto.randomUUID(),
      name: 'web-frontend',
      image: 'node:20-alpine',
      status: 'running',
      cpu: 18,
      ramLimit: 1.5,
      ramUsed: 0.6,
      diskLimit: 8,
      diskUsed: 2.1,
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      name: 'api-server',
      image: 'python:3.11-slim',
      status: 'stopped',
      cpu: 0,
      ramLimit: 2,
      ramUsed: 0.0,
      diskLimit: 10,
      diskUsed: 3.2,
      createdAt: Date.now(),
    },
  ]);

  // Simulate live metrics updates for running containers
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers((prev) =>
        prev.map((c) => {
          if (c.status !== 'running') return { ...c, cpu: 0, ramUsed: Math.max(0, Math.min(c.ramLimit, c.ramUsed * 0.98)) };
          const newCpu = Math.min(100, Math.max(3, c.cpu + randomBetween(-8, 10)));
          const ramDrift = randomBetween(-0.05, 0.08);
          const newRam = Math.min(c.ramLimit, Math.max(0.1, c.ramUsed + ramDrift));
          const diskDrift = randomBetween(0, 0.05);
          const newDisk = Math.min(c.diskLimit, c.diskUsed + diskDrift);
          return { ...c, cpu: newCpu, ramUsed: newRam, diskUsed: newDisk };
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const totals = useMemo(() => {
    const running = containers.filter((c) => c.status === 'running');
    const cpuPercent = running.length
      ? running.reduce((acc, c) => acc + c.cpu, 0) / running.length
      : 0;
    const ramUsedGb = containers.reduce((acc, c) => acc + c.ramUsed, 0);
    const ramTotalGb = containers.reduce((acc, c) => acc + c.ramLimit, 0);
    const diskUsedGb = containers.reduce((acc, c) => acc + c.diskUsed, 0);
    const diskTotalGb = containers.reduce((acc, c) => acc + c.diskLimit, 0);
    return { cpuPercent, ramUsedGb, ramTotalGb, diskUsedGb, diskTotalGb };
  }, [containers]);

  const runningCount = containers.filter((c) => c.status === 'running').length;

  const createContainer = ({ name, image, cpuLimit, ramLimit, diskLimit }) => {
    setContainers((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        image,
        status: 'stopped',
        cpu: 0,
        ramLimit: ramLimit || 1,
        ramUsed: 0,
        diskLimit: diskLimit || 10,
        diskUsed: Math.max(0.2, randomBetween(0.2, 0.8)),
        createdAt: Date.now(),
        cpuLimit: cpuLimit || 100,
      },
      ...prev,
    ]);
  };

  const runContainer = (id) => {
    setContainers((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'running', cpu: randomBetween(5, 20), ramUsed: Math.max(0.2, c.ramUsed) } : c)));
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
        <MetricsOverview totals={totals} />
        <ContainerForm onCreate={createContainer} />
        <ContainersTable
          containers={containers}
          onRun={runContainer}
          onStop={stopContainer}
          onDelete={deleteContainer}
        />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">Built with love for infrastructure enthusiasts</footer>
    </div>
  );
}
