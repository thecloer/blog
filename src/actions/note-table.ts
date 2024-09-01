'use server';

import { z } from 'zod';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const NoteSchema = z.object({
  title: z.string(),
  isArchived: z.boolean(), // for soft delete
  isPublished: z.boolean(), // for public view
  parentNoteId: z.string().uuid().optional(),
  coverImage: z.string().url().optional(),
  icon: z.string().url().optional(),
  content: z.string().optional(),
});
export type Note = z.infer<typeof NoteSchema>;

const NoteRowSchema = NoteSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type NoteRow = z.infer<typeof NoteRowSchema>;

const NoteTable = new Map<typeof NoteRowSchema.shape.id._type, NoteRow>();

export const createNote = async (note: Note) => {
  const id = randomUUID();
  const now = new Date();
  const parseResult = NoteRowSchema.safeParse({
    id,
    createdAt: now,
    updatedAt: now,
    ...note,
  });

  if (parseResult.success === false) {
    console.error(parseResult.error);
    throw new Error(`Invalid Note: ${parseResult.error.message}`);
  }

  const newNote = parseResult.data;
  NoteTable.set(id, newNote);

  revalidatePath('/(main)/blog', 'layout');
  return newNote;
};

export const getNotes = async () => {
  const notes = Array.from(NoteTable.values());
  return notes;
};
export const getNote = async (id: string) => {
  const note = NoteTable.get(id);
  if (!note) throw new Error(`Not Found the note with id: ${id}`);
  return note;
};

export const updateNote = async (id: string, note: Partial<Note>) => {
  const oldNote = await getNote(id);
  const parseResult = NoteRowSchema.safeParse({
    ...oldNote,
    ...note,
    updatedAt: new Date(),
  });

  if (parseResult.success === false) {
    console.error(parseResult.error);
    throw new Error(`Invalid Note: ${parseResult.error.message}`);
  }

  const updatedNote = parseResult.data;
  NoteTable.set(id, updatedNote);

  revalidatePath('/(main)/blog', 'layout');
  return updatedNote;
};

export const deleteNote = async (id: string) => {
  const note = await getNote(id);
  const deletedNote = { ...note, isArchived: true };
  NoteTable.set(id, deletedNote);

  revalidatePath('/(main)/blog', 'layout');
  return deletedNote;
};
