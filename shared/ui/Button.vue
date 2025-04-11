<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="handleClick"
    :class="customClass"
    class="cursor-pointer focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { Button } from '../types/types';

const props = defineProps<Button>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

