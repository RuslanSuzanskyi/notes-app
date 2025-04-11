<template>
  <div class="p-4 border border-gray-200 rounded mb-5">
    <div v-if="isEditing">
      <label for="title">Title</label>
      <Input
        id="title"
        v-model="updatedTitle" 
        type="text" 
        placeholder="Enter title"
      />
      <label for="content">Description</label>
      <Textarea
        id="content"
        v-model="updatedContent" 
        placeholder="Enter content"
        class="mb-5"
      />
      <div class="flex items-center justify-end">
        <Button @click="handleSave" class=" bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300">
          Save
        </Button>
        <Button @click="handleCancel" class="bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300">
          Cancel
        </Button>
      </div>
    </div>
    
    <div v-else>
      <h3 class="text-2xl font-bold mb-3">{{ note.title }}</h3>
      <p class="mb-5">{{ note.content }}</p>
      <div class="flex items-center justify-end">
        <Button @click="handleEdit" class=" bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300">
          Edit
        </Button>

        <Button @click="handleDelete" class="bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300">
          Delete
        </Button>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/shared/ui/Button.vue';
import type { Note } from '../types/types';
import Input from '~/shared/ui/Input.vue';
import Textarea from '~/shared/ui/Textarea.vue';
import { useDeleteNote } from '~/features/notes/model/useDeleteNote';
import { useEditNote } from '~/features/notes/model/useEditNote';

const props = defineProps<{
  note: Note;
}>();

const emit = defineEmits<{
  (e: 'edit', note: Note): void;
  (e: 'delete', id: number): void;
}>();

const { submitDelete } = useDeleteNote();
const { submitEdit } = useEditNote();

const updatedTitle = ref(props.note.title);
const updatedContent = ref(props.note.content);
const isEditing = ref(false);

const handleEdit = () => {
  isEditing.value = true;
};

const handleCancel = () => {
  updatedTitle.value = props.note.title;
  updatedContent.value = props.note.content;
  isEditing.value = false;
};

const handleSave = async () => {
  const updatedNote = {
    ...props.note,
    title: updatedTitle.value,
    content: updatedContent.value,
  };

  await submitEdit(props.note.id, updatedNote.title, updatedNote.content);
  emit('edit', updatedNote);
  isEditing.value = false;
};

const handleDelete = async() => {
  await submitDelete(props.note.id);
  emit('delete', props.note.id);
};
</script>
