import { getSidebarPosts } from '@/actions';
import { PostList } from './post-list';
import siteConfig from '@/configs/site';

export const PostSection = async () => {
  const userId = siteConfig.author; // TODO: use auth
  const posts = await getSidebarPosts(userId);

  return (
    <section className='mx-2 overflow-y-auto'>
      <PostList posts={posts} />
    </section>
  );
};
