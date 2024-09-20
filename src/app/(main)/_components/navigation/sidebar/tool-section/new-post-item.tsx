'use client';

import React, { useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { createPost } from '@/actions';
import { toast } from 'sonner';
import { BaseItem } from '../components/base-item';
import { useUser } from '@/hooks/useUser';

export const NewPostItem = () => {
  const { user } = useUser(); // TODO: useUser
  const handelNewPost = useCallback(() => {
    const promise = createPost({
      author: user.name,
      title: 'New Post',
      isArchived: false,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Creating post...',
      success: 'Post created!',
      error: (error) => `Failed to create post: ${error.message}`,
    });
  }, [user]);

  return (
    <BaseItem
      icon={<PlusCircle className='w-4 h-4 shrink-0' strokeWidth={2.3} />}
      label='New Post'
      onClick={handelNewPost}
    />
  );
};
