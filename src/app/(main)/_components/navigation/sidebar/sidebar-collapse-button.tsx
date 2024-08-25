'use client';

import React from 'react';
import { ChevronsLeft } from 'lucide-react';
import { useNavigationControl } from '../navigation-control-context';

export const SidebarCollapseButton = () => {
  const { collapseSidebar } = useNavigationControl();

  return (
    <button
      className='top-3 right-2 absolute hover:bg-neutral-300 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 rounded-sm w-6 h-6 text-muted-foreground transition'
      onClick={collapseSidebar}
    >
      <ChevronsLeft className='w-6 h-6' />
    </button>
  );
};
