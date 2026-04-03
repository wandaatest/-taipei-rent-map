<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import ResultCard from '@/components/ResultCard.vue';
import { useQuizStore } from '@/stores/quiz';
import { quizQuestions } from '@/utils/recommendation';

const router = useRouter();
const { recommendation, answers, resetAnswers } = useQuizStore();

const result = computed(() => recommendation());

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
    <div class="mb-8 max-w-3xl">
      <p class="section-label">Your Editorial Match</p>
      <h1 class="font-display text-5xl leading-tight text-ink">
        你的台北人格類型是「{{ result.top.personalityType }}」
      </h1>
      <p class="mt-5 text-lg leading-8 text-ink/68">
        你最適合的生活圈是 <strong>{{ result.top.name }}</strong>。它兼顧了你在生活節奏、街區氛圍與租金感受上的偏好。
      </p>
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
