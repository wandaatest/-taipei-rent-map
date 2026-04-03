<script setup lang="ts">
import type { Neighborhood } from '@/types/app';

defineProps<{
  neighborhood: Neighborhood;
}>();
</script>

<template>
  <article class="w-full border border-rosewood/10 bg-white/95 p-5 shadow-editorial">
    <p class="mb-2 text-xs uppercase tracking-[0.22em] text-rosewood/60">Area Note</p>
    <h3 class="font-display text-2xl text-ink">{{ neighborhood.name }}</h3>
    <p class="mt-3 text-sm leading-7 text-ink/70">{{ neighborhood.description }}</p>

    <div class="mt-4 grid gap-3 text-sm">
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">租金區間</span>
        <strong class="text-ink">{{ neighborhood.rentRange }}</strong>
      </div>
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">代表市場</span>
        <strong class="text-ink">{{ neighborhood.market }}</strong>
      </div>
    </div>
  </article>
</template>
