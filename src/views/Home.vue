<script setup lang="ts">
import NeighborhoodCard from '@/components/NeighborhoodCard.vue';
import { neighborhoods } from '@/utils/recommendation';
</script>

<template>
  <section class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
    <div class="pt-4">
      <p class="section-label">Taipei Living Match</p>
      <h1 class="max-w-3xl font-display text-5xl leading-tight text-ink sm:text-6xl">
        不是找最便宜的房子，是找最像你的台北生活
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
        用 5 題生活風格測驗，找到更適合你的台北生活圈。這不是房仲網站，而是一張把租金、氛圍與個性放在一起看的女子圖鑑。
      </p>

      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/quiz"
          class="editorial-button"
        >
          開始測看看
        </RouterLink>
        <RouterLink
          to="/map"
          class="editorial-button-secondary"
        >
          先看地圖
        </RouterLink>
      </div>
    </div>

    <aside class="editorial-card overflow-hidden p-6 sm:p-8">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.22em] text-rosewood/60">MVP Focus</p>
          <h2 class="mt-2 font-display text-3xl text-ink">6 個生活圈</h2>
        </div>
        <span class="editorial-chip">
          quiz + map
        </span>
      </div>

      <div class="mt-8 grid gap-3 text-sm text-ink/70">
        <div class="flex items-center justify-between border-b border-rosewood/10 pb-3">
          <span>人格推薦</span>
          <strong class="font-medium text-ink">Top 1 + Top 2</strong>
        </div>
        <div class="flex items-center justify-between border-b border-rosewood/10 pb-3">
          <span>租金視角</span>
          <strong class="font-medium text-ink">區間假資料</strong>
        </div>
        <div class="flex items-center justify-between pb-3">
          <span>地圖互動</span>
          <strong class="font-medium text-ink">Marker Popup</strong>
        </div>
      </div>
    </aside>
  </section>

  <section class="mt-16">
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <p class="section-label">Neighborhood Preview</p>
        <h2 class="font-display text-4xl text-ink">先感受你可能會愛上的區域</h2>
      </div>
      <RouterLink class="text-sm text-rosewood underline-offset-4 hover:underline" to="/map">
        查看簡化地圖
      </RouterLink>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <NeighborhoodCard
        v-for="neighborhood in neighborhoods"
        :key="neighborhood.id"
        :neighborhood="neighborhood"
      />
    </div>
  </section>
</template>
