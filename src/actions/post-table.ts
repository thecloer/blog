'use server';

import { z } from 'zod';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

const PostSchema = z.object({
  title: z.string(),
  isArchived: z.boolean(), // for soft delete
  isPublished: z.boolean(), // for public view
  parentPostId: z.string().uuid().optional(),
  coverImage: z.string().url().optional(),
  icon: z.string().url().optional(),
  content: z.string().optional(),
});
export type Post = z.infer<typeof PostSchema>;

const PostRowSchema = PostSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type PostRow = z.infer<typeof PostRowSchema>;

const postTable = new Map<typeof PostRowSchema.shape.id._type, PostRow>();

/**
 * The server action to create a new post.
 * @param post The post data to create.
 * @returns The created post.
 */
export const createPost = async (post: Post) => {
  const id = randomUUID();
  const now = new Date();
  const parseResult = PostRowSchema.safeParse({
    id,
    createdAt: now,
    updatedAt: now,
    ...post,
  });

  if (parseResult.success === false) {
    console.error(parseResult.error);
    throw new Error(`Invalid Post: ${parseResult.error.message}`);
  }

  const newPost = parseResult.data;
  postTable.set(id, newPost);

  revalidatePath('/(main)/blog');
  return newPost;
};

/**
 * The server action to get a post by id.
 * @param id The post id to get.
 * @returns The post with the id.
 */
export const getPost = async (id: string) => {
  const post = postTable.get(id);
  if (!post) throw new Error(`Not Found the Post with id: ${id}`);
  return post;
};

/**
 * The server action to update a post by id.
 * @param id The post id to update.
 * @param post The post data to update.
 * @returns The updated post.
 */
export const updatePost = async (id: string, post: Partial<Post>) => {
  const oldPost = await getPost(id);
  const parseResult = PostRowSchema.safeParse({
    ...oldPost,
    ...post,
    updatedAt: new Date(),
  });

  if (parseResult.success === false) {
    console.error(parseResult.error);
    throw new Error(`Invalid Post: ${parseResult.error.message}`);
  }

  const updatedPost = parseResult.data;
  postTable.set(id, updatedPost);

  revalidatePath('/(main)/blog', 'layout');
  return updatedPost;
};

/**
 * The server action to delete a post by id.
 * @param id The post id to delete.
 * @returns The deleted post.
 */
export const deletePost = async (id: string) => {
  const post = await getPost(id);
  const deletedPost = { ...post, isArchived: true };
  postTable.set(id, deletedPost);

  revalidatePath('/(main)/blog', 'layout');
  return deletedPost;
};

/**
 * A recursive type for the sidebar post.
 */
export type SidebarPost = Pick<
  PostRow,
  'id' | 'title' | 'icon' | 'isArchived' | 'isPublished' | 'parentPostId' | 'updatedAt'
> & {
  children: SidebarPost[];
};
const sortSidebarPosts = (posts: SidebarPost[]) => {
  const sorted = posts.toSorted((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  sorted.forEach((post) => (post.children = sortSidebarPosts(post.children)));
  return sorted;
};
/**
 * The server action to get the sidebar posts.
 * @returns The sidebar posts.
 */
export const getSidebarPosts = async () => {
  const allSidebarPosts: SidebarPost[] = Array.from(postTable.values()).map(
    ({ id, isArchived, isPublished, title, icon, parentPostId, updatedAt }) => ({
      id,
      isArchived,
      isPublished,
      title,
      icon,
      parentPostId,
      updatedAt,
      children: [] as SidebarPost[],
    })
  );
  const sidebarPostMap = new Map(allSidebarPosts.map((post) => [post.id, post]));

  allSidebarPosts.forEach((post) => {
    if (!post.parentPostId) return;
    const parentPost = sidebarPostMap.get(post.parentPostId);
    parentPost?.children.push(post);
  });

  const rootSidebarPosts = allSidebarPosts.filter((post) => !post.parentPostId);

  return sortSidebarPosts(rootSidebarPosts);
};
