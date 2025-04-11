import { useNotes } from "~/entities/note/model/useNotes";

export const useDeleteNote = () => {
  const { deleteNote } = useNotes();
  const isDeleting = ref(false);
  const error = ref<Error | null>(null);

  const submitDelete = async (id: number) => {
    try {
      isDeleting.value = true;
      await deleteNote(id);
    } catch (err) {
      error.value = err as Error;
    } finally {
      isDeleting.value = false;
    }
  };

  return { submitDelete, isDeleting, error };
}