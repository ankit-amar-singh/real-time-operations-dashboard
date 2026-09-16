import React, { useState } from 'react';
import { LogEntry, LogLevel } from '../types/telemetry';

interface Props {
  logs: LogEntry[];
  onClear: () => void;
}

export const LiveLogFeed: React.FC<Props> = ({ logs, onClear }) => {
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesSearch =
      searchTerm === '' ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const levelBadge = {
    INFO: 'bg-blue-950 text-blue-400 border-blue-800',
    WARN: 'bg-amber-950 text-amber-400 border-amber-800',
    ERROR: 'bg-red-950 text-red-400 border-red-800',
  };

  return (
    <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 shadow-md flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Live Telemetry Log Stream</h3>
          <p className="text-xs text-slate-400">High-frequency system events & audit stream</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 text-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[36px]"
          />
          <button
            type="button"
            onClick={onClear}
            className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-colors min-h-[36px]"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {(['ALL', 'INFO', 'WARN', 'ERROR'] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setFilterLevel(lvl)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors min-h-[36px] ${
              filterLevel === lvl
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto max-h-80 space-y-2 pr-1 font-mono text-xs">
        {filteredLogs.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No telemetry logs matching filter.</div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="p-2.5 bg-slate-950 rounded border border-slate-800/80 flex items-start justify-between gap-2 hover:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[10px] whitespace-nowrap">{log.timestamp}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${levelBadge[log.level]}`}>
                  {log.level}
                </span>
                <span className="text-slate-400 font-semibold">{log.source}:</span>
                <span className="text-slate-200">{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
