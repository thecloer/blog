'use client';

import React, { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, File, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { createPost, SidebarPost } from '@/actions';
import { BaseItem } from '../components/base-item';
import { PostList } from './post-list';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/hooks/useUser';
import { dateFormatter } from '@/lib/formatters';

type PostItemProps = {
  post: SidebarPost;
  level?: number;
};

export const PostItem = ({ post: { id, icon, title, children, updatedAt }, level = 0 }: PostItemProps) => {
  const { user } = useUser(); // TODO: useUser
  const router = useRouter();
  const params = useParams<{ postId: string }>();
  const [expended, setExpended] = useState(false);

  const active = params.postId === id;

  const gotoPostHandler = () => router.push(`/blog/${id}`);

  const toggleExpandHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setExpended(!expended);
    },
    [expended]
  );

  const addChildPageHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const promise = createPost({
        author: user.name,
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
    },
    [expended, id, user]
  );

  const deletePostHandler = () => {
    console.log('Delete'); // TODO: Implement delete item recursively
  };

  const Icon = useCallback(() => {
    return (
      <div className='relative flex justify-center items-center w-5 h-5 transition-all'>
        <div className='group-hover:scale-0 flex justify-center items-center scale-100'>
          {icon ? (
            <div className='text-base shrink-0'>{icon}</div>
          ) : (
            <File className='w-4 h-4 shrink-0' strokeWidth={2.3} />
          )}
        </div>
        <div
          role='button'
          className='group-hover:scale-100 top-0 right-0 bottom-0 left-0 absolute flex justify-center items-center hover:bg-muted-foreground/10 rounded scale-0'
          onClick={toggleExpandHandler}
        >
          <ChevronRight className={cn('w-4 h-4 transition-all', expended && 'rotate-90')} strokeWidth={2.3} />
        </div>
      </div>
    );
  }, [icon, expended, toggleExpandHandler]);

  const Menu = useCallback(() => {
    return (
      <div className='flex items-center gap-x-1 ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button
              aria-label='See more options'
              title='See more options'
              className='flex justify-center items-center hover:bg-muted-foreground/10 opacity-0 group-hover:opacity-100 rounded w-5 h-5 transition-opacity'
            >
              <MoreHorizontal className='w-4 h-4 shrink-0' strokeWidth={2.3} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-60' align='start' side='right' forceMount>
            <DropdownMenuItem onClick={deletePostHandler}>
              <Trash className='mr-2 w-4 h-4' /> Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className='p-2 text-muted-foreground text-xs'>
              <p className='mb-1'>Last edited by {user.name}</p>
              <p>{dateFormatter(updatedAt)}</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          aria-label='Add a page inside'
          title='Add a page inside'
          onClick={addChildPageHandler}
          className='flex justify-center items-center hover:bg-muted-foreground/10 opacity-0 group-hover:opacity-100 rounded w-5 h-5 transition-opacity'
        >
          <Plus className='w-4 h-4 shrink-0' strokeWidth={2.3} />
        </button>
      </div>
    );
  }, [addChildPageHandler, user, updatedAt]);

  return (
    <>
      <BaseItem
        className={active && 'bg-primary/10 text-primary'}
        label={title}
        level={level}
        onClick={gotoPostHandler}
        icon={<Icon />}
        menu={<Menu />}
      />
      {expended && <PostList posts={children} level={level + 1} />}
    </>
  );
};

const Menu = () => {};
