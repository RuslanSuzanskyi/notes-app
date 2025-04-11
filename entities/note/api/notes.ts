import { useNoteStorage } from "~/utils/localStorage";
import type { Note } from "../types/types";

export const useNotesApi = () => {
  const { getNotes, saveNotes } = useNoteStorage();
  const notes = ref<Note[]>([]);
  
  onMounted(() => {
    notes.value = getNotes();
  })

  const addNote = async (title: string, content: string): Promise<Note> => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notes.value = [newNote, ...notes.value];
    saveNotes(notes.value);
    return newNote;
  };

  const updateNote = async (id: number, title: string, content: string): Promise<Note> => {
    const index = notes.value.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Note not found');

    const updatedNote = {
      ...notes.value[index],
      title,
      content,
      updatedAt: new Date()
    };

    notes.value = [
      ...notes.value.slice(0, index),
      updatedNote,
      ...notes.value.slice(index + 1)
    ]
    
    saveNotes(notes.value);
    return updatedNote;
  };

  const deleteNote = async (id: number): Promise<void> => {
    notes.value = notes.value.filter(note => note.id !== id);
    saveNotes(notes.value);
  };

  return {
    notes: computed(() => notes.value),
    addNote,
    updateNote,
    deleteNote
  };
};

export const provideNotes = () => {
  const api = useNotesApi();
  provide('notes', api.notes);
  provide('addNote', api.addNote);
  provide('editNote', api.updateNote);
  provide('deleteNote', api.deleteNote);
}