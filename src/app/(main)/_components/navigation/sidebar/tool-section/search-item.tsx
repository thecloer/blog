'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { BaseItem } from '../components/base-item';

export const SearchItem = () => {
  return (
    <BaseItem
      icon={<Search className='w-4 h-4 shrink-0' strokeWidth={2.3} />}
      label='Search'
      menu={
        <kbd className='inline-flex items-center gap-1 dark:border-muted-foreground/5 bg-muted opacity-100 ml-auto px-1.5 border rounded font-medium font-mono text-[10px] text-muted-foreground pointer-events-none select-none'>
          <span className='ml-auto text-muted-foreground text-xs'>⌘</span>K
        </kbd>
      }
    />
  );
};
