import neighborhoodsData from '@/data/neighborhoods.json';
import quizData from '@/data/quiz.json';
import type {
  Neighborhood,
  NeighborhoodId,
  QuizQuestionData,
  RecommendationResult,
} from '@/types/app';

export const neighborhoods = neighborhoodsData as Neighborhood[];
export const quizQuestions = quizData as QuizQuestionData[];

export function createEmptyScores() {
  return neighborhoods.reduce<Record<NeighborhoodId, number>>((acc, neighborhood) => {
    acc[neighborhood.id] = 0;
    return acc;
  }, {} as Record<NeighborhoodId, number>);
}

export function calculateRecommendation(selectedOptionIds: string[]): RecommendationResult | null {
  if (selectedOptionIds.length === 0) {
    return null;
  }

  const scores = createEmptyScores();

  quizQuestions.forEach((question) => {
    const selectedOption = question.options.find((option) => selectedOptionIds.includes(option.id));

    if (!selectedOption) {
      return;
    }

    (Object.entries(selectedOption.weights) as Array<[NeighborhoodId, number]>).forEach(
      ([neighborhoodId, weight]) => {
        scores[neighborhoodId] += weight;
      },
    );
  });

  const ranked = neighborhoods
    .map((neighborhood) => ({
      ...neighborhood,
      score: scores[neighborhood.id],
    }))
    .sort((left, right) => right.score - left.score);

  return {
    top: ranked[0],
    secondary: ranked.slice(1, 3),
    ranked,
  };
}
