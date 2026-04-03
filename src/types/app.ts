export type NeighborhoodId =
  | 'daan-tech'
  | 'zhongshan-shuanglian'
  | 'xinyi-cityhall'
  | 'wanhua-ximen'
  | 'shilin-tianmu'
  | 'wenshan-jingmei-muzha';

export interface Neighborhood {
  id: NeighborhoodId;
  name: string;
  shortName: string;
  personalityType: string;
  rentRange: string;
  vibe: string;
  market: string;
  street: string;
  cafe: string;
  selectShop: string;
  breakfast: string;
  notableResident: string;
  description: string;
  tags: string[];
  accent: string;
  location: {
    lat: number;
    lng: number;
    landmark: string;
  };
  mapPosition: {
    top: string;
    left: string;
  };
}

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  weights: Record<NeighborhoodId, number>;
}

export interface QuizQuestionData {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface RecommendationResult {
  top: Neighborhood;
  secondary: Neighborhood[];
  ranked: Array<Neighborhood & { score: number }>;
}
