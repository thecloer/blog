import React from 'react';
import { UserItem } from './user-item';
import { SidebarCollapseButton } from './sidebar-collapse-button';
import { SidebarContainer } from './sidebar-container';

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <div>
        <UserItem />
        <SidebarCollapseButton />
      </div>

      <ul className='mt-4'>
        <li>Untitled - 1</li>
        <li>Untitled - 2</li>
        <li>Untitled - 3</li>
      </ul>
    </SidebarContainer>
  );
};
