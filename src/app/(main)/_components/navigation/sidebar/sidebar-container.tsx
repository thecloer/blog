'use client';

import React, { PropsWithChildren } from 'react';
import { useNavigationControl } from '../navigation-control-context';
import { cn } from '@/lib/utils';

export const SidebarContainer = ({ children }: PropsWithChildren) => {
  const { sidebarRef, isSetting, isCollapsed, isMobile, handleResizeMouseDown } = useNavigationControl();

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'absolute mobile:relative z-50 flex flex-col bg-secondary w-60 h-full overflow-y-auto group/sidebar translate-x-0',
        isSetting && 'transition-all ease-in-out duration-300',
        isCollapsed && '-translate-x-full'
      )}
    >
      {children}

      {!isMobile && (
        <div
          onMouseDown={handleResizeMouseDown}
          onClick={() => {}}
          className='top-0 right-0 absolute bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 w-1 h-full transition cursor-ew-resize'
        />
      )}
    </aside>
  );
};
