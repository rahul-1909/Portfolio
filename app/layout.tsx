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
        url: '/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Rahul Teja - AI Engineer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Teja - AI Engineer',
    description:
      'Portfolio of Rahul Teja, AI Engineer. Selected projects, professional experience, technical skills, and certifications.',
    images: ['/og-image.png?v=2'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
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
