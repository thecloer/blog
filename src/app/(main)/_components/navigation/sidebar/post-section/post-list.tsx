'use client';

import { SidebarPost } from '@/actions';
import { PostItem } from './post-item';
import NoItem from './no-item';

type PostListProps = {
  posts: SidebarPost[];
  level?: number;
};

export const PostList = ({ posts, level = 0 }: PostListProps) => {
  if (level > 0 && posts.length === 0) return <NoItem level={level} />;
  return posts.map((post) => <PostItem key={post.id} post={post} level={level} />);
};
