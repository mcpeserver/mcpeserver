'use client';
import { useEffect, useState, useMemo } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';
import ProjectCard from './ProjectCard';
import MinecraftButton from '@/components/ui/MinecraftButton';
import ConsolePanel from './ConsolePanel';
import MetricsPanel from './MetricsPanel';
import StatusBanner from './StatusBanner';
import ProjectFilters from './ProjectFilters';
import { useMonitoring } from '@/hooks/use-monitoring';

type TabType = 'servers' | 'stores';

export default function ProjectGrid() {
  const [serverRepos, setServerRepos] = useState<any[]>([]);
  const [storeRepos, setStoreRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('servers');
  const [visibleCount, setVisibleCount] = useState(8); 
  const [command, setCommand] = useState('');

  // Menggunakan custom hook untuk logika monitoring SMART
  const { logs, tps, mem, history, addLog, processCommand } = useMonitoring();

  useEffect(() => {
    async function fetchRepos() {
      addLog('Menginisialisasi protokol pengambilan data GitHub...');
      try {
        const response = await fetch('https://api.github.com/users/mcpeserver/repos?sort=updated&per_page=100');
        const data = await response.json();
        if (Array.isArray(data)) {
          const baseFiltered = data.filter(repo => 
            !repo.fork && 
            !['Server-List', 'MyAPI', 'mcpeserver'].includes(repo.name)
          );
          setServerRepos(baseFiltered.filter(repo => !repo.name.toLowerCase().includes('store')));
          setStoreRepos(baseFiltered.filter(repo => repo.name.toLowerCase().includes('store')));
          addLog(`Koneksi stabil. Menemukan ${baseFiltered.length} modul aktif.`);
        }
      } catch (error) {
        addLog('FATAL_ERROR: Gagal sinkronisasi metadata.');
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, [addLog]);

  const filteredRepos = useMemo(() => {
    const currentRepos = activeTab === 'servers' ? serverRepos : storeRepos;
    return currentRepos.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, serverRepos, storeRepos, searchTerm]);

  const displayedRepos = useMemo(() => filteredRepos.slice(0, visibleCount), [filteredRepos, visibleCount]);
  const hasMore = visibleCount < filteredRepos.length;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    processCommand(command, filteredRepos.length);
    setCommand('');
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#38e11e]" size={40} />
        <p className="font-vt323 text-xl text-gray-500 uppercase tracking-widest">MENGHUBUNGKAN_KE_MAINFRAME...</p>
      </div>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Modular Status Banner */}
        <StatusBanner />

        {/* Modular Filters & Search */}
        <ProjectFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setVisibleCount(8);
            addLog(`NAV: Berpindah ke kategori ${tab.toUpperCase()}...`);
          }}
          count={filteredRepos.length}
        />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <MinecraftButton 
              variant="default" 
              className="w-full sm:w-auto sm:min-w-[320px] !py-6"
              onClick={() => setVisibleCount(v => v + 8)}
            >
              <ChevronDown size={18} className="mr-3" /> MUAT LEBIH BANYAK PROYEK
            </MinecraftButton>
          </div>
        )}

        {/* Monitoring & Console Dashboard */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MetricsPanel tps={tps} mem={mem} history={history} />
          <ConsolePanel 
            logs={logs} 
            command={command} 
            setCommand={setCommand} 
            handleCommand={handleCommand} 
          />
        </div>
      </div>
    </section>
  );
}
