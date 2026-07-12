'use client';
import MinecraftPanel from '@/components/ui/MinecraftPanel';
import MinecraftButton from '@/components/ui/MinecraftButton';
import { Rocket } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-12 md:pt-40 md:pb-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 md:mb-12">
          <MinecraftPanel variant="dark" padding="p-6 md:p-12" className="inline-block border-b-4 border-r-4 border-black bg-black/60 backdrop-blur-sm">
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-minecraft uppercase tracking-tighter leading-tight text-white mb-2 drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
              RAN DEV<br className="sm:hidden" /> SHOWCASE
            </h1>
            <p className="font-vt323 text-lg md:text-2xl uppercase tracking-[0.2em] text-[#38e11e]">
              Arsitek Web Minecraft
            </p>
          </MinecraftPanel>
        </div>

        <p className="max-w-xl mx-auto font-vt323 text-base md:text-xl text-gray-500 uppercase leading-relaxed tracking-wider mb-8 px-4">
          Infrastruktur web modern untuk komunitas Minecraft Indonesia. Cepat, Aman, dan Berperforma Tinggi.
        </p>

        <div className="flex flex-col items-center gap-6">
          <MinecraftButton 
            variant="success" 
            className="!py-6 !px-10 !text-[9px] md:!text-xs animate-pulse hover:animate-none"
            onClick={scrollToProjects}
          >
            <Rocket className="mr-3 w-5 h-5" /> LIHAT PROYEK
          </MinecraftButton>
        </div>
      </div>
    </section>
  );
}