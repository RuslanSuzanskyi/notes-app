<template>
  <form @submit.prevent="handleSubmit" class="mx-auto my-0 mb-10">
    <div class="mb-5 flex flex-col">
      <div class="mb-5">
        <label for="title">Title</label>
        <Input 
          id="title" 
          v-model="title"
          type="text"
          placeholder="Write a title"  
        />
        <p v-if="titleError" class="text-red-500 text-xs mt-1">{{ titleError }}</p>
      </div>

      <div>
        <label for="content">Description</label>
        <Textarea
          id="content"
          v-model="content"
          type="text"
          placeholder="Enter note content"
        />
        <p v-if="contentError" class="text-red-500 text-xs mt-1">{{ contentError }}</p>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <Button type="submit" class="bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300">Add Note</Button>
    </div> 
  </form>
</template>

<script setup lang="ts">
import { useAddNote } from '~/features/notes/model/useAddNote';
import Button from '~/shared/ui/Button.vue';
import Input from '~/shared/ui/Input.vue';
import Textarea from '~/shared/ui/Textarea.vue';

const { title, content, titleError, contentError, onSubmit, resetHeight } = useAddNote();

const handleSubmit = async () => {
  resetHeight();
  await onSubmit();
};
</script>
