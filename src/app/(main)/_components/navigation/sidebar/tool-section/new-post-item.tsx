'use client';

import React, { useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { createPost } from '@/actions';
import { toast } from 'sonner';
import { BaseItem } from '../components/base-item';
import siteConfig from '@/configs/site';

export const NewPostItem = () => {
  const handelNewPost = useCallback(() => {
    const promise = createPost({
      authorId: siteConfig.author, // TODO: use auth
      title: 'New Post',
      isArchived: false,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Creating post...',
      success: 'Post created!',
      error: (error) => `Failed to create post: ${error.message}`,
    });
  }, []);

  return (
    <BaseItem
      icon={<PlusCircle className='w-4 h-4 shrink-0' strokeWidth={2.3} />}
      label='New Post'
      onClick={handelNewPost}
    />
  );
};
