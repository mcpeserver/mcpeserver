'use client';
import { ShieldCheck, Zap, Globe } from 'lucide-react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';

/**
 * Komponen banner status global untuk menampilkan kesehatan infrastruktur secara ringkas.
 */
export default function StatusBanner() {
  return (
    <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatusMetric icon={<ShieldCheck size={16} />} label="STABILITAS" value="99.9%" color="text-[#38e11e]" />
      <StatusMetric icon={<Zap size={16} />} label="AVG_LOAD" value="42MS" color="text-[#b9f2ff]" />
      <StatusMetric icon={<Globe size={16} />} label="REGION" value="ASIA/GLOBAL" color="text-white" />
    </div>
  );
}

function StatusMetric({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <MinecraftPanel variant="dark" padding="p-4" className="flex items-center justify-between border-gray-800">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="font-vt323 text-sm text-gray-500 uppercase">{label}</span>
      </div>
      <span className={`font-minecraft text-[10px] ${color}`}>{value}</span>
    </MinecraftPanel>
  );
}
