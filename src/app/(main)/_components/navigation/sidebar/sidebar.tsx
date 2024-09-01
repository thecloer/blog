import React from 'react';
import { getNotes } from '@/actions';
import { SidebarContainer } from './sidebar-container';
import { SidebarCollapseButton } from './sidebar-collapse-button';
import { CurrentUserItem, NewNoteItem } from './sidebar-items';

export const Sidebar = async () => {
  const notes = await getNotes();

  return (
    <SidebarContainer>
      <SidebarCollapseButton />

      <CurrentUserItem />
      <NewNoteItem />

      <ul className='mt-4'>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </SidebarContainer>
  );
};
