<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div class="text-red-600 text-5xl mb-4">⚠️</div>
    <h3 class="text-xl font-bold text-red-900 mb-2">{{ title }}</h3>
    <p class="text-red-700 mb-4">{{ message }}</p>
    <button
      v-if="retry"
      class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      @click="$emit('retry')"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  message: string;
  retry?: boolean;
}>();

defineEmits<{
  retry: [];
}>();
</script>
