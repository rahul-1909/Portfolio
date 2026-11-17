import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header/Header';
import { GridOverlay } from '@/components/GridOverlay';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nrahulteja.me'),
  title: 'Rahul Teja - AI Engineer',
  description:
    'Portfolio of Rahul Teja, AI Engineer. Selected projects, professional experience, technical skills, and certifications.',
  openGraph: {
    title: 'Rahul Teja - AI Engineer',
    description:
      'Portfolio of Rahul Teja, AI Engineer. Selected projects, professional experience, technical skills, and certifications.',
    url: 'https://www.nrahulteja.me',
    siteName: 'Rahul Teja',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/suisseintl-book.d496da6e.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans bg-light-grey text-light-black antialiased selection:bg-black selection:text-white">
        <Header />
        <main className="w-full min-h-screen relative overflow-hidden">
          {children}
        </main>
        <GridOverlay />
      </body>
    </html>
  );
}
