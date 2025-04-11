import type { Note } from "~/entities/note/types/types";

const NOTES_KEY = 'notes';

let cachedNotes: Note[] | null = null;

export const useNoteStorage = () => {
  const getNotes = (): Note[] => {
    if (cachedNotes) return cachedNotes;
    
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(NOTES_KEY);
      cachedNotes = data ? JSON.parse(data) as Note[] : [];
      return cachedNotes;
    } catch (error) {
      console.error('Failed to read notes from localStorage:', error);
      cachedNotes = [];
      return cachedNotes;
    }
  }

  const saveNotes = (notes: Note[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      cachedNotes = notes;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes to localStorage:', error);
    }
  }

  return { getNotes, saveNotes };
}