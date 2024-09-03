import React from 'react';

import { SidebarContainer } from './components/sidebar-container';
import { SidebarCollapseButton } from './components/sidebar-collapse-button';
import { CurrentUserItem } from './components/current-user-item';
import { ToolSection } from './tool-section';
import { PostSection } from './post-section';

export const Sidebar = async () => {
  return (
    <SidebarContainer>
      <SidebarCollapseButton />
      <CurrentUserItem />
      <ToolSection />
      <PostSection />
    </SidebarContainer>
  );
};
