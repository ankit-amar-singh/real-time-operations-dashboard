export type ConnectionStatus = 'CONNECTED' | 'RECONNECTING' | 'DISCONNECTED';

export interface TelemetryPoint {
  timestamp: string;
  timeLabel: string;
  cpuUsage: number; // 0 - 100%
  memoryUsage: number; // MB
  networkThroughput: number; // KB/s
  activeNodes: number;
  latencyMs: number;
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
}
