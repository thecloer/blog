'use client';

import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UserItem = () => {
  // FIXME:
  const user = {
    nickname: 'thecloer',
    email: 'thecloer@gmail.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/83699438?v=4',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role='button' className='flex items-center hover:bg-primary/5 p-3 w-full text-sm'>
          <div className='flex items-center gap-x-2 max-w-[150px]'>
            <Avatar className='rounded-full w-5 h-5'>
              <AvatarImage src={user.avatarUrl} alt='avatar' />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <span className='line-clamp-1 font-medium text-start'>{`${user.nickname}'s blog`}</span>
          </div>
          <ChevronsUpDown className='ml-2 w-4 h-4 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
        <div className='flex flex-col gap-y-4 p-2'>
          <p className='font-medium text-muted-foreground text-xs leading-none'>{user.email}</p>
          <div className='flex items-center gap-x-2'>
            <div className='bg-secondary p-1 rounded-md'>
              <Avatar className='rounded-full w-8 h-8'>
                <AvatarImage src={user.avatarUrl} alt='avatar' />
              </Avatar>
            </div>
            <div className='space-y-1'>
              <p className='line-clamp-1 text-sm'>{`${user.nickname}'s blog`}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='w-full text-muted-foreground cursor-pointer'>
          <Button
            variant='ghost'
            className='justify-start h-auto text-xs'
            onClick={() => {
              console.log('Log Out'); // TODO: Implement log out
            }}
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
