import React from 'react';
import { useTelemetry } from './hooks/useTelemetry';
import { ConnectionStatusBadge } from './components/ConnectionStatusBadge';
import { MetricsCards } from './components/MetricsCards';
import { TelemetryChart } from './components/TelemetryChart';
import { LiveLogFeed } from './components/LiveLogFeed';

export const App: React.FC = () => {
  const { status, retryCount, telemetryHistory, latestPoint, logs, simulateDisconnect, clearLogs } = useTelemetry();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              ⚡ Real-Time Operations Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              High-frequency WebSocket telemetry, automatic reconnection resilience & live log virtualized feed.
            </p>
          </div>
        </header>

        <ConnectionStatusBadge
          status={status}
          retryCount={retryCount}
          latencyMs={latestPoint?.latencyMs}
          onSimulateDrop={simulateDisconnect}
        />

        <MetricsCards latestPoint={latestPoint} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TelemetryChart data={telemetryHistory} />
          <LiveLogFeed logs={logs} onClear={clearLogs} />
        </div>
      </div>
    </div>
  );
};
