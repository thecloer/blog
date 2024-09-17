'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, File, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { createPost, SidebarPost } from '@/actions';
import { BaseItem } from '../components/base-item';
import { PostList } from './post-list';
import siteConfig from '@/configs/site';

type PostItemProps = {
  post: SidebarPost;
  level?: number;
};

export const PostItem = ({ post: { id, icon, title, children }, level = 0 }: PostItemProps) => {
  const router = useRouter();
  const params = useParams<{ postId: string }>();
  const [expended, setExpended] = useState(false);

  const active = params.postId === id;

  const onExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setExpended(!expended);
  };

  const onItemClick = () => router.push(`/blog/${id}`);
  const addChildPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const promise = createPost({
      authorId: siteConfig.author, // TODO: use auth
      parentPostId: id,
      title: 'A Child Post',
      isArchived: false,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Creating post...',
      success() {
        if (!expended) setExpended(true);
        return 'Post created!';
      },
      error(error) {
        return `Failed to create post: ${error.message}`;
      },
    });
  };

  const Icon = icon ? (
    <div className='text-base shrink-0'>{icon}</div>
  ) : (
    <File className='w-4 h-4 shrink-0' strokeWidth={2.3} />
  );

  return (
    <>
      <BaseItem
        className={active && 'bg-primary/10 text-primary'}
        icon={
          <div className='relative flex justify-center items-center w-5 h-5 transition-all'>
            <div className='group-hover:scale-0 flex justify-center items-center scale-100'>{Icon}</div>
            <div
              role='button'
              className='group-hover:scale-100 top-0 right-0 bottom-0 left-0 absolute flex justify-center items-center hover:bg-muted-foreground/10 rounded scale-0'
              onClick={onExpand}
            >
              <ChevronRight className={cn('w-4 h-4 transition-all', expended && 'rotate-90')} strokeWidth={2.3} />
            </div>
          </div>
        }
        label={title}
        menu={
          <button
            aria-label='Add a page inside'
            title='Add a page inside'
            onClick={addChildPage}
            className='flex justify-center items-center hover:bg-muted-foreground/10 opacity-0 group-hover:opacity-100 ml-auto rounded w-5 h-5 transition-opacity'
          >
            <Plus className='w-4 h-4 shrink-0' strokeWidth={2.3} />
          </button>
        }
        level={level}
        onClick={onItemClick}
      />
      {expended && <PostList posts={children} level={level + 1} />}
    </>
  );
};
