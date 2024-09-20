import { z } from 'zod';

export const ClientPostSchema = z.object({
  author: z.string(), // TODO: add authorId
  title: z.string(),
  isArchived: z.boolean(), // for soft delete
  isPublished: z.boolean(), // for public view
  parentPostId: z.string().uuid().optional(),
  coverImage: z.string().url().optional(),
  icon: z.string().url().optional(),
  content: z.string().optional(),
});
export type ClientPost = z.infer<typeof ClientPostSchema>;
export type ClientPostWithId = ClientPost & { id: string }; // ClientPost with postId

export const ServerPostSchema = ClientPostSchema.extend({
  id: z.string().uuid(), // postId
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ServerPost = z.infer<typeof ServerPostSchema>;

export const UpdatePostDtoSchema = ClientPostSchema.partial().merge(
  z.object({
    author: ClientPostSchema.shape.author, // override PostClientSchema partial author
    postId: z.string().uuid(),
  })
);
export type UpdatePostDto = z.infer<typeof UpdatePostDtoSchema>;
