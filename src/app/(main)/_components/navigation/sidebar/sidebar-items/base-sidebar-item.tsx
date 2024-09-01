'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

type BaseSidebarItemProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;

  id?: string;
  NoteIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
};

export const BaseSidebarItem = ({ icon: Icon, label, onClick }: BaseSidebarItemProps) => {
  return (
    <div
      onClick={() => onClick()}
      role='button'
      style={{ marginLeft: '0px' }}
      className='flex items-center gap-x-2 hover:bg-primary/5 px-3 py-1 w-full min-h-7 font-medium text-muted-foreground text-sm group'
    >
      <Icon className='w-4 h-4 shrink-0' />
      <span className='truncate'>{label}</span>
    </div>
  );
};
