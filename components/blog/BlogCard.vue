<template>
  <NuxtLink
    :to="`/blog/${post.namak}`"
    class="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
  >
    <div class="aspect-video overflow-hidden">
      <!-- <img
        :src="`https://api.selectcoman.ir${post.cover}`"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      /> -->
    </div>

    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span
          class="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full"
        >
          {{ post.tags }}
        </span>
        <span class="text-sm text-gray-500">
          {{ formatDate(post.created_at) }}
        </span>
      </div>

      <h3
        class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
      >
        {{ post.title }}
      </h3>

      <div
        class="text-gray-600 text-sm line-clamp-3 mb-4"
        v-html="stripHtml(post.description)"
      />

      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center gap-4">
          <span>👁️ {{ post.view }}</span>
          <span>⭐ {{ post.rating }}</span>
        </div>
        <span class="text-blue-600 font-medium group-hover:underline">
          Read More →
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

const props = defineProps<{
  post: BlogPost;
}>();

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
