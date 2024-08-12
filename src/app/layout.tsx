import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import siteConfig from '@/configs/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: 'prefers-color-scheme: light', color: 'white' },
    { media: 'prefers-color-scheme: dark', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='scroll-pt-[--heading-height]'>
      <body className={cn('min-h-dvh bg-background font-sans antialiased', inter.variable)}>{children}</body>
    </html>
  );
}
