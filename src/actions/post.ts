'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { ClientPost, ServerPost, ServerPostSchema, UpdatePostDto, UpdatePostDtoSchema } from '@/schemas/post';

const PostTable = new Map<typeof ServerPostSchema.shape.id._type, ServerPost>();

/**
 * The server action to create a new post.
 * @param {ClientPost} post  The post data to create.
 * @returns {ServerPost} The created post.
 */
export const createPost = async (post: ClientPost) => {
  const id = randomUUID();
  const now = new Date();
  const PostServerParseResult = ServerPostSchema.safeParse({
    ...post,
    id,
    createdAt: now,
    updatedAt: now,
  });

  if (PostServerParseResult.success === false) {
    console.error(PostServerParseResult.error);
    throw new Error(`Invalid Post: ${PostServerParseResult.error.message}`);
  }

  const newServerPost = PostServerParseResult.data;
  PostTable.set(id, newServerPost);

  console.log(PostTable);

  revalidatePath('/(main)/blog', 'layout');
  return newServerPost;
};

/**
 * The server action to get a post by id.
 * @param postId The post id to get.
 * @returns The post with the id.
 */
export const getPost = async (postId: string) => {
  const post = PostTable.get(postId);
  if (!post) throw new Error(`Not Found the Post with id: ${postId}`);
  return post;
};

/**
 * The server action to update a post by id.
 * @param id The post id to update.
 * @param post The post data to update.
 * @returns The updated post.
 */
export const updatePost = async (updatePostDto: UpdatePostDto) => {
  const validateResult = UpdatePostDtoSchema.safeParse(updatePostDto);
  if (validateResult.success === false) {
    console.error(validateResult.error);
    throw new Error(`Invalid Updating Post: ${validateResult.error.message}`);
  }
  const { postId, author, ...data } = validateResult.data;

  const oldPost = await getPost(postId);
  if (oldPost.author !== author) {
    throw new Error(`Not Allowed to Update the Post with id: ${postId}`);
  }

  const updatedPost = {
    ...oldPost,
    ...data,
    updatedAt: new Date(),
  };
  PostTable.set(postId, updatedPost);

  revalidatePath('/(main)/blog', 'layout');
  return updatedPost;
};

/**
 * The server action to delete a post by id.
 * @param {{ userId: string; postId: string }} deletePostDto The `postId` to delete and `userId` who ask to delete.
 * @returns {ServerPost} The deleted post.
 */
export const deletePost = async ({ author, postId }: { author: string; postId: string }) => {
  const post = await getPost(postId);
  // TODO: use user id
  if (post.author !== author) {
    throw new Error(`Not Allowed to Delete the Post with postId ${postId} by ${author}`);
  }
  const deletedPost = { ...post, isArchived: true };
  PostTable.set(postId, deletedPost);

  revalidatePath('/(main)/blog', 'layout');
  return deletedPost;
};

/**
 * A recursive type for the sidebar post.
 */
export type SidebarPost = Pick<
  ServerPost,
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
  const allSidebarPosts: SidebarPost[] = Array.from(PostTable.values()).map(
    ({ id, author, isArchived, isPublished, title, icon, parentPostId, updatedAt }) => ({
      id,
      author,
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
