import { ref } from 'vue';
import { calculateRecommendation } from '@/utils/recommendation';

const STORAGE_KEY = 'taipei-her-map-answers';
const answers = ref<string[]>(loadAnswers());

function loadAnswers() {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers.value));
  }
}

export function useQuizStore() {
  function setAnswer(questionIndex: number, optionId: string) {
    answers.value[questionIndex] = optionId;
    persist();
  }

  function resetAnswers() {
    answers.value = [];
    persist();
  }

  return {
    answers,
    setAnswer,
    resetAnswers,
    recommendation: () => calculateRecommendation(answers.value),
  };
}
