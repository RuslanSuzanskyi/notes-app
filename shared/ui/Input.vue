<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :value="props.modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Input } from '../types/types';

const props = defineProps<Input>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
