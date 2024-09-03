import { getSidebarPosts } from '@/actions';
import { PostList } from './post-list';

export const PostSection = async () => {
  const posts = await getSidebarPosts();

  return (
    <section className='mx-2 overflow-y-auto'>
      <PostList posts={posts} />
    </section>
  );
};
