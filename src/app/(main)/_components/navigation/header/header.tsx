'use client';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useNavigationControl } from '../navigation-control-context';
import { SidebarExpandButton } from './sidebar-expand-button';

export const Header = () => {
  const { headerRef, isCollapsed } = useNavigationControl();

  return (
    <header ref={headerRef} className='top-0 z-40 sticky w-full h-11 transition-all duration-300 ease-in-out'>
      <div className='flex justify-between items-center px-3 w-full h-full'>
        <div className='flex items-center'>
          {isCollapsed && <SidebarExpandButton />}
          <Button variant='ghost' size='xs' className='justify-items-center'>
            Untitled - 1
          </Button>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
