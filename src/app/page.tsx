'use client';
import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import ProjectGrid from '@/components/sections/ProjectGrid';
import Footer from '@/components/sections/Footer';

interface ConfigData {
  name: string;
  contact: {
    whatsapp: string;
  };
  community: {
    name: string;
    website: string;
    discord: string;
  };
}

export default function Page() {
  const [config, setConfig] = useState<ConfigData | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("https://raw.githubusercontent.com/mcpeserver/MyAPI/main/config.json");
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        // Handle error silently
      }
    };
    fetchConfig();
  }, []);

  return (
    <main className="min-h-screen pb-20 relative overflow-hidden">
      {/* Dynamic Background elements only for larger screens to keep mobile clean */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-5%] hidden xl:block select-none animate-mc-float opacity-10">
          <div className="bg-[#313131] border-4 border-black p-8 rotate-12 scale-150 blur-[1px]">
            <span className="font-minecraft text-[8px] uppercase text-white">WEB_ARCHITECT</span>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-10 z-0 opacity-5 hidden lg:block">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-8 h-8 mc-bg-grass mc-pixel-border" />
            <div className="w-8 h-8 mc-bg-stone mc-pixel-border" />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
        <ProjectGrid />
      </div>

      <Footer config={config} />
    </main>
  );
}
