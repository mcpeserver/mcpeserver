'use client';
import { Terminal, Shield } from 'lucide-react';
import { useEffect, useRef } from 'react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';

interface ConsolePanelProps {
  logs: string[];
  command: string;
  setCommand: (cmd: string) => void;
  handleCommand: (e: React.FormEvent) => void;
}

export default function ConsolePanel({ logs, command, setCommand, handleCommand }: ConsolePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; 
    }
  }, [logs]);

  return (
    <MinecraftPanel variant="dark" className="lg:col-span-2 border-l-[8px] border-[#b9f2ff] bg-black/40 flex flex-col h-[400px]" padding="p-0">
      {/* Console Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <Terminal className="text-[#b9f2ff]" size={16} />
          <h4 className="font-minecraft text-[8px] uppercase text-[#b9f2ff] tracking-widest">KONSOL_ARCHITECT_v2.0</h4>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-[#38e11e]" />
            <span className="font-vt323 text-[10px] text-gray-500 uppercase">ENCRYPT_ACTIVE</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#38e11e] animate-pulse" />
            <span className="font-vt323 text-[10px] text-[#38e11e] uppercase tracking-widest">SISTEM TERHUBUNG</span>
          </div>
        </div>
      </div>
      
      {/* Logs Area */}
      <div 
        ref={scrollRef}
        className="flex-1 space-y-2 font-vt323 text-lg overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#313131]"
      >
        {logs.length > 0 ? logs.map((log, i) => (
          <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300 ${i === 0 ? 'text-[#b9f2ff]' : log.includes('ERROR') ? 'text-red-400' : log.includes('WARNING') ? 'text-yellow-400' : 'text-gray-500'}`}>
            <span className="shrink-0 text-[#38e11e] opacity-50">{'>'}</span>
            <span className="break-all">{log}</span>
          </div>
        )) : (
          <div className="text-gray-700 italic font-vt323 text-xl">
            Sistem menunggu input... Ketik <span className="text-[#38e11e]">/help</span> untuk daftar perintah arsitektur.
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="relative group shrink-0 border-t border-white/5">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#38e11e] font-vt323 text-2xl group-focus-within:animate-pulse">{'>'}</span>
        <input 
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="MASUKKAN PERINTAH ARSITEKTUR..."
          className="w-full bg-black/40 p-6 pl-12 font-vt323 text-2xl text-white outline-none focus:bg-black/60 transition-all uppercase placeholder:text-gray-800"
          autoComplete="off"
        />
      </form>
    </MinecraftPanel>
  );
}