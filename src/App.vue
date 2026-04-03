<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMapPage = computed(() => route.path === '/map');
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header class="mb-10 flex items-center justify-between border-b border-rosewood/10 pb-5">
        <RouterLink to="/" class="font-display text-xl tracking-[0.2em] text-rosewood uppercase">
          Taipei Her Map
        </RouterLink>
        <nav class="flex items-center gap-3 text-sm text-ink/70">
          <RouterLink class="border-b border-transparent pb-1 transition hover:border-rosewood/40 hover:text-rosewood" to="/">Home</RouterLink>
          <RouterLink class="border-b border-transparent pb-1 transition hover:border-rosewood/40 hover:text-rosewood" to="/quiz">Quiz</RouterLink>
          <RouterLink class="border-b border-transparent pb-1 transition hover:border-rosewood/40 hover:text-rosewood" to="/map">Map</RouterLink>
        </nav>
      </header>

      <main class="flex-1" :class="isMapPage ? '-mx-4 sm:-mx-6 lg:-mx-8' : ''">
        <RouterView />
      </main>
    </div>
  </div>
</template>
