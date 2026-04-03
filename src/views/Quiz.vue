<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import QuizQuestion from '@/components/QuizQuestion.vue';
import { useQuizStore } from '@/stores/quiz';
import { quizQuestions } from '@/utils/recommendation';

const router = useRouter();
const { answers, setAnswer, resetAnswers } = useQuizStore();

const progress = computed(() => `${answers.value.filter(Boolean).length} / ${quizQuestions.length}`);
const isComplete = computed(() => answers.value.filter(Boolean).length === quizQuestions.length);

function submitQuiz() {
  if (!isComplete.value) {
    return;
  }

  router.push('/result');
}
</script>

<template>
  <section class="mx-auto max-w-4xl">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="section-label">Style Quiz</p>
        <h1 class="font-display text-5xl text-ink">5 題測出你的台北生活圈</h1>
        <p class="mt-4 max-w-2xl text-base leading-8 text-ink/68">
          每一題都會為不同區域加權計分，最後會給你最推薦的 1 區與次推薦 2 區。
        </p>
      </div>
      <div class="editorial-card w-full max-w-xs p-5 sm:w-64">
        <p class="text-xs uppercase tracking-[0.22em] text-rosewood/60">Progress</p>
        <p class="mt-2 font-display text-4xl text-ink">{{ progress }}</p>
      </div>
    </div>

    <div class="space-y-6">
      <QuizQuestion
        v-for="(question, index) in quizQuestions"
        :key="question.id"
        :question="question"
        :selected-option-id="answers[index]"
        @select="setAnswer(index, $event)"
      />
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      <button
        class="editorial-button disabled:cursor-not-allowed disabled:border-ink/35 disabled:bg-ink/35"
        :disabled="!isComplete"
        @click="submitQuiz"
      >
        查看結果
      </button>
      <button
        class="editorial-button-secondary"
        @click="resetAnswers"
      >
        重新作答
      </button>
    </div>
  </section>
</template>
