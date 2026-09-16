# ⚡ Real-Time Operations Dashboard (`real-time-operations-dashboard`)

[![React 18](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3_Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![WebSockets](https://img.shields.io/badge/WebSockets-Real--Time_Telemetry-010101?style=for-the-badge&logo=socketdotio)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Recharts](https://img.shields.io/badge/Recharts-Time--Series-22C55E?style=for-the-badge)](https://recharts.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_%26_Async_Tests-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> **Personal Engineering Showcase Project**  
High-frequency telemetry dashboard rendering live device & cluster metrics with automatic reconnection resilience, exponential backoff (1s -> 2s -> 4s -> 8s), virtualized log feeds, severity filters, and sliding window chart streaming.

---

## 🎯 What Recruiters & Engineering Managers Will See

- **Resilient Real-Time Architecture**: Connection state machine (`CONNECTED` | `RECONNECTING` | `DISCONNECTED`) with heartbeats and automated reconnection retries.
- **Fault-Tolerant Exponential Backoff**: Prevents server thundering herd problems during node disconnects by backing off exponentially ($2^n$ seconds).
- **High-Frequency Data Streaming**: Sliding window telemetry buffer rendering live memory & network throughput without UI thread blocking.
- **Virtualized Telemetry Log Feed**: High-performance log stream with real-time text search and log level filtering (`INFO`, `WARN`, `ERROR`).
- **Comprehensive Testing**: Vitest suite with fake timers asserting WebSocket state machine transitions and backoff logic.

---

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run Vite local dev server
npm run dev

# Run Vitest test suite
npm test

# Typecheck TypeScript codebase
npm run typecheck
```

---

## 🧪 Automated Verification Results

```text
 ✓ tests/telemetry.test.tsx (3 tests)

 Test Files  1 passed (1)
      Tests  3 passed (3)
```
