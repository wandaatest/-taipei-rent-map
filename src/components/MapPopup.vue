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
          <p class="mt-2 text-sm leading-7 text-ink/68">
            之後可放 {{ neighborhood.street }} 的代表街景照片，這裡先保留給你的實拍素材。
          </p>
        </div>
      </div>
    </div>

    <div class="mt-4 grid gap-3 text-sm">
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">租金區間</span>
        <strong class="text-ink">{{ neighborhood.rentRange }}</strong>
      </div>
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">代表市場</span>
        <strong class="text-ink">{{ neighborhood.market }}</strong>
      </div>
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">代表街區</span>
        <strong class="text-ink">{{ neighborhood.street }}</strong>
      </div>
      <div class="editorial-panel px-4 py-3">
        <span class="block text-ink/45">代表定位</span>
        <strong class="text-ink">{{ neighborhood.location.landmark }}</strong>
      </div>
    </div>
  </article>
</template>
