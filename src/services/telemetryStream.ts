import { ConnectionStatus, TelemetryPoint, LogEntry, LogLevel } from '../types/telemetry';

type TelemetryListener = (point: TelemetryPoint) => void;
type LogListener = (log: LogEntry) => void;
type StatusListener = (status: ConnectionStatus, retryCount: number) => void;

export class TelemetryStreamService {
  private status: ConnectionStatus = 'DISCONNECTED';
  private retryCount = 0;
  private maxRetries = 5;
  private timer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private telemetryListeners: Set<TelemetryListener> = new Set();
  private logListeners: Set<LogListener> = new Set();
  private statusListeners: Set<StatusListener> = new Set();

  private sources = ['cluster-gateway-1', 'auth-service', 'payment-worker-2', 'metrics-collector', 'db-replica-3'];
  private sampleMessages = [
    { level: 'INFO' as LogLevel, msg: 'Health check OK on node cluster' },
    { level: 'INFO' as LogLevel, msg: 'Processed high-throughput telemetry frame' },
    { level: 'WARN' as LogLevel, msg: 'Memory usage exceeded 75% threshold' },
    { level: 'WARN' as LogLevel, msg: 'WebSocket heart-beat latency spike detected' },
    { level: 'ERROR' as LogLevel, msg: 'Transient connection timeout on worker-node-4' },
  ];

  public connect() {
    if (this.status === 'CONNECTED') return;

    this.setStatus('CONNECTED', 0);
    this.startStreaming();
  }

  public disconnect() {
    this.stopStreaming();
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.setStatus('DISCONNECTED', 0);
  }

  public simulateDropAndReconnect() {
    this.stopStreaming();
    this.setStatus('RECONNECTING', ++this.retryCount);

    const backoffMs = Math.min(1000 * Math.pow(2, this.retryCount - 1), 8000);

    this.reconnectTimer = setTimeout(() => {
      if (this.retryCount >= this.maxRetries) {
        this.setStatus('DISCONNECTED', this.retryCount);
      } else {
        this.setStatus('CONNECTED', 0);
        this.startStreaming();
      }
    }, backoffMs);
  }

  private startStreaming() {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      if (this.status !== 'CONNECTED') return;

      const now = new Date();
      const timeLabel = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const point: TelemetryPoint = {
        timestamp: now.toISOString(),
        timeLabel,
        cpuUsage: Math.floor(35 + Math.random() * 45),
        memoryUsage: Math.floor(4200 + Math.random() * 800),
        networkThroughput: Math.floor(1200 + Math.random() * 600),
        activeNodes: 12,
        latencyMs: Math.floor(12 + Math.random() * 25),
      };

      this.telemetryListeners.forEach((fn) => fn(point));

      // Randomly emit logs
      if (Math.random() > 0.4) {
        const sample = this.sampleMessages[Math.floor(Math.random() * this.sampleMessages.length)]!;
        const source = this.sources[Math.floor(Math.random() * this.sources.length)]!;
        const log: LogEntry = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: timeLabel,
          level: sample.level,
          source,
          message: sample.msg,
        };
        this.logListeners.forEach((fn) => fn(log));
      }
    }, 1000);
  }

  private stopStreaming() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private setStatus(newStatus: ConnectionStatus, retries: number) {
    this.status = newStatus;
    this.retryCount = retries;
    this.statusListeners.forEach((fn) => fn(newStatus, retries));
  }

  public onTelemetry(fn: TelemetryListener) {
    this.telemetryListeners.add(fn);
    return () => this.telemetryListeners.delete(fn);
  }

  public onLog(fn: LogListener) {
    this.logListeners.add(fn);
    return () => this.logListeners.delete(fn);
  }

  public onStatus(fn: StatusListener) {
    this.statusListeners.add(fn);
    return () => this.statusListeners.delete(fn);
  }
}
