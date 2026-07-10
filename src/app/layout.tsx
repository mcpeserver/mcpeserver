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
  description: 'Portofolio pengembangan web profesional untuk komunitas Minecraft Indonesia oleh RAN DEV. Spesialisasi landing page server MCPE/Bedrock berperforma tinggi dengan optimasi SEO, PWA, dan infrastruktur cloud modern.',
  keywords: [
    'Minecraft Indonesia', 
    'Web Developer Minecraft', 
    'MCPE Server Landing Page', 
    'Server MCBE Indonesia', 
    'Minecraft Bedrock Edition', 
    'RAN DEV', 
    'Jasa Web Minecraft',
    'Arsitek Web Pixel',
    'Landing Page Minecraft',
    'Next.js 15 Minecraft',
    'Tailwind CSS Minecraft'
  ],
  authors: [{ name: 'RAN DEV', url: 'https://github.com/mcpeserver' }],
  creator: 'RAN DEV',
  publisher: 'RAN DEV',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mcpeserver.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://mcpeserver.vercel.app',
    siteName: 'RAN DEV Showcase',
    title: 'RAN DEV | Arsitek Web Minecraft & Komunitas',
    description: 'Koleksi infrastruktur web modern untuk komunitas Minecraft Indonesia. Cepat, Aman, dan Estetik. Dibangun dengan Next.js 15.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/mcpeserver/MyAPI/main/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RAN DEV Showcase Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAN DEV | Arsitek Web Minecraft Indonesia',
    description: 'Membangun masa depan web komunitas Minecraft Indonesia dengan teknologi modern.',
    images: ['https://raw.githubusercontent.com/mcpeserver/MyAPI/main/og-image.png'],
    creator: '@randev',
  },
  icons: {
    icon: [
      { url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2338e11e%22/><rect x=%220%22 y=%220%22 width=%22100%22 height=%2220%22 fill=%22%232eb818%22/><rect x=%220%22 y=%2280%22 width=%22100%22 height=%2220%22 fill=%22%231a6d0d%22/></svg>' },
    ],
    apple: [
      { url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2338e11e%22/></svg>' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${minecraftFont.variable} ${vt323.variable}`} data-theme="dark">
      <body className="antialiased selection:bg-[#38e11e] selection:text-black font-minecraft theme-transition bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  );
}
