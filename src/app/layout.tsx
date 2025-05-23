import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Contents from '@/components/Contents';
import BackToTop from '@/components/BackToTop';
import AdBox from '@/components/AdBox';
import AuthWrapper from '@/components/AuthWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SellWeb',
  description: 'selling my project',
  icons: {
    icon: '/icons/icon-192x192.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthWrapper>
          <AdBox />
          <NavBar />
          <Contents>{children}</Contents>
          <BackToTop />
          <Footer />
        </AuthWrapper>
      </body>
    </html>
  );
}
