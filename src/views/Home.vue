<script setup lang="ts">
import NeighborhoodCard from '@/components/NeighborhoodCard.vue';
import { neighborhoods } from '@/utils/recommendation';
</script>

<template>
  <section class="grid gap-10 border-b border-rosewood/10 pb-14 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
    <div class="max-w-4xl">
      <p class="section-label">Taipei Living Match</p>
      <p class="mb-5 text-sm uppercase tracking-[0.35em] text-rosewood/55">Issue 01. Taipei Her Atlas</p>
      <h1 class="max-w-4xl font-display text-5xl leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
        不是找最便宜的房子，
        <span class="block text-rosewood">是找最像你的台北生活</span>
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
        用 5 題生活風格測驗，把租金、街區氣味與生活節奏放在同一張地圖上。這不是房仲資料庫，而是一份偏向生活編輯視角的台北居住提案。
      </p>

      <div class="mt-10 flex flex-wrap gap-4">
        <RouterLink to="/quiz" class="editorial-button">
          開始測看看
        </RouterLink>
        <RouterLink to="/map" class="editorial-button-secondary">
          先看地圖
        </RouterLink>
      </div>

      <div class="mt-12 grid max-w-3xl gap-4 border-t border-rosewood/10 pt-6 sm:grid-cols-3">
        <div>
          <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Quiz</p>
          <p class="mt-2 text-sm leading-7 text-ink/72">5 題生活風格測驗，算出最適合你的生活圈。</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Rent Mood</p>
          <p class="mt-2 text-sm leading-7 text-ink/72">不是只看價格，而是一起看氛圍與生活感。</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Map View</p>
          <p class="mt-2 text-sm leading-7 text-ink/72">用地圖快速比較 6 個生活圈的個性差異。</p>
        </div>
      </div>
    </div>

    <aside class="relative min-h-[420px] border border-rosewood/10 bg-white/55 p-6 shadow-editorial">
      <div class="absolute left-6 top-6 h-40 w-24 border border-rosewood/10 bg-[#f3e4e0]/60" />
      <div class="absolute right-8 top-8 h-52 w-36 border border-rosewood/10 bg-[#ead8d2]" />
      <div class="absolute bottom-8 left-10 h-44 w-44 border border-rosewood/10 bg-[#efe7e0]" />
      <div class="absolute bottom-14 right-6 h-28 w-32 border border-rosewood/10 bg-[#e6d6ce]" />

      <div class="relative z-10 ml-auto flex h-full max-w-[18rem] flex-col justify-between border-l border-rosewood/10 pl-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-rosewood/60">Editorial Note</p>
          <p class="mt-4 font-display text-4xl leading-tight text-ink">
            台北不是只有
            <span class="block">貴或便宜。</span>
          </p>
        </div>

        <div class="border-t border-rosewood/10 pt-4">
          <p class="text-sm leading-7 text-ink/68">
            你可能在中山找到散步靈感，也可能在景美找回呼吸感。這份 MVP 先讓你從生活感出發，而不是先被租金嚇退。
          </p>
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
