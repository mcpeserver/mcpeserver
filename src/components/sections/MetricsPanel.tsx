'use client';
import { Activity, Cpu, Database, Wifi, TrendingUp } from 'lucide-react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';
import { useEffect, useState } from 'react';

interface MetricsPanelProps {
  tps: number;
  mem: number;
  history: number[];
}

export default function MetricsPanel({ tps, mem, history }: MetricsPanelProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <MinecraftPanel variant="dark" className="border-l-[8px] border-[#38e11e] h-full flex flex-col" padding="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="text-[#38e11e]" size={18} />
            <h4 className="font-minecraft text-[8px] uppercase text-white">STATISTIK_LANGSUNG</h4>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={12} className="text-gray-600" />
            <span className="font-vt323 text-[10px] text-gray-600 uppercase">REAL_TIME_FEED</span>
          </div>
        </div>
        
        <div className="space-y-6 flex-1">
          {/* TPS Trend Chart (Mini) */}
          <div className="bg-black/40 p-3 mc-pixel-border border-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="font-vt323 text-[10px] text-gray-500 uppercase">TREN_PERFORMA_TPS</span>
              <span className={`font-vt323 text-sm ${tps > 19.5 ? 'text-[#38e11e]' : 'text-yellow-500'}`}>{tps}</span>
            </div>
            <div className="h-12 w-full flex items-end gap-[2px]">
              {history.map((val, i) => (
                <div 
                  key={i} 
                  className={`flex-1 transition-all duration-500 ${val > 19.5 ? 'bg-[#38e11e]/40' : 'bg-yellow-500/40'}`}
                  style={{ height: `${(val / 20) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* CPU / TPS Bar */}
            <div>
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-gray-500" />
                  <span className="font-vt323 text-lg text-gray-400 uppercase">SERVER TPS</span>
                </div>
              </div>
              <div className="h-1 bg-black/40 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${tps > 19.5 ? 'bg-[#38e11e]' : 'bg-yellow-400'}`}
                  style={{ width: `${(tps / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* Memory Metric */}
            <div>
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-gray-500" />
                  <span className="font-vt323 text-lg text-gray-400 uppercase">RAM_ALLOC</span>
                </div>
                <span className="font-vt323 text-xl text-[#b9f2ff]">{mem}MB</span>
              </div>
              <div className="h-1 bg-black/40 overflow-hidden">
                <div 
                  className="h-full bg-[#b9f2ff] transition-all duration-1000" 
                  style={{ width: `${(mem / 512) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi size={14} className="text-gray-500" />
              <span className="font-vt323 text-lg text-gray-500 uppercase">LATENCY</span>
            </div>
            <span className="font-vt323 text-xl text-[#38e11e]">24MS</span>
          </div>
        </div>
      </MinecraftPanel>
    </div>
  );
}