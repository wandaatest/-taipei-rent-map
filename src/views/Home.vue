<script setup lang="ts">
import NeighborhoodCard from '@/components/NeighborhoodCard.vue';
import { neighborhoods } from '@/utils/recommendation';

const editorialNotes = [
  '有些人想住在捷運口，有些人想住在下班後還願意多走一段的街上。',
  '真正讓人留下來的，通常不是最便宜的租金，而是生活終於有了適合自己的節奏。',
];
</script>

<template>
  <section class="grid gap-10 border-b border-rosewood/10 pb-16 pt-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.52fr)] lg:items-start">
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

      <div class="mt-14 grid max-w-4xl gap-6 border-t border-rosewood/10 pt-7 lg:grid-cols-[0.78fr_1.22fr]">
        <div class="pr-2">
          <p class="text-xs uppercase tracking-[0.25em] text-rosewood/52">Editor&apos;s Margin</p>
          <p class="mt-4 font-display text-3xl leading-tight text-ink">
            住哪裡，其實是
            <span class="block text-rosewood/82">在決定日子要長成什麼樣子。</span>
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="border-t border-rosewood/10 pt-3">
            <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Quiz</p>
            <p class="mt-3 text-sm leading-7 text-ink/72">5 題生活風格測驗，算出最適合你的生活圈。</p>
          </div>
          <div class="border-t border-rosewood/10 pt-3">
            <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Rent Mood</p>
            <p class="mt-3 text-sm leading-7 text-ink/72">不是只看價格，而是一起看氛圍與生活感。</p>
          </div>
          <div class="border-t border-rosewood/10 pt-3">
            <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">Map View</p>
            <p class="mt-3 text-sm leading-7 text-ink/72">用地圖快速比較 6 個生活圈的個性差異。</p>
          </div>
          <div class="border-t border-rosewood/10 pt-3">
            <p class="text-xs uppercase tracking-[0.22em] text-rosewood/55">What Matters</p>
            <p class="mt-3 text-sm leading-7 text-ink/72">你最後記住的，多半不是坪數，而是下樓後那條街讓不讓人想繼續住下去。</p>
          </div>
        </div>
      </div>
    </div>

    <aside class="relative min-h-[460px] border border-rosewood/10 bg-white/55 p-6 shadow-editorial">
      <div class="absolute left-6 top-6 h-40 w-24 border border-rosewood/10 bg-[#f3e4e0]/60" />
      <div class="absolute right-8 top-8 h-52 w-36 border border-rosewood/10 bg-[#ead8d2]" />
      <div class="absolute bottom-8 left-10 h-44 w-44 border border-rosewood/10 bg-[#efe7e0]" />
      <div class="absolute bottom-14 right-6 h-28 w-32 border border-rosewood/10 bg-[#e6d6ce]" />

      <div class="relative z-10 ml-auto grid h-full max-w-[19rem] grid-rows-[auto_1fr_auto] border-l border-rosewood/10 pl-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-rosewood/60">Field Note</p>
          <p class="mt-4 font-display text-4xl leading-tight text-ink">
            台北不是只有
            <span class="block">貴或便宜。</span>
          </p>
        </div>

        <div class="mt-8 space-y-5 self-center">
          <p
            v-for="note in editorialNotes"
            :key="note"
            class="text-sm leading-7 text-ink/68"
          >
            {{ note }}
          </p>
        </div>

        <div class="border-t border-rosewood/10 pt-4">
          <p class="text-[11px] uppercase tracking-[0.24em] text-rosewood/52">
            Taipei women&apos;s atlas
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
        <p class="mt-4 max-w-2xl text-sm leading-7 text-ink/66">
          這六個區不只是地理位置不同，而是下班後的步伐、週末的習慣、對熱鬧和安靜的容忍度都不太一樣。
        </p>
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
