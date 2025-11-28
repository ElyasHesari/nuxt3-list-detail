<template>
  <div class="text-center py-20">
    <h1 class="text-5xl font-bold text-gray-900 mb-6">Welcome to Our Blog</h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Discover amazing stories, insights, and experiences from around the world
    </p>
    <NuxtLink
      to="/blog"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
    >
      Explore Blog Posts
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home - Blog Platform",
  meta: [
    {
      name: "description",
      content:
        "Welcome to our blog platform where you can discover amazing stories and insights",
    },
  ],
});
</script>
