<script setup lang="ts">
import type { QuizQuestionData } from '@/types/app';

defineProps<{
  question: QuizQuestionData;
  selectedOptionId?: string;
}>();

const emit = defineEmits<{
  select: [optionId: string];
}>();
</script>

<template>
  <section class="editorial-card p-6 sm:p-8">
    <div class="mb-6">
      <p class="section-label">Question {{ question.id }}</p>
      <h2 class="font-display text-3xl leading-tight text-ink">{{ question.question }}</h2>
    </div>

    <div class="space-y-4">
      <label
        v-for="option in question.options"
        :key="option.id"
        class="block cursor-pointer border p-4 transition"
        :class="
          selectedOptionId === option.id
            ? 'border-rosewood bg-blush/70 shadow-[inset_3px_0_0_0_rgba(126,84,72,1)]'
            : 'border-rosewood/10 bg-white/60 hover:border-rosewood/40 hover:bg-white'
        "
      >
        <input
          class="sr-only"
          type="radio"
          :name="`question-${question.id}`"
          :checked="selectedOptionId === option.id"
          @change="emit('select', option.id)"
        />
        <p class="text-base font-medium text-ink">{{ option.label }}</p>
        <p class="mt-2 text-sm leading-7 text-ink/60">{{ option.description }}</p>
      </label>
    </div>
  </section>
</template>
