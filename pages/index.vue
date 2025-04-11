<script setup lang="ts">
import { provideNotes } from '~/entities/note/api/notes';
import NoteList from '~/entities/note/ui/NoteList.vue';
import AddNoteForm from '~/features/notes/ui/AddNoteForm.vue';

provideNotes();
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="p-4 not-first:sm:p-6 lg:p-8 max-w-screen-lg mx-auto w-full">
      <h1 class="mb-5 text-center text-3xl">Notes</h1>
      <AddNoteForm />
      <div>
        <h2 class="mb-5 text-center text-2xl">Your Notes</h2>
        <NoteList /> 
      </div>
    </div>
  </div>
</template>
