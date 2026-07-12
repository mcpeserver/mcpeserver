'use client';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, Monitor, EyeOff, Github, ExternalLink } from 'lucide-react';
import MinecraftButton from '@/components/ui/MinecraftButton';
import MinecraftPanel from '@/components/ui/MinecraftPanel';

interface ProjectCardProps {
  repo: any;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  
  const demoUrl = repo.homepage || `https://${repo.name.toLowerCase().replace(/_/g, '-')}.vercel.app`;

  const handleRetry = useCallback(() => {
    setIsIframeLoading(true);
    setLoadError(false);
    setRetryKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isIframeLoading) {
        setIsIframeLoading(false);
        setLoadError(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [isIframeLoading, retryKey]);

  return (
    <MinecraftPanel variant="dark" padding="p-0" className="flex flex-col group overflow-hidden transition-all duration-500 h-full border-black shadow-2xl hover:border-[#38e11e] hover:-translate-y-2">
      {/* URL Bar */}
      <div className="bg-[#1e1e1e] p-3 flex justify-between items-center border-b-2 border-black z-30 relative">
        <div className="flex items-center gap-3 flex-1 overflow-hidden bg-black/40 px-3 py-1.5 border-[1px] border-white/5">
          <Monitor size={12} className="shrink-0 text-[#b9f2ff]" />
          <span className="text-[9px] font-minecraft truncate uppercase text-gray-500 tracking-tighter">
            {repo.name.toLowerCase()}.mcpe.dev
          </span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video overflow-hidden bg-black border-b-2 border-black">
        <div 
          className="absolute inset-0 z-40 cursor-pointer"
          onClick={() => !loadError && window.open(demoUrl, '_blank')}
        />
        
        {isIframeLoading && !loadError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#111]">
            <Loader2 className="w-6 h-6 text-[#38e11e] animate-spin" />
            <span className="font-vt323 text-xs text-gray-600 uppercase tracking-widest">SINKRONISASI...</span>
          </div>
        )}

        {loadError ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#1a1a1a] p-6 text-center">
            <EyeOff className="text-red-500/20 w-8 h-8" />
            <span className="font-minecraft text-[8px] text-red-500/50 uppercase leading-relaxed">SINKRONISASI_GAGAL</span>
            <button onClick={handleRetry} className="mt-2 font-vt323 text-sm text-[#38e11e] hover:text-white uppercase border-b border-[#38e11e]/20">ULANGI_PROTOKOL</button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <iframe 
              key={retryKey}
              src={demoUrl} 
              className={`border-none absolute transition-all duration-1000 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
              style={{
                width: '1280px',
                height: '720px',
                transform: 'scale(var(--card-scale, 0.2))',
                imageRendering: 'pixelated',
              }}
              title={repo.name}
              scrolling="no"
              loading="lazy"
              onLoad={() => setIsIframeLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}
      </div>

      {/* Content Area - Minimalist */}
      <div className="p-5 flex flex-col gap-4 flex-1 bg-[#1a1a1a]">
        <div className="flex-1">
          <h3 className="text-[11px] font-minecraft uppercase text-white group-hover:text-[#38e11e] transition-colors line-clamp-2 tracking-tighter leading-normal">
            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MinecraftButton 
            variant="success" 
            className="w-full !py-5 !text-[10px]" 
            onClick={() => window.open(demoUrl, '_blank')}
          >
            <ExternalLink size={12} className="mr-2" /> LIVE
          </MinecraftButton>
          <MinecraftButton 
            variant="white" 
            onClick={() => window.open(repo.html_url, '_blank')}
            className="w-full !py-5 !text-[10px] text-gray-800"
          >
            <Github size={12} className="mr-2" /> REPO
          </MinecraftButton>
        </div>
      </div>

      <style jsx>{`
        div { --card-scale: 0.12; }
        @media (min-width: 480px) { div { --card-scale: 0.15; } }
        @media (min-width: 640px) { div { --card-scale: 0.18; } }
        @media (min-width: 1024px) { div { --card-scale: 0.20; } }
      `}</style>
    </MinecraftPanel>
  );
}
