
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import Header from '@/components/sections/Header';

const minecraftFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-minecraft',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

export const viewport: Viewport = {
  themeColor: '#38e11e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'RAN DEV | Arsitek Web Minecraft Indonesia',
    template: '%s | RAN DEV'
  },
  description: 'Portofolio pengembangan web profesional untuk komunitas Minecraft Indonesia oleh RAN DEV. Spesialisasi landing page server MCPE/Bedrock berperforma tinggi.',
  keywords: ['Minecraft Indonesia', 'Web Developer Minecraft', 'RAN DEV', 'MCPE Server'],
  authors: [{ name: 'RAN DEV' }],
  metadataBase: new URL('https://mcpeserver.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://mcpeserver.vercel.app',
    siteName: 'RAN DEV Showcase',
    title: 'RAN DEV | Arsitek Web Minecraft Indonesia',
    description: 'Infrastruktur web modern untuk komunitas Minecraft Indonesia.',
    images: [{ url: 'https://raw.githubusercontent.com/mcpeserver/MyAPI/main/og-image.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${minecraftFont.variable} ${vt323.variable}`} data-theme="dark">
      <body className="antialiased selection:bg-[#38e11e] selection:text-black font-minecraft bg-background text-foreground transition-colors duration-300">
        <Header />
        {children}
      </body>
    </html>
  );
}
