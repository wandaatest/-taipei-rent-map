<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import ResultCard from '@/components/ResultCard.vue';
import { useQuizStore } from '@/stores/quiz';
import { quizQuestions } from '@/utils/recommendation';

const router = useRouter();
const { recommendation, answers, resetAnswers } = useQuizStore();

const result = computed(() => recommendation());
const editorialLead = computed(() => {
  if (!result.value) {
    return '';
  }

  return `如果把台北的居住感寫成一本城市雜誌，你這一期的封面大概會落在 ${result.value.top.name}。這不是標準答案，而是最接近你現在生活節奏的一種提案。`;
});
const lifestyleNotes = computed(() => {
  if (!result.value) {
    return [];
  }

  const noteMap: Record<string, Array<{ label: string; text: string }>> = {
    'daan-tech': [
      { label: 'Furniture', text: '家具可能會選線條乾淨的書桌、層架和一張坐得久也不累的工作椅。' },
      { label: 'Groceries', text: '採買偏向超市熟食、精品咖啡與能快速完成晚餐的冰箱常備菜。' },
      { label: 'Eating Habit', text: '外食比例通常不低，但還是會在某個平日晚上煮一鍋簡單的義大利麵或湯。' },
    ],
    'zhongshan-shuanglian': [
      { label: 'Furniture', text: '家裡會有選物感的餐具、落地燈，還有一張讓朋友願意坐下來聊天的小桌子。' },
      { label: 'Groceries', text: '採買常發生在巷子裡的麵包店、朝市與下班後順手走進去的酒鋪。' },
      { label: 'Eating Habit', text: '外食和小酌都很合理，但也會為了某個週末早午餐自己準備水果、麵包和奶油。' },
    ],
    'xinyi-cityhall': [
      { label: 'Furniture', text: '家具傾向俐落現代，可能會買帶金屬細節的邊桌、全身鏡和收納做得好的衣櫃。' },
      { label: 'Groceries', text: '採買習慣偏向百貨超市、進口食材與方便加熱的高機能型晚餐。' },
      { label: 'Eating Habit', text: '外食頻率高，喜歡下樓就有餐廳可選；真要煮也多半是快速、乾淨、好整理的料理。' },
    ],
    'wanhua-ximen': [
      { label: 'Furniture', text: '家具會比較混搭，可能是二手木櫃、老件鏡子和一張很有個性的單椅。' },
      { label: 'Groceries', text: '採買常來自市場、老店和順路看到就想買的小吃。' },
      { label: 'Eating Habit', text: '外食比例高，但偶爾也會想在深夜回家後，自己煎蛋、煮泡麵或炒一點家常菜。' },
    ],
    'shilin-tianmu': [
      { label: 'Furniture', text: '家具會重視舒適感，像是寬沙發、木餐桌與能長時間待著的地毯區。' },
      { label: 'Groceries', text: '採買習慣偏向超市、進口雜貨與適合囤放的日常食材。' },
      { label: 'Eating Habit', text: '比起天天外食，更像是平日簡單煮、週末慢慢做一餐的人。' },
    ],
    'wenshan-jingmei-muzha': [
      { label: 'Furniture', text: '家具會想要實用耐看，有收納能力的櫃體、柔和床品和能安靜待著的小角落。' },
      { label: 'Groceries', text: '採買可能是市場青菜、便宜水果和能讓冰箱維持安心感的家常食材。' },
      { label: 'Eating Habit', text: '雖然也會外食，但更適合自己煮，做一些湯、燉菜或可以吃兩餐的便當菜。' },
    ],
  };

  return noteMap[result.value.top.id] ?? [];
});

watchEffect(() => {
  if (answers.value.filter(Boolean).length !== quizQuestions.length || !result.value) {
    router.replace('/quiz');
  }
});

function retryQuiz() {
  resetAnswers();
  router.push('/quiz');
}
</script>

<template>
  <section v-if="result" class="mx-auto max-w-5xl">
    <div class="mb-8 max-w-4xl">
        <p class="section-label">Your Editorial Match</p>
        <h1 class="font-display text-5xl leading-tight text-ink">
          你的台北人格類型是「{{ result.top.personalityType }}」
        </h1>
        <p class="mt-5 text-lg leading-8 text-ink/68">
          你最適合的生活圈是 <strong>{{ result.top.name }}</strong>。它兼顧了你在生活節奏、街區氛圍與租金感受上的偏好。
        </p>
        <p class="mt-6 max-w-3xl text-sm leading-8 text-ink/62">
          {{ editorialLead }}
        </p>
    </div>

    <div class="mb-10 grid gap-8 border-b border-rosewood/10 pb-10 lg:grid-cols-[1.08fr_0.52fr]">
      <div class="max-w-3xl">
        <p class="text-xs uppercase tracking-[0.24em] text-rosewood/55">Living Tips</p>
        <div class="mt-5 grid gap-6 md:grid-cols-3">
          <article
            v-for="note in lifestyleNotes"
            :key="note.label"
            class="border-l border-rosewood/10 pl-4"
          >
            <p class="text-[11px] uppercase tracking-[0.2em] text-rosewood/52">{{ note.label }}</p>
            <p class="mt-3 text-sm leading-7 text-ink/66">{{ note.text }}</p>
          </article>
        </div>
      </div>

      <aside class="self-end border-l border-rosewood/10 pl-6">
        <p class="text-xs uppercase tracking-[0.24em] text-rosewood/55">Margin Note</p>
        <p class="mt-4 font-display text-3xl leading-tight text-ink">
          不是搬去
          <span class="block text-rosewood/82">最厲害的地方。</span>
        </p>
        <p class="mt-4 text-sm leading-7 text-ink/66">
          而是搬去一個讓你平日也能像自己、週末也不需要勉強出門演別人的地方。
        </p>
      </aside>
    </div>

    <div class="grid gap-6">
      <ResultCard
        :neighborhood="result.top"
        title="Top Match"
        subtitle="最推薦區域"
        :score="result.ranked[0].score"
      />
      <div class="grid gap-6 lg:grid-cols-2">
        <ResultCard
          v-for="item in result.secondary"
          :key="item.id"
          :neighborhood="item"
          title="Runner-Up"
          subtitle="次推薦生活圈"
          :score="result.ranked.find((ranked) => ranked.id === item.id)?.score"
        />
      </div>
    </div>

    <div class="mt-10 flex flex-wrap gap-4">
      <RouterLink
        to="/map"
        class="editorial-button"
      >
        到地圖看看
      </RouterLink>
      <button
        class="editorial-button-secondary"
        @click="retryQuiz"
      >
        重做測驗
      </button>
    </div>
  </section>
</template>
