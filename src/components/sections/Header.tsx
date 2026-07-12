'use client';
import { Terminal, Github, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MinecraftPanel from '@/components/ui/MinecraftPanel';
import MinecraftButton from '@/components/ui/MinecraftButton';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <Link href="/">
          <MinecraftPanel variant="dark" padding="px-3 py-2" className="flex items-center gap-2 hover:scale-105 transition-transform border-b-2 border-r-2 border-black">
            <Terminal size={12} className="text-[#38e11e]" />
            <span className="font-minecraft text-[8px] md:text-[9px] text-white uppercase">RAN DEV</span>
          </MinecraftPanel>
        </Link>

        <div className="flex items-center gap-2">
          <MinecraftButton 
            variant={theme === 'light' ? 'default' : 'white'} 
            onClick={toggleTheme}
            className="!p-2 !min-w-0"
          >
            {theme === 'light' ? <Sun size={12} /> : <Moon size={12} />}
          </MinecraftButton>

          <a href="https://github.com/mcpeserver" target="_blank" rel="noopener noreferrer">
            <MinecraftButton variant="white" className="flex items-center gap-2 !p-2 md:!px-4">
              <Github size={12} />
              <span className="hidden sm:inline text-[8px]">GITHUB</span>
            </MinecraftButton>
          </a>
        </div>
      </div>
    </header>
  );
}