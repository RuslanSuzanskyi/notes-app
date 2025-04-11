import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  title: 
    yup.string()
    .required('Title is required'),
  content: 
    yup.string()
    .required('Content is required'),
});

export type NoteCreateDTO = yup.InferType<typeof noteSchema>
