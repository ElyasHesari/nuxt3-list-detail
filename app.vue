<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

const handleError = (error: any) => {
  console.error('Global error:', error)
}

if (import.meta.client) {
  window.addEventListener('error', handleError)
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason)
  })
}
</script>