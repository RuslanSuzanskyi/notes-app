<template>
  <ul v-if="notes.length > 0">
    <li v-for="note in notes" :key="note.id">
      <NoteItem :note="note"/>
    </li>
  </ul>
  <p v-else>No notes available. Please add a note.</p>
</template>

<script setup lang="ts">
import { useNotes } from '../model/useNotes';
import NoteItem from './NoteItem.vue';

const { notes } = useNotes(); 
</script>