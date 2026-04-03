<script setup lang="ts">
import type { Neighborhood } from '@/types/app';

defineProps<{
  neighborhood: Neighborhood;
  expanded?: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <article class="editorial-card w-full p-6 sm:p-7">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-rosewood/10 pb-4">
      <div>
        <p class="text-xs uppercase tracking-[0.22em] text-rosewood/60">Area Note</p>
        <h3 class="mt-2 font-display text-3xl text-ink">{{ neighborhood.name }}</h3>
      </div>
      <span class="editorial-chip">
        {{ neighborhood.personalityType }}
      </span>
    </div>

    <p class="mb-5 text-sm leading-7 text-ink/65">{{ neighborhood.description }}</p>

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
      <div class="mb-4 flex items-center justify-between gap-4">
        <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Living Details</p>
        <button
          class="text-[11px] uppercase tracking-[0.18em] text-rosewood/75 transition hover:text-rosewood"
          @click="emit('toggle')"
        >
          {{ expanded ? '收起資訊' : '展開更多' }}
        </button>
      </div>

      <div class="grid gap-6 text-sm">
        <div class="px-1">
          <span class="block text-[11px] uppercase tracking-[0.2em] text-ink/42">租金區間</span>
          <strong class="mt-3 block font-display text-3xl leading-tight text-ink">
            {{ neighborhood.rentRange }}
          </strong>
        </div>

        <div
          v-if="expanded"
          class="grid gap-x-6 gap-y-5 border-t border-rosewood/8 pt-5 md:grid-cols-3"
        >
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表市場</span>
            <p class="mt-3 text-base leading-6 text-ink">{{ neighborhood.market }}</p>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">代表街區</span>
            <p class="mt-3 text-base leading-6 text-ink">{{ neighborhood.street }}</p>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">推薦咖啡</span>
            <p class="mt-3 text-base leading-6 text-ink">{{ neighborhood.cafe }}</p>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">風格選物店</span>
            <p class="mt-3 text-base leading-6 text-ink">{{ neighborhood.selectShop }}</p>
          </div>
          <div class="min-h-[88px]">
            <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">特色早餐店</span>
            <p class="mt-3 text-base leading-6 text-ink">{{ neighborhood.breakfast }}</p>
          </div>
        </div>

        <div v-if="expanded" class="border-t border-rosewood/8 pt-5">
          <span class="block text-[11px] uppercase tracking-[0.18em] text-ink/40">居住名人</span>
          <p class="mt-3 text-base leading-7 text-ink">{{ neighborhood.notableResident }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
