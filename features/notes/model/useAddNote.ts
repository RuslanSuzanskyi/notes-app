import { useField, useForm } from 'vee-validate';
import { useNotes } from "../../../entities/note/model/useNotes"
import { noteSchema } from '~/entities/note/validation/schema';

export const useAddNote = () => {
  const { addNote } = useNotes();
  const isSubmitting = ref(false);
  const error = ref<Error | null>(null);

  const { handleSubmit, resetForm } = useForm({
    validationSchema: noteSchema,
    initialValues: {
      title: '',
      content: ''
    }
  });

  const { value: title, errorMessage: titleError } = useField<string>('title');
  const { value: content, errorMessage: contentError } = useField<string>('content');

  const resetHeight = () => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      isSubmitting.value = true;
      await addNote(values.title, values.content);
      resetForm();
    } catch (err) {
      error.value = err as Error;
    } finally {
      isSubmitting.value = false;
    }
  });  

  return {
    resetHeight,
    onSubmit,
    isSubmitting,
    error,
    title,
    content,
    titleError,
    contentError,
  };
};