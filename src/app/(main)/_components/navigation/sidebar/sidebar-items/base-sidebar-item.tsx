'use client';

import React, { ReactNode } from 'react';

type BaseSidebarItemProps = {
  label: string;
  Icon: ReactNode;
  onClick: () => void;
};

export const BaseSidebarItem = ({ Icon, label, onClick }: BaseSidebarItemProps) => {
  return (
    <div
      onClick={() => onClick()}
      role='button'
      style={{ marginLeft: '0px' }}
      className='flex items-center gap-x-2 hover:bg-primary/5 px-3 py-1 w-full min-h-7 font-medium text-muted-foreground text-sm group'
    >
      {Icon}
      <span className='truncate'>{label}</span>
    </div>
  );
};
