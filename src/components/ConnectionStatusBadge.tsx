import React from 'react';
import { ConnectionStatus } from '../types/telemetry';

interface Props {
  status: ConnectionStatus;
  retryCount: number;
  latencyMs?: number;
  onSimulateDrop: () => void;
}

export const ConnectionStatusBadge: React.FC<Props> = ({ status, retryCount, latencyMs = 18, onSimulateDrop }) => {
  const badgeConfig = {
    CONNECTED: { color: 'bg-emerald-500', text: 'WebSocket Connected', border: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
    RECONNECTING: { color: 'bg-amber-500 animate-ping', text: `Reconnecting (Attempt #${retryCount})...`, border: 'border-amber-200 bg-amber-50 text-amber-900' },
    DISCONNECTED: { color: 'bg-red-500', text: 'Disconnected', border: 'border-red-200 bg-red-50 text-red-900' },
  };

  const config = badgeConfig[status];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${config.color}`}></span>
        </span>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Telemetry Connection</span>
          <span className="text-sm font-bold flex items-center gap-2">
            {config.text}
            {status === 'CONNECTED' && <span className="text-xs font-normal text-slate-400">({latencyMs} ms)</span>}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSimulateDrop}
        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ⚡ Simulate Connection Drop & Backoff
      </button>
    </div>
  );
};
