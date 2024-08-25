'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='xs'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='group'
    >
      <Sun className='group-hover:text-red-400 w-4 h-4 transition-all aspect-square scale-100 dark:scale-0' />
      <Moon className='group-hover:text-yellow-400 absolute w-4 h-4 transition-all aspect-square scale-0 dark:scale-100' />
    </Button>
  );
};
