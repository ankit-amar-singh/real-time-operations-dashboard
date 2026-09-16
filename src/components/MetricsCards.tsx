import React from 'react';
import { TelemetryPoint } from '../types/telemetry';

interface Props {
  latestPoint: TelemetryPoint | null;
}

export const MetricsCards: React.FC<Props> = ({ latestPoint }) => {
  const cpu = latestPoint ? latestPoint.cpuUsage : 0;
  const memory = latestPoint ? (latestPoint.memoryUsage / 1024).toFixed(2) : '0.00';
  const network = latestPoint ? latestPoint.networkThroughput : 0;
  const nodes = latestPoint ? latestPoint.activeNodes : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CPU Utilization</span>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">{cpu}%</span>
          <span className="text-xs text-emerald-400 font-medium">Normal</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${cpu}%` }}></div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cluster Memory</span>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">{memory} GB</span>
          <span className="text-xs text-slate-400 font-medium">of 8.00 GB</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(parseFloat(memory) / 8) * 100}%` }}></div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Network Ingest</span>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">{network} KB/s</span>
          <span className="text-xs text-emerald-400 font-medium">High Bandwidth</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((network / 2000) * 100, 100)}%` }}></div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Healthy Nodes</span>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">{nodes} / 12</span>
          <span className="text-xs text-emerald-400 font-medium">100% Online</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-emerald-400 h-2 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};
