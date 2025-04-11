import { useNotes } from "~/entities/note/model/useNotes";

export function useEditNote() {
  const { editNote } = useNotes();
  const loading = ref(false);

  const submitEdit = async (id: number, title: string, content: string) => {
    loading.value = true;

    try {
      const updatedNote = await editNote(id, title, content);
      console.log('Note updated:', updatedNote);
    } catch (error) {
      console.error('Error editing note:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    submitEdit,
    loading,
  };
}
