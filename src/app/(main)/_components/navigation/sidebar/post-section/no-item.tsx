import React from 'react';
import { BaseItem } from '../components/base-item';

type NoItemProps = {
  level?: number;
};

function NoItem({ level = 0 }: NoItemProps) {
  return (
    <BaseItem
      level={level}
      label='No pages inside'
      className='hover:bg-transparent text-muted-foreground/50 cursor-default'
    />
  );
}

export default NoItem;
