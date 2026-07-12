'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Loader2, ChevronDown, RefreshCcw } from 'lucide-react';
import ProjectCard from './ProjectCard';
import MinecraftButton from '@/components/ui/MinecraftButton';
import ConsolePanel from './ConsolePanel';
import MetricsPanel from './MetricsPanel';
import StatusBanner from './StatusBanner';
import ProjectFilters from './ProjectFilters';
import { useMonitoring } from '@/hooks/use-monitoring';

type TabType = 'servers' | 'stores';

const CACHE_KEY = 'mcpe_repos_cache';
const CACHE_TIME = 30 * 60 * 1000; // 30 Menit dalam Milidetik

export default function ProjectGrid() {
  const [allRepos, setAllRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('servers');
  const [visibleCount, setVisibleCount] = useState(8); 
  const [command, setCommand] = useState('');

  const { logs, tps, mem, history, addLog, processCommand } = useMonitoring();

  const fetchRepos = useCallback(async (force = false) => {
    setLoading(true);
    addLog(force ? 'MENJALANKAN SINKRONISASI PAKSA...' : 'MENGHUBUNGKAN KE MAINFRAME MCPESERVER...');

    // 1. Cek Cache LocalStorage
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached && !force) {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_TIME;
      
      if (!isExpired) {
        setAllRepos(data);
        setLoading(false);
        addLog(`MEMUAT ${data.length} MODUL DARI MEMORI LOKAL (CACHE AKTIF).`);
        return;
      }
      addLog('CACHE KADALUWARSA. MENYEGARKAN DATA DARI MAINFRAME...');
    }
    
    // 2. Jalur API Ganda (Org & User Fallback)
    const endpoints = [
      'https://api.github.com/orgs/mcpeserver/repos?sort=updated&per_page=100',
      'https://api.github.com/users/mcpeserver/repos?sort=updated&per_page=100'
    ];

    let finalData: any[] = [];
    let fetchError = '';

    try {
      for (const url of endpoints) {
        try {
          const response = await fetch(url, {
            headers: { 
              'Accept': 'application/vnd.github.v3+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
          
          if (response.status === 403) {
            fetchError = 'BATAS_AKSES_API_TERCAPAI. MENUNGGU RESET...';
            continue;
          }

          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              finalData = data;
              break; 
            }
          }
        } catch (e) {
          continue;
        }
      }

      if (finalData.length > 0) {
        // Filter repositori yang valid
        const filtered = finalData.filter(repo => 
          !repo.fork && 
          !['.github', 'mcpeserver', 'MyAPI'].includes(repo.name)
        );
        
        // Simpan ke Cache dengan Timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: filtered,
          timestamp: Date.now()
        }));

        setAllRepos(filtered);
        addLog(`SINKRONISASI BERHASIL: ${filtered.length} MODUL TERSIMPAN KE CACHE.`);
      } else {
        addLog(`WARNING: ${fetchError || 'KONEKSI_MAINFRAME_TERPUTUS'}`);
        // Gunakan cache lama jika API gagal meskipun sudah expired
        if (cached) {
          const { data } = JSON.parse(cached);
          setAllRepos(data);
          addLog('MENGGUNAKAN DATA CACHE TERAKHIR SEBAGAI CADANGAN DARURAT.');
        }
      }
    } catch (error: any) {
      addLog(`FATAL_ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const filteredRepos = useMemo(() => {
    return allRepos.filter(repo => {
      const name = repo.name.toLowerCase();
      const desc = (repo.description || '').toLowerCase();
      // Logika deteksi toko
      const isStore = name.includes('store') || desc.includes('toko') || desc.includes('shop') || name.includes('toko');
      
      const matchesTab = activeTab === 'stores' ? isStore : !isStore;
      const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [allRepos, activeTab, searchTerm]);

  const displayedRepos = useMemo(() => filteredRepos.slice(0, visibleCount), [filteredRepos, visibleCount]);
  const hasMore = visibleCount < filteredRepos.length;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    // Khusus perintah sinkronisasi
    if (command.toLowerCase() === '/flush-cache') {
      localStorage.removeItem(CACHE_KEY);
      fetchRepos(true);
      setCommand('');
      return;
    }

    processCommand(command, filteredRepos.length);
    setCommand('');
  };

  if (loading && allRepos.length === 0) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-[#38e11e]" size={48} />
        <p className="font-vt323 text-2xl text-gray-500 uppercase tracking-widest animate-pulse">
          MENGHUBUNGKAN KE MAINFRAME...
        </p>
      </div>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <StatusBanner />

        <div className="flex justify-end mb-4">
          <button 
            onClick={() => fetchRepos(true)}
            className="flex items-center gap-2 font-vt323 text-sm text-[#38e11e] hover:text-white transition-colors uppercase"
          >
            <RefreshCcw size={12} /> SINKRONISASI_MANUAL
          </button>
        </div>

        <ProjectFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setVisibleCount(8);
            addLog(`NAV: FILTER DIUBAH KE ${tab.toUpperCase()}...`);
          }}
          count={filteredRepos.length}
        />

        {filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-black/40 mc-pixel-border border-gray-900 backdrop-blur-sm">
            <p className="font-vt323 text-3xl text-gray-700 uppercase tracking-widest mb-4">
              [!] DATA_TIDAK_TERSEDIA
            </p>
            <MinecraftButton variant="white" onClick={() => fetchRepos(true)}>PAKSA SINKRONISASI</MinecraftButton>
          </div>
        )}

        {hasMore && (
          <div className="mt-20 flex justify-center">
            <MinecraftButton 
              variant="default" 
              className="w-full sm:w-auto sm:min-w-[400px] !py-8 !text-sm"
              onClick={() => setVisibleCount(v => v + 8)}
            >
              <ChevronDown size={20} className="mr-4" /> AKSES MODUL LAINNYA
            </MinecraftButton>
          </div>
        )}

        <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-10">
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