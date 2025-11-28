<template>
  <div>
    <!-- Loading State -->
    <div v-if="blogStore.loading" class="max-w-4xl mx-auto">
      <div class="animate-pulse space-y-6">
        <div class="h-10 bg-gray-300 rounded w-3/4" />
        <div class="aspect-video bg-gray-300 rounded-lg" />
        <div class="space-y-3">
          <div class="h-4 bg-gray-300 rounded" />
          <div class="h-4 bg-gray-300 rounded" />
          <div class="h-4 bg-gray-300 rounded w-5/6" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <ErrorMessage
      v-else-if="blogStore.error"
      title="Post Not Found"
      :message="blogStore.error"
      :retry="true"
      @retry="loadPost"
    />

    <!-- Post Content -->
    <article v-else-if="post" class="max-w-4xl mx-auto">
      <header class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="inline-block px-4 py-1.5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full"
          >
            {{ post.descriptions.tags }}
          </span>
          <span class="text-gray-500">
            {{ formatDate(post.details.created_at) }}
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ post.descriptions.title }}
        </h1>

        <div class="flex items-center gap-6 text-gray-600">
          <span>👁️ {{ post.details.view }} views</span>
          <span>⭐ {{ post.details.rating }} rating</span>
        </div>
      </header>

      <!-- Banner Image -->
      <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
        
      </div>

      <!-- Content -->
      <div
        class="prose prose-lg max-w-none mb-12"
        v-html="post.descriptions.description"
      />


      <!-- Popular Posts -->
      <div v-if="post.popular_post.length > 0" class="border-t pt-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Related Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BlogCard
            v-for="relatedPost in post.popular_post.slice(0, 3)"
            :key="relatedPost.id"
            :post="relatedPost"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "~/stores/blog";

const route = useRoute();
const blogStore = useBlogStore();
const namak = route.params.namak as string;

const post = computed(() => blogStore.currentPost);

const loadPost = async () => {
  try {
    await blogStore.fetchPostByNamak(namak);
  } catch (error) {
    console.error("Failed to load post:", error);
  }
};

onMounted(() => {
  loadPost();
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// SEO 
useHead(() => ({
  title:
    post.value?.descriptions.title_tag ||
    post.value?.descriptions.title ||
    "Blog Post",
  meta: [
    {
      name: "description",
      content:
        post.value?.descriptions.meta_tag_description ||
        post.value?.descriptions.description
          .replace(/<[^>]*>/g, "")
          .substring(0, 160) ||
        "Read this blog post",
    },
    {
      name: "keywords",
      content:
        post.value?.descriptions.meta_tag_keys ||
        post.value?.descriptions.tags ||
        "",
    },
    {
      property: "og:title",
      content: post.value?.descriptions.title || "Blog Post",
    },
    {
      property: "og:description",
      content: post.value?.descriptions.meta_tag_description || "",
    },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: post.value?.descriptions.canonical
    ? [{ rel: "canonical", href: post.value.descriptions.canonical }]
    : [],
}));
</script>

<style scoped>
:deep(.prose) {
  @apply text-gray-700;
}

:deep(.prose h4) {
  @apply text-2xl font-bold text-gray-900 mb-4 mt-6;
}

:deep(.prose p) {
  @apply mb-4 leading-relaxed;
}

:deep(.prose img) {
  @apply rounded-lg shadow-md my-6;
}
</style>
