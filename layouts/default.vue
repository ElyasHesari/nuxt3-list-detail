<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
            Blog Platform
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            All Posts
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t mt-16">
      <div class="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 Blog Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
