import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { TelemetryStreamService } from '../src/services/telemetryStream';
import { App } from '../src/App';
import React from 'react';

// Mock Recharts ResponsiveContainer to avoid SVG sizing errors in JSDOM
vi.mock('recharts', async () => {
  const original = await vi.importActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 300 }}>{children}</div>
    ),
  };
});

describe('Real-Time Telemetry Dashboard Suite', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('TelemetryStreamService transitions connection states and emits data', () => {
    const service = new TelemetryStreamService();
    const statusFn = vi.fn();
    const telemetryFn = vi.fn();

    service.onStatus(statusFn);
    service.onTelemetry(telemetryFn);

    service.connect();
    expect(statusFn).toHaveBeenCalledWith('CONNECTED', 0);

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(telemetryFn).toHaveBeenCalled();
    service.disconnect();
  });

  it('Simulates network drop and triggers exponential backoff reconnection attempt', () => {
    const service = new TelemetryStreamService();
    const statusFn = vi.fn();

    service.onStatus(statusFn);
    service.connect();

    act(() => {
      service.simulateDropAndReconnect();
    });

    expect(statusFn).toHaveBeenLastCalledWith('RECONNECTING', 1);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(statusFn).toHaveBeenLastCalledWith('CONNECTED', 0);
    service.disconnect();
  });

  it('App dashboard renders connection status badge and metrics cards', () => {
    render(<App />);

    expect(screen.getByText('⚡ Real-Time Operations Dashboard')).toBeInTheDocument();
    expect(screen.getByText('WebSocket Connected')).toBeInTheDocument();
    expect(screen.getByText('CPU Utilization')).toBeInTheDocument();
    expect(screen.getByText('Cluster Memory')).toBeInTheDocument();
  });
});
