'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook khusus untuk menangani logika Sistem Monitoring Arsitektur Real-Time (SMART).
 * Memisahkan logika simulasi metrik dan sistem perintah dari UI.
 */
export function useMonitoring() {
  const [logs, setLogs] = useState<string[]>([]);
  const [tps, setTps] = useState(20.0);
  const [mem, setMem] = useState(128);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(20));
  const [isStressTesting, setIsStressTesting] = useState(false);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 20));
  }, []);

  // Simulasi Metrik Berkelanjutan
  useEffect(() => {
    const interval = setInterval(() => {
      let nextTps;
      let nextMem;

      if (isStressTesting) {
        nextTps = parseFloat((14.5 + Math.random() * 3.5).toFixed(2));
        nextMem = Math.floor(380 + Math.random() * 80);
      } else {
        nextTps = parseFloat((19.85 + Math.random() * 0.15).toFixed(2));
        nextMem = Math.floor(115 + Math.random() * 45);
      }

      setTps(nextTps);
      setMem(nextMem);
      setHistory(prev => [...prev.slice(1), nextTps]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isStressTesting]);

  const processCommand = (command: string, filteredCount: number) => {
    const cmd = command.toLowerCase().trim();
    addLog(`USER_CMD: ${cmd}`);

    switch (cmd) {
      case '/help':
        addLog('PERINTAH: /status, /stress-test, /optimize, /scan, /flush-cache, /clear');
        break;
      case '/stress-test':
        setIsStressTesting(true);
        addLog('WARNING: Memulai Stress Test... Simulasi 10,000 req/sec.');
        break;
      case '/optimize':
        setIsStressTesting(false);
        addLog('INFO: Menjalankan protokol optimasi arsitektur...');
        addLog('INFO: Membersihkan cache Edge. Memulihkan TPS...');
        break;
      case '/scan':
        addLog(`INFO: Memulai audit pada ${filteredCount} modul...`);
        setTimeout(() => addLog('AUDIT: Semua modul memenuhi standar arsitektur.'), 1500);
        break;
      case '/clear':
        setLogs([]);
        break;
      case '/status':
        addLog(`STATUS: TPS: ${tps} | RAM: ${mem}MB | MODE: ${isStressTesting ? 'STRESS' : 'NORMAL'}`);
        break;
      case '/flush-cache':
        // Logika penghapusan cache dilakukan di ProjectGrid.tsx
        addLog('INFO: Menghapus cache lokal dan memulai sinkronisasi paksa...');
        break;
      default:
        addLog(`ERROR: Perintah '${cmd}' tidak dikenal. Ketik /help.`);
    }
  };

  return {
    logs,
    tps,
    mem,
    history,
    isStressTesting,
    addLog,
    processCommand,
    setLogs
  };
}