<script setup lang="ts">
import type { Neighborhood } from '@/types/app';

defineProps<{
  neighborhood: Neighborhood;
  title: string;
  subtitle: string;
  score?: number;
}>();
</script>

<template>
  <article class="editorial-card p-6 sm:p-7">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-rosewood/10 pb-4">
      <div>
        <p class="text-xs uppercase tracking-[0.22em] text-rosewood/60">{{ title }}</p>
        <h3 class="mt-2 font-display text-3xl text-ink">{{ neighborhood.name }}</h3>
      </div>
      <span class="editorial-chip">
        {{ neighborhood.personalityType }}
      </span>
    </div>

    <p class="mb-5 text-sm text-ink/65">{{ subtitle }}</p>

    <dl class="grid gap-4 text-sm sm:grid-cols-2">
      <div class="editorial-panel p-4">
        <dt class="mb-1 text-ink/50">租金區間</dt>
        <dd class="font-medium text-ink">{{ neighborhood.rentRange }}</dd>
      </div>
      <div class="editorial-panel p-4">
        <dt class="mb-1 text-ink/50">生活氛圍</dt>
        <dd class="text-ink">{{ neighborhood.vibe }}</dd>
      </div>
      <div class="editorial-panel p-4">
        <dt class="mb-1 text-ink/50">代表市場</dt>
        <dd class="text-ink">{{ neighborhood.market }}</dd>
      </div>
      <div class="editorial-panel p-4">
        <dt class="mb-1 text-ink/50">代表街區</dt>
        <dd class="text-ink">{{ neighborhood.street }}</dd>
      </div>
    </dl>

    <p v-if="score !== undefined" class="mt-5 text-sm uppercase tracking-[0.18em] text-rosewood/75">
      Match Score {{ score }}
    </p>
  </article>
</template>
