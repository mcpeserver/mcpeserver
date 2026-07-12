'use client';
import { Search, Terminal, LayoutGrid, ShoppingBag } from 'lucide-react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';
import MinecraftButton from '@/components/ui/MinecraftButton';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeTab: 'servers' | 'stores';
  setActiveTab: (tab: 'servers' | 'stores') => void;
  count: number;
}

/**
 * Komponen modular untuk kontrol pencarian dan filter kategori proyek.
 */
export default function ProjectFilters({ searchTerm, setSearchTerm, activeTab, setActiveTab, count }: ProjectFiltersProps) {
  return (
    <div className="mb-10 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <MinecraftPanel variant="dark" padding="px-4 py-3" className="flex items-center gap-3 shrink-0">
            <Terminal size={16} className="text-[#38e11e]" /> 
            <span className="font-vt323 text-lg text-[#38e11e] uppercase">
              MODUL_AKTIF: {count}
            </span>
          </MinecraftPanel>

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
            <input 
              type="text"
              placeholder="CARI MODUL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border-b-2 border-white/5 focus:border-[#38e11e] p-4 pl-12 font-vt323 text-xl text-white outline-none transition-all uppercase placeholder:text-gray-800"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <MinecraftButton 
            variant={activeTab === 'servers' ? 'success' : 'default'}
            className="flex-1 !py-5 !min-w-0 sm:!min-w-[160px]"
            onClick={() => setActiveTab('servers')}
          >
            <LayoutGrid size={16} className="sm:mr-2" /> <span className="hidden sm:inline">SERVER</span>
          </MinecraftButton>
          <MinecraftButton 
            variant={activeTab === 'stores' ? 'success' : 'default'}
            className="flex-1 !py-5 !min-w-0 sm:!min-w-[160px]"
            onClick={() => setActiveTab('stores')}
          >
            <ShoppingBag size={16} className="sm:mr-2" /> <span className="hidden sm:inline">TOKO WEB</span>
          </MinecraftButton>
        </div>
      </div>
    </div>
  );
}
