<template>
  <div class="mb-4">
    <textarea
      ref="textareaRef"
      :id="id"
      :value="props.modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="break-words whitespace-pre-wrap resize-none overflow-hidden mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue';
import type { Textarea } from '../types/types';

const props = defineProps<Textarea>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const resize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

const updateValue = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  emit('update:modelValue', value);
  nextTick(resize);
};

onMounted(() => {
  nextTick(resize);
});
</script>
