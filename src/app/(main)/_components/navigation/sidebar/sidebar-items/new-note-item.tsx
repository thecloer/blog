'use client';

import React from 'react';
import { BaseSidebarItem } from './base-sidebar-item';
import { PlusCircle } from 'lucide-react';
import { createNote } from '@/actions';
import { toast } from 'sonner';

export const NewNoteItem = () => {
  const handelNewNote = () => {
    const promise = createNote({
      title: 'New Note',
      isArchived: false,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Creating note...',
      success: 'Note created!',
      error: (error) => `Failed to create note: ${error.message}`,
    });
  };

  return (
    <BaseSidebarItem Icon={<PlusCircle className='w-4 h-4 shrink-0' />} label='New Note' onClick={handelNewNote} />
  );
};
