'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  Loader2, 
  Monitor, 
  EyeOff, 
  Github, 
} from 'lucide-react';
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
    }, 12000); 
    return () => clearTimeout(timer);
  }, [isIframeLoading, retryKey]);

  return (
    <MinecraftPanel variant="dark" padding="p-0" className="flex flex-col group overflow-hidden transition-all duration-300 h-full border-black shadow-lg hover:border-[#38e11e]">
      {/* Tab Bar / URL Simulation */}
      <div className="bg-[#404040] p-2 flex justify-between items-center border-b-2 border-black z-30 relative">
        <div className="flex items-center gap-2 flex-1 overflow-hidden bg-black/30 px-2 py-1 border-[1px] border-black">
          <Monitor size={10} className="shrink-0 text-[#b9f2ff]" />
          <span className="text-[7px] font-minecraft truncate uppercase text-gray-400 tracking-tighter">
            {repo.name.toLowerCase()}.arch.net
          </span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a] border-b-2 border-black">
        <div 
          className="absolute inset-0 z-30 cursor-pointer"
          onClick={() => !loadError && window.open(demoUrl, '_blank')}
        />
        
        {isIframeLoading && !loadError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#1a1a1a]">
            <Loader2 className="w-5 h-5 text-[#38e11e] animate-spin" />
            <span className="font-vt323 text-[10px] text-gray-600 uppercase">SINKRONISASI...</span>
          </div>
        )}

        {loadError ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#252525] p-4 text-center">
            <EyeOff className="text-red-500/30 w-6 h-6" />
            <span className="font-minecraft text-[6px] text-red-500/70 uppercase">ACCESS_DENIED</span>
            <button onClick={handleRetry} className="mt-1 font-vt323 text-[10px] text-[#38e11e] hover:text-white uppercase">RETRY</button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <iframe 
              key={retryKey}
              src={demoUrl} 
              className={`border-none absolute transition-opacity duration-700 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
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

      {/* Info Content - Clean and Minimal */}
      <div className="p-4 flex flex-col gap-4 flex-1 bg-[#252525]">
        <div className="flex-1">
          <h3 className="text-[10px] font-minecraft uppercase text-white group-hover:text-[#38e11e] transition-colors line-clamp-2 tracking-tighter leading-relaxed">
            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <MinecraftButton 
            variant="success" 
            className="w-full !py-4 !text-[10px]" 
            onClick={() => window.open(demoUrl, '_blank')}
          >
            LIVE DEMO
          </MinecraftButton>
          <MinecraftButton 
            variant="white" 
            onClick={() => window.open(repo.html_url, '_blank')}
            className="w-full !py-3 !text-[8px] text-gray-800"
          >
            <Github size={12} className="mr-2" /> SOURCE
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
