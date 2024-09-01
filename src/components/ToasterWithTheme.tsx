'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export const ToasterWithTheme = ({ position }: { position: Position }) => {
  const { theme } = useTheme();

  return <Toaster position={position} theme={theme as 'dark' | 'light'} toastOptions={{ duration: 2000 }} richColors />;
};
