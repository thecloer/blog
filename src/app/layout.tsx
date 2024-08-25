import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/configs/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: {
    name: siteConfig.author,
    url: siteConfig.links.github,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={cn('font-sans antialiased relative bg-background h-dvh', inter.variable)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          storageKey='thecloer-blog-theme'
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
