<script setup lang="ts">
import type { Neighborhood } from '@/types/app';

defineProps<{
  neighborhood: Neighborhood;
}>();
</script>

<template>
  <article class="editorial-card h-full p-6">
    <div class="mb-5 flex items-start justify-between gap-4 border-b border-rosewood/10 pb-5">
      <div>
        <p class="mb-2 text-xs uppercase tracking-[0.22em] text-rosewood/60">Neighborhood</p>
        <h3 class="font-display text-2xl text-ink">{{ neighborhood.name }}</h3>
      </div>
      <span
        class="border border-transparent px-3 py-1 text-xs font-medium text-white"
        :style="{ backgroundColor: neighborhood.accent }"
      >
        {{ neighborhood.personalityType }}
      </span>
    </div>

    <p class="mb-5 text-sm leading-7 text-ink/70">{{ neighborhood.description }}</p>

    <dl class="space-y-3 text-sm text-ink/75">
      <div class="flex items-start justify-between gap-3 border-t border-rosewood/10 pt-3">
        <dt>租金</dt>
        <dd class="text-right font-medium text-ink">{{ neighborhood.rentRange }}</dd>
      </div>
      <div class="flex items-start justify-between gap-3 border-t border-rosewood/10 pt-3">
        <dt>氛圍</dt>
        <dd class="max-w-[14rem] text-right">{{ neighborhood.vibe }}</dd>
      </div>
    </dl>

    <div class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="tag in neighborhood.tags"
        :key="tag"
        class="bg-sand px-3 py-1 text-xs text-[#c49a88]"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
