'use client';

import React from 'react';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

type BaseItemProps = {
  icon?: React.ReactNode;
  label?: string;
  menu?: React.ReactNode;
  level?: number;
  className?: ClassValue;
  onClick?: () => void;
};

export const BaseItem = ({ icon: Icon, label, menu, level = 0, className, onClick }: BaseItemProps) => {
  return (
    <div
      role='button'
      className={cn(
        'border-muted hover:bg-primary/5 px-2 py-1 border rounded h-8 font-semibold text-muted-foreground text-sm group relative',
        className
      )}
      onClick={onClick}
    >
      <div style={{ paddingLeft: `${level * 12}px` }} className='flex items-center gap-x-2 w-full h-full'>
        {Icon}
        <span className='truncate'>{label}</span>
        {menu}
      </div>
    </div>
  );
};
