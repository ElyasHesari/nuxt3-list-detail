<template>
  <div>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Blog Posts</h1>
      <p class="text-gray-600">Explore our latest articles and stories</p>
    </div>

    <!-- Loading State -->
    <div
      v-if="blogStore.loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <BlogSkeleton v-for="n in 6" :key="n" />
    </div>

    <!-- Error State -->
    <UiErrorMessage
      v-else-if="blogStore.error"
      title="Failed to Load Posts"
      :message="blogStore.error"
      :retry="true"
      @retry="loadPosts"
    />

    <!-- Posts Grid -->
    <div
      v-else-if="blogStore.posts.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <BlogCard v-for="post in blogStore.posts" :key="post.id" :post="post" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <p class="text-2xl text-gray-600">No blog posts found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "~/stores/blog";

const blogStore = useBlogStore();

const loadPosts = async () => {
  try {
    await blogStore.fetchPosts();
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
};

onMounted(() => {
  if (blogStore.posts.length === 0) {
    loadPosts();
  }
});

// SEO
useHead({
  title: "Blog Posts - Discover Amazing Stories",
  meta: [
    {
      name: "description",
      content:
        "Browse our collection of blog posts covering travel, food, culture and more",
    },
    { name: "keywords", content: "blog, articles, travel, food, culture" },
    { property: "og:title", content: "Blog Posts - Discover Amazing Stories" },
    { property: "og:type", content: "website" },
  ],
});
</script>
