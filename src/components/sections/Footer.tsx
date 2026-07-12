'use client';
import { Info, Share2, MessageSquare, Github, Globe } from 'lucide-react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';
import MinecraftButton from '@/components/ui/MinecraftButton';

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

interface FooterProps {
  config: ConfigData | null;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer className="mt-24 px-6 relative z-20 pb-12">
      <div className="max-w-6xl mx-auto">
        <MinecraftPanel variant="dark" padding="p-8 md:p-16" className="text-center overflow-hidden border-t-[4px] border-t-[#38e11e]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
            {/* Developer Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Info className="text-[#38e11e]" size={20} />
                  <h3 className="font-minecraft text-xs uppercase text-white tracking-widest">INFORMASI_PENGEMBANG</h3>
                </div>
              </div>
              <div className="bg-black/20 p-6 mc-pixel-border border-gray-800">
                <h4 className="font-minecraft text-lg mb-2 text-[#38e11e]">{config?.name || 'RAN DEV'}</h4>
                <p className="font-vt323 text-xl text-gray-500 uppercase mb-6">Arsitek Web Minecraft & Pengembang Komunitas</p>
                <div className="flex flex-wrap gap-3">
                  <a href={config?.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MinecraftButton variant="success" className="!py-3 !px-6 !text-[9px]">
                      <MessageSquare size={14} className="mr-2" /> HUBUNGI WHATSAPP
                    </MinecraftButton>
                  </a>
                  <a href="https://github.com/mcpeserver" target="_blank" rel="noopener noreferrer">
                    <MinecraftButton variant="white" className="!py-3 !px-6 !text-[9px]">
                      <Github size={14} className="mr-2" /> GITHUB
                    </MinecraftButton>
                  </a>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Share2 className="text-[#b9f2ff]" size={20} />
                <h3 className="font-minecraft text-xs uppercase text-white tracking-widest">SIMPUL_KOMUNITAS</h3>
              </div>
              <div className="bg-black/20 p-6 mc-pixel-border border-gray-800">
                <h4 className="font-minecraft text-lg mb-2 text-[#b9f2ff]">{config?.community.name || 'COMMUNITY'}</h4>
                <p className="font-vt323 text-xl text-gray-500 uppercase mb-6">Jaringan Pengembang & Server MCPE Terpadu</p>
                <div className="flex flex-wrap gap-3">
                  {config?.community.website && (
                    <a href={config.community.website} target="_blank" rel="noopener noreferrer">
                      <MinecraftButton variant="white" className="!py-3 !px-6 !text-[9px] border-[#b9f2ff]">
                        <Globe size={14} className="mr-2" /> WEBSITE KOMUNITAS
                      </MinecraftButton>
                    </a>
                  )}
                  {config?.community.discord && (
                    <a href={config.community.discord} target="_blank" rel="noopener noreferrer">
                      <MinecraftButton variant="default" className="!py-3 !px-6 !text-[9px] bg-[#5865F2] !text-white !border-black hover:bg-[#4752c4]">
                        JOIN DISCORD
                      </MinecraftButton>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-vt323 text-2xl text-gray-700 uppercase mb-10 border-t border-white/5 pt-10">
            <span className="hover:text-[#38e11e] transition-colors cursor-default">Next.js 15</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-[#b9f2ff] transition-colors cursor-default">Tailwind CSS</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-white transition-colors cursor-default">Vercel Edge</span>
          </div>

          <p className="mt-12 font-vt323 text-lg text-gray-600 uppercase tracking-[0.25em]">
            &copy; {new Date().getFullYear()} {config?.name || 'RAN DEV'}. DIBANGUN DENGAN NEXTJS & SEMANGAT PIXEL.
          </p>
        </MinecraftPanel>
      </div>
    </footer>
  );
}
