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

    <div class="mt-6 border-t border-rosewood/10 pt-5">
      <p class="mb-4 text-xs uppercase tracking-[0.22em] text-rosewood/55">Living Details</p>

      <dl class="grid gap-6 text-sm">
        <div class="px-1">
          <dt class="block text-[11px] uppercase tracking-[0.2em] text-ink/42">租金區間</dt>
          <dd class="mt-3 block font-display text-3xl leading-tight text-ink">{{ neighborhood.rentRange }}</dd>
        </div>

        <div class="grid gap-x-6 gap-y-5 border-t border-rosewood/8 pt-5 md:grid-cols-3">
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">生活氛圍</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.vibe }}</dd>
          </div>
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表市場</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.market }}</dd>
          </div>
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表街區</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.street }}</dd>
          </div>
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">推薦咖啡</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.cafe }}</dd>
          </div>
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">風格選物店</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.selectShop }}</dd>
          </div>
          <div class="min-h-[88px]">
            <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">特色早餐店</dt>
            <dd class="mt-3 block text-base leading-6 text-ink">{{ neighborhood.breakfast }}</dd>
          </div>
        </div>

        <div class="border-t border-rosewood/8 pt-5">
          <dt class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">居住名人</dt>
          <dd class="mt-3 block text-base leading-7 text-ink">{{ neighborhood.notableResident }}</dd>
        </div>
      </dl>
    </div>

    <p v-if="score !== undefined" class="mt-5 text-sm uppercase tracking-[0.18em] text-rosewood/75">
      Match Score {{ score }}
    </p>
  </article>
</template>
