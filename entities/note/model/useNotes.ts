import type { Note } from '../types/types'

export function useNotes() {
  const notes = inject<ComputedRef<Note[]>>('notes');
  const addNote = inject<(title: string, content: string) => Promise<Note>>('addNote');
  const editNote = inject<(id: number, title: string, content: string) => Promise<Note>>('editNote');
  const deleteNote = inject<(id: number) => Promise<void>>('deleteNote');

  if (!notes || !addNote || !editNote || !deleteNote) {
    throw new Error('Notes API not properly injected. Make sure to call provideNotes() in a parent component');
  };

  return { 
    notes,
    addNote,
    editNote, 
    deleteNote 
  };
}