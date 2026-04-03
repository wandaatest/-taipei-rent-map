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

    <div class="mt-5 border border-rosewood/10 bg-[linear-gradient(145deg,rgba(243,228,224,0.9),rgba(234,216,210,0.72),rgba(255,255,255,0.9))] p-4">
      <div class="flex min-h-[180px] flex-col justify-between border border-white/60 p-4">
        <div class="flex items-start justify-between gap-4">
          <span class="text-xs uppercase tracking-[0.24em] text-rosewood/60">Photo Placeholder</span>
          <span class="editorial-chip">Coming Soon</span>
        </div>
        <div>
          <p class="font-display text-3xl text-ink">{{ neighborhood.shortName }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 border-t border-rosewood/10 pt-5">
      <p class="mb-4 text-xs uppercase tracking-[0.22em] text-rosewood/55">Living Details</p>

      <div class="grid gap-6 text-sm">
        <div class="px-1">
          <span class="block text-[11px] uppercase tracking-[0.2em] text-ink/42">租金區間</span>
          <strong class="mt-3 block font-display text-3xl leading-tight text-ink">
            {{ neighborhood.rentRange }}
          </strong>
        </div>

        <div class="grid gap-x-6 gap-y-5 border-t border-rosewood/8 pt-5 md:grid-cols-3">
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表市場</span>
            <strong class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.market }}</strong>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表街區</span>
            <strong class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.street }}</strong>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表定位</span>
            <strong class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.location.landmark }}</strong>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
