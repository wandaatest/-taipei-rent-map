<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import NeighborhoodCard from '@/components/NeighborhoodCard.vue';
import { neighborhoods } from '@/utils/recommendation';

const heroImages = [
  {
    src: `${import.meta.env.BASE_URL}images/cecelia-chang-c9j4LbVfYB8-unsplash.jpg`,
    photographer: 'Cecelia Chang',
  },
  {
    src: `${import.meta.env.BASE_URL}images/eric-barbeau-Y18Z6_8oQDk-unsplash.jpg`,
    photographer: 'Eric Barbeau',
  },
  {
    src: `${import.meta.env.BASE_URL}images/eric-barbeau-rJ1igIZDcAI-unsplash.jpg`,
    photographer: 'Eric Barbeau',
  },
  {
    src: `${import.meta.env.BASE_URL}images/h-co-XF2wVQavn1I-unsplash.jpg`,
    photographer: 'H Co',
  },
  {
    src: `${import.meta.env.BASE_URL}images/james-hunt-vB9MXOO4UdI-unsplash.jpg`,
    photographer: 'James Hunt',
  },
  {
    src: `${import.meta.env.BASE_URL}images/john-chen-kXISESiJCC0-unsplash.jpg`,
    photographer: 'John Chen',
  },
  {
    src: `${import.meta.env.BASE_URL}images/mao-jiang-1u-Ar4mNbdg-unsplash.jpg`,
    photographer: 'Mao Jiang',
  },
] as const;
const heroImageUrl = heroImages[5].src;
const activeHeroImageIndex = ref(0);
const activeHeroImage = computed(() => heroImages[activeHeroImageIndex.value] ?? heroImages[0]);
let heroInterval: number | undefined;

const editorialNotes = [
  '有些人想住在捷運口，有些人想住在下班後還願意多走一段的街上。',
  '真正讓人留下來的，通常不是最便宜的租金，而是生活終於有了適合自己的節奏。',
];

onMounted(() => {
  heroInterval = window.setInterval(() => {
    activeHeroImageIndex.value = (activeHeroImageIndex.value + 1) % heroImages.length;
  }, 6800);
});

onBeforeUnmount(() => {
  if (heroInterval !== undefined) {
    window.clearInterval(heroInterval);
  }
});
</script>

<template>
  <section
    class="relative isolate -mx-4 overflow-hidden border-b border-rosewood/10 pb-16 pt-4 sm:-mx-6 lg:-mx-8"
  >
    <div class="absolute inset-0">
      <div
        v-for="(imageUrl, index) in heroImages"
        :key="imageUrl.src"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2400ms] ease-out"
        :class="activeHeroImageIndex === index ? 'opacity-100' : 'opacity-0'"
        :style="{ backgroundImage: `url(${imageUrl.src})` }"
      />
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(252,248,245,0.7),rgba(252,248,245,0.96))]" />
    <div class="absolute right-0 top-0 hidden h-full w-[44%] bg-[linear-gradient(90deg,rgba(252,248,245,0),rgba(252,248,245,0.16)_12%,rgba(252,248,245,0.62)_38%,rgba(252,248,245,0.88)_100%)] lg:block" />
    <div class="absolute bottom-4 right-4 z-20 bg-white/52 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-ink/48 backdrop-blur sm:bottom-6 sm:right-6">
      <span>Photo by {{ activeHeroImage.photographer }} via </span>
      <a class="text-rosewood/72 transition hover:text-rosewood" href="https://unsplash.com" target="_blank" rel="noreferrer">
        Unsplash
      </a>
    </div>

    <div class="relative z-10 px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.52fr)] lg:items-start">
        <div class="max-w-4xl">
          <p class="section-label">Taipei Living Match</p>
          <p class="mb-5 text-sm uppercase tracking-[0.35em] text-rosewood/55">Issue 01. Taipei Her Atlas</p>
          <h1 class="max-w-4xl font-display text-5xl leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
            不是在台北找一個地址，
            <span class="block text-rosewood">是在替日常挑一種氣味</span>
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
            用 5 題生活風格測驗，把租屋、街區氣味與生活節奏放在同一張地圖上。你會慢慢發現，真正想住下來的地方，往往不是最熱鬧的那一區，而是最像你自己的那一種日常。
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
          <div class="absolute left-6 top-6 h-40 w-24 bg-[#f4e9e5]/52" />
          <div class="absolute right-8 top-8 h-52 w-36 bg-[#ecdfda]/74" />
          <div class="absolute bottom-8 left-10 h-44 w-44 bg-[#f1ebe6]/78" />
          <div class="absolute bottom-14 right-6 h-28 w-32 bg-[#eadfd8]/72" />

          <div class="relative z-10 ml-auto grid h-full max-w-[19rem] grid-rows-[auto_1fr_auto] border-l border-rosewood/10 pl-6">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-rosewood/60">Field Note</p>
              <p class="mt-4 font-display text-4xl leading-tight text-ink">
                台北不是只有
                <span class="block">匆忙與霓虹。</span>
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
      </div>
    </div>
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
