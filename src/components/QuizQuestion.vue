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
            ? 'border-rosewood/22 bg-blush/50 shadow-[0_10px_24px_rgba(178,140,126,0.05)]'
            : 'border-rosewood/10 bg-white/60 hover:border-rosewood/18 hover:bg-white'
        "
      >
        <input
          class="sr-only"
          type="radio"
          :name="`question-${question.id}`"
          :checked="selectedOptionId === option.id"
          @change="emit('select', option.id)"
        />
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-base font-medium text-ink">{{ option.label }}</p>
            <p class="mt-2 text-sm leading-7 text-ink/60">{{ option.description }}</p>
          </div>
          <span
            class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition"
            :class="
              selectedOptionId === option.id
                ? 'border-[#caa38f] bg-white shadow-[0_0_0_4px_rgba(250,240,236,0.95)]'
                : 'border-rosewood/22 bg-transparent'
            "
            aria-hidden="true"
          >
            <span
              class="h-2.5 w-2.5 rounded-full transition"
              :class="selectedOptionId === option.id ? 'bg-[#caa38f]' : 'bg-transparent'"
            />
          </span>
        </div>
      </label>
    </div>
  </section>
</template>
