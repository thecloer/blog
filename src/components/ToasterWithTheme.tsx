'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export const ToasterWithTheme = ({ position }: { position: Position }) => {
  const { theme } = useTheme();

  return <Toaster theme={theme as 'dark' | 'light'} position={position} richColors duration={20000} />;
};
