import React from 'react';
import { ChevronsRight, Menu } from 'lucide-react';
import { useNavigationControl } from '../navigation-control-context';

export const SidebarExpandButton = () => {
  const { expandSidebar } = useNavigationControl();

  return (
    <button className='-ml-3 px-3 py-[10px] group' onClick={expandSidebar}>
      <div className='flex justify-center items-center hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm w-6 h-6 text-muted-foreground transition-all ease-in-out'>
        <Menu className='opacity-100 group-hover:opacity-0 w-6 h-6 transition-all duration-100 ease-in-out' />
        <ChevronsRight className='absolute opacity-0 group-hover:opacity-100 w-6 h-6 transition-all duration-100 ease-in-out' />
      </div>
    </button>
  );
};
