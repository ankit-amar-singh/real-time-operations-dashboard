import { useState, useEffect, useRef } from 'react';
import { TelemetryStreamService } from '../services/telemetryStream';
import { ConnectionStatus, TelemetryPoint, LogEntry } from '../types/telemetry';

export function useTelemetry(bufferSize = 20, maxLogs = 100) {
  const serviceRef = useRef<TelemetryStreamService | null>(null);

  if (!serviceRef.current) {
    serviceRef.current = new TelemetryStreamService();
  }

  const [status, setStatus] = useState<ConnectionStatus>('DISCONNECTED');
  const [retryCount, setRetryCount] = useState(0);
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>([]);
  const [latestPoint, setLatestPoint] = useState<TelemetryPoint | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const service = serviceRef.current!;

    const unsubStatus = service.onStatus((newStatus, retries) => {
      setStatus(newStatus);
      setRetryCount(retries);
    });

    const unsubTelemetry = service.onTelemetry((point) => {
      setLatestPoint(point);
      setTelemetryHistory((prev) => {
        const updated = [...prev, point];
        return updated.slice(-bufferSize);
      });
    });

    const unsubLog = service.onLog((log) => {
      setLogs((prev) => [log, ...prev].slice(0, maxLogs));
    });

    service.connect();

    return () => {
      unsubStatus();
      unsubTelemetry();
      unsubLog();
      service.disconnect();
    };
  }, [bufferSize, maxLogs]);

  const simulateDisconnect = () => {
    serviceRef.current?.simulateDropAndReconnect();
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    status,
    retryCount,
    telemetryHistory,
    latestPoint,
    logs,
    simulateDisconnect,
    clearLogs,
  };
}
