// ==========================================
// Core Domain Types
// ==========================================

export type DifficultyLevel =
  | "apprentice"
  | "home-cook"
  | "sous-chef"
  | "head-chef"
  | "executive-chef"
  | "culinary-legend";

export type GuildId =
  | "flavor"
  | "sauce"
  | "fire"
  | "spice"
  | "heritage"
  | "bake"
  | "broth"
  | "mixology"
  | "otaku";

export type TrialMode =
  | "trial"
  | "campaign"
  | "arena"
  | "studio"
  | "daily";

// ==========================================
// User & Progression
// ==========================================

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  rank: Rank;
  xp: number;
  guilds: GuildMembership[];
  badges: Badge[];
  createdAt: string;
  completedTrials: number;
  favoriteGuild?: GuildId;
}

export interface Rank {
  id: string;
  name: string;
  tier: number;
  minXp: number;
  maxXp: number;
  icon: string;
  color: string;
  description: string;
}

export interface GuildMembership {
  guildId: GuildId;
  rank: string;
  joinedAt: string;
  xp: number;
  questsCompleted: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  earnedAt?: string;
  condition: string;
}

// ==========================================
// Guilds
// ==========================================

export interface Guild {
  id: GuildId;
  name: string;
  fullName: string;
  icon: string;
  tagline: string;
  description: string;
  philosophy: string;
  color: string;
  memberCount: number;
  ranks: GuildRank[];
  lessons: Lesson[];
  signatureTechniques: string[];
  seasonalQuests: Quest[];
  featuredDishes: string[];
}

export interface GuildRank {
  id: string;
  name: string;
  tier: number;
  requirements: string;
  perks: string[];
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  duration: number; // minutes
  topics: string[];
  guildId: GuildId;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  reward: string;
  xpReward: number;
  deadline?: string;
  difficulty: DifficultyLevel;
  guildId: GuildId;
}

// ==========================================
// Kitchen Trials
// ==========================================

export interface Trial {
  id: string;
  name: string;
  type: TrialMode;
  difficulty: DifficultyLevel;
  basket: BasketIngredient[];
  constraints: string[];
  bonusObjective?: string;
  scoringFocus: string[];
  timeLimitMinutes: number;
  cuisineStyle: string;
  description: string;
  hints: string[];
  judgePersonality: string;
}

export interface BasketIngredient {
  name: string;
  category: "protein" | "vegetable" | "starch" | "dairy" | "spice" | "misc";
  required: boolean;
  notes?: string;
}

export interface TrialSubmission {
  trialId: string;
  userId: string;
  dishName: string;
  description: string;
  techniques: string[];
  completionTime: number; // minutes
  submittedAt: string;
}

export interface TrialResult {
  submissionId: string;
  trialId: string;
  totalScore: number;
  categories: ScoreCategory[];
  judgeCommentary: string;
  xpEarned: number;
  badgesEarned: Badge[];
  suggestions: string[];
  highlights: string[];
}

export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  commentary: string;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  score: number;
  trialName: string;
  completedAt: string;
  avatar?: string;
}

// ==========================================
// Recipes
// ==========================================

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: DifficultyLevel;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeStep[];
  flavorTags: string[];
  techniqueTags: string[];
  pairingSuggestions: PairingSuggestion[];
  sauceSuggestions: string[];
  spiceSuggestions: string[];
  nutritionNotes?: string;
  culturalNotes?: string;
  imageUrl?: string;
  authorNote?: string;
  isAIGenerated: boolean;
  createdAt: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
  category: string;
  substitutes?: string[];
}

export interface RecipeStep {
  number: number;
  title: string;
  instruction: string;
  technique?: string;
  timer?: number; // seconds
  tips?: string[];
}

export interface PairingSuggestion {
  type: "wine" | "beer" | "cocktail" | "tea" | "non-alcoholic";
  suggestion: string;
  notes: string;
  confidence: number;
}

// ==========================================
// Anime
// ==========================================

export interface AnimeSeries {
  id: string;
  title: string;
  alternateTitle?: string;
  year?: number;
  studio?: string;
  foodStyle: string;
  cuisineFamily: string;
  settingType: string;
  recurringThemes: string[];
  realWorldAnalogs: string[];
  dishes: AnimeDish[];
  overview: string;
  foodPhilosophy: string;
  imageUrl?: string;
  tags: string[];
}

export interface AnimeDish {
  name: string;
  originalName?: string;
  episode?: string;
  ingredients: string[];
  technique: string;
  difficulty: DifficultyLevel;
  platingNotes: string;
  flavorProfile: string[];
  recreationGuide: string;
  culturalContext?: string;
  immersionNotes?: string;
}

export interface AnimeInferenceResult {
  seriesTitle: string;
  detectedStyle: string;
  cuisineFamily: string;
  settingType: string;
  foodPhilosophy: string;
  keyDishes: AnimeDish[];
  atmosphericNotes: string;
  recommendedDifficulty: DifficultyLevel;
  confidence: number;
}

// ==========================================
// Spices
// ==========================================

export interface Spice {
  id: string;
  name: string;
  alternateName?: string;
  origin: string;
  region: string;
  flavorProfile: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  bestUses: string[];
  cuisineFamilies: string[];
  pairingSuggestions: string[];
  historicalNotes: string;
  preparationTips: string;
  storageNotes: string;
  medicalNotes?: string;
  color: string;
  form: string[];
  tags: string[];
}

// ==========================================
// Flavor Pairing
// ==========================================

export interface FlavorPairing {
  ingredient: string;
  pairings: PairingResult[];
  flavorFamily: string;
  dominantNotes: string[];
  balanceRole: string;
}

export interface PairingResult {
  ingredient: string;
  confidence: number;
  reason: string;
  category: string;
  cuisineContexts: string[];
}

export interface FlavorBalance {
  dish: string;
  components: FlavorComponent[];
  overallBalance: string;
  suggestions: string[];
  score: number;
}

export interface FlavorComponent {
  element: "salt" | "acid" | "fat" | "heat" | "sweet" | "bitter" | "umami";
  level: 1 | 2 | 3 | 4 | 5;
  sources: string[];
  notes: string;
}

// ==========================================
// Regional Cuisine
// ==========================================

export interface RegionalCuisine {
  id: string;
  name: string;
  region: string;
  country?: string;
  signatureSpices: string[];
  cookingTechniques: string[];
  stapleIngredients: string[];
  traditionalDishes: TraditionalDish[];
  culturalContext: string;
  historicalNotes: string;
  flavorProfile: string[];
  influencedBy: string[];
  influences: string[];
  imageUrl?: string;
}

export interface TraditionalDish {
  name: string;
  description: string;
  mainIngredients: string[];
  technique: string;
  occasion?: string;
  culturalSignificance?: string;
}

// ==========================================
// Mixology
// ==========================================

export interface Cocktail {
  id: string;
  name: string;
  category: string;
  spirit: string[];
  ingredients: CocktailIngredient[];
  method: string;
  glassware: string;
  garnish: string;
  flavorProfile: string[];
  occasion: string[];
  difficulty: DifficultyLevel;
  history?: string;
  variations?: string[];
  foodPairings: string[];
  mocktailVersion?: string;
}

export interface CocktailIngredient {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
}

// ==========================================
// API Types
// ==========================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface RecipeGenerationRequest {
  ingredients: string[];
  cuisineStyle?: string;
  dietaryRestrictions?: string[];
  skillLevel: DifficultyLevel;
  servings?: number;
  mealType?: string;
}

export interface TrialGenerationRequest {
  difficulty: DifficultyLevel;
  cuisineStyle?: string;
  mode: TrialMode;
  basketSize?: number;
}

export interface AnimeInferenceRequest {
  title: string;
  additionalContext?: string;
}

export interface FlavorPairRequest {
  ingredient: string;
  context?: string;
  limit?: number;
}

// ==========================================
// UI State Types
// ==========================================

export interface FilterState {
  search: string;
  region?: string;
  difficulty?: DifficultyLevel;
  tags: string[];
  sort: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: Record<string, unknown>;
}
