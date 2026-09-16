import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TelemetryPoint } from '../types/telemetry';

interface Props {
  data: TelemetryPoint[];
}

export const TelemetryChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Real-Time Cluster Performance</h3>
          <p className="text-xs text-slate-400">Live memory allocation (MB) & Network throughput (KB/s)</p>
        </div>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
          ● Live Stream
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
            />
            <Area type="monotone" dataKey="memoryUsage" name="Memory (MB)" stroke="#a855f7" fillOpacity={1} fill="url(#colorMemory)" />
            <Area type="monotone" dataKey="networkThroughput" name="Network (KB/s)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNetwork)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
