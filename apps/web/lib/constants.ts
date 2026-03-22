import type { Guild, Rank, Badge, AnimeSeries, Spice, Trial } from "./types";

// ==========================================
// RANKS
// ==========================================
export const RANKS: Rank[] = [
  { id: "novice", name: "Novice", tier: 1, minXp: 0, maxXp: 499, icon: "🌱", color: "#4A7C59", description: "Just beginning the culinary journey" },
  { id: "apprentice", name: "Apprentice", tier: 2, minXp: 500, maxXp: 1499, icon: "🔪", color: "#4A7C59", description: "Learning the fundamentals of craft" },
  { id: "home-cook", name: "Home Cook", tier: 3, minXp: 1500, maxXp: 3499, icon: "🍳", color: "#3A4A5C", description: "Comfortable at the stove with growing instincts" },
  { id: "line-cook", name: "Line Cook", tier: 4, minXp: 3500, maxXp: 6999, icon: "🫕", color: "#C84B11", description: "Fast, disciplined, building a real kitchen vocabulary" },
  { id: "sous-chef", name: "Sous Chef", tier: 5, minXp: 7000, maxXp: 12999, icon: "👨‍🍳", color: "#D4AF37", description: "Second in command, commanding technique and palate" },
  { id: "head-chef", name: "Head Chef", tier: 6, minXp: 13000, maxXp: 24999, icon: "🌟", color: "#D4AF37", description: "Full creative authority, deep technical mastery" },
  { id: "executive-chef", name: "Executive Chef", tier: 7, minXp: 25000, maxXp: 49999, icon: "👑", color: "#8B1A1A", description: "Visionary creator defining entire dining experiences" },
  { id: "culinary-legend", name: "Culinary Legend", tier: 8, minXp: 50000, maxXp: Infinity, icon: "⚜️", color: "#D4AF37", description: "A name spoken in kitchens for generations" },
];

// ==========================================
// GUILDS
// ==========================================
export const GUILDS: Guild[] = [
  {
    id: "flavor",
    name: "Flavor",
    fullName: "Guild of Flavor",
    icon: "🌊",
    tagline: "Taste is the compass of all great cooking",
    description: "Master the science and art of flavor perception. Learn to identify, manipulate, and compose flavor with the precision of a master perfumer.",
    philosophy: "Flavor is not an accident. Every great dish is a deliberate conversation between ingredients — a symphony of complementary and contrasting notes. The Guild of Flavor trains masters in the complete sensory vocabulary of taste.",
    color: "#3A4A5C",
    memberCount: 4821,
    ranks: [
      { id: "taster", name: "Taster", tier: 1, requirements: "Complete 3 flavor identification exercises", perks: ["Access to Flavor Atlas"], icon: "👅" },
      { id: "palate", name: "Palate Master", tier: 2, requirements: "Score 80+ on 5 flavor balance trials", perks: ["Unlock advanced pairing guides"], icon: "🌊" },
      { id: "sommelier", name: "Flavor Sommelier", tier: 3, requirements: "Complete Flavor Composition course", perks: ["Guild-exclusive flavor challenges"], icon: "🍷" },
    ],
    lessons: [
      { id: "fl-1", title: "The Five Tastes", description: "Sweet, salty, sour, bitter, umami — and the sixth sensation of fat", difficulty: "apprentice", duration: 20, topics: ["taste science", "receptors", "balance"], guildId: "flavor" },
      { id: "fl-2", title: "Flavor Pairing Fundamentals", description: "Why certain ingredients harmonize while others clash", difficulty: "home-cook", duration: 35, topics: ["pairing theory", "flavor molecules", "aroma"], guildId: "flavor" },
      { id: "fl-3", title: "Building Flavor Layers", description: "Techniques for depth, complexity, and evolution", difficulty: "sous-chef", duration: 45, topics: ["layering", "seasoning progression", "maillard"], guildId: "flavor" },
    ],
    signatureTechniques: ["Blind tasting", "Flavor mapping", "Contrast seasoning", "Umami stacking", "Acid brightening"],
    seasonalQuests: [
      { id: "sq-fl-1", title: "Spring Awakening", description: "Create three dishes using only spring vegetables with zero added umami", objectives: ["Use bright acid", "Layer textures", "Highlight natural sweetness"], reward: "Flavor Savant badge", xpReward: 500, difficulty: "sous-chef", guildId: "flavor" },
    ],
    featuredDishes: ["Dashi-glazed turnips", "Citrus ceviche", "Miso butterscotch"],
  },
  {
    id: "sauce",
    name: "Sauce",
    fullName: "Guild of Sauce",
    icon: "🫙",
    tagline: "The sauce is the soul of the dish",
    description: "Command the mother sauces and their infinite derivatives. From classical French to modern emulsions, the Guild of Sauce teaches liquid mastery.",
    philosophy: "Escoffier codified the mothers. We have extended their lineage across every culinary tradition on earth. Sauce is not garnish — it is the bridge between ingredient and experience.",
    color: "#8B1A1A",
    memberCount: 3246,
    ranks: [
      { id: "saucier-apprentice", name: "Saucier Apprentice", tier: 1, requirements: "Execute all five mother sauces", perks: ["Sauce recipe library access"], icon: "🫙" },
      { id: "saucier", name: "Saucier", tier: 2, requirements: "Create 10 derivative sauces from mothers", perks: ["Reduction technique masterclass"], icon: "🌡️" },
      { id: "grand-saucier", name: "Grand Saucier", tier: 3, requirements: "Invent an original sauce and document it", perks: ["Guild sauce cookbook credit"], icon: "👑" },
    ],
    lessons: [
      { id: "sc-1", title: "The Five Mother Sauces", description: "Béchamel, Velouté, Espagnole, Hollandaise, Tomato — the pillars of classical cuisine", difficulty: "apprentice", duration: 40, topics: ["roux", "reduction", "emulsion"], guildId: "sauce" },
      { id: "sc-2", title: "Emulsions: Cold to Hot", description: "Mayonnaise to beurre blanc — mastering the suspension of fat in liquid", difficulty: "sous-chef", duration: 50, topics: ["lecithin", "temperature control", "stabilizers"], guildId: "sauce" },
    ],
    signatureTechniques: ["Reduction", "Emulsification", "Roux building", "Pan sauce", "Gastrique"],
    seasonalQuests: [
      { id: "sq-sc-1", title: "The Derivative Challenge", description: "Create five distinct sauces from one mother sauce in one session", objectives: ["Show flavor range", "Document each recipe", "Photograph presentations"], reward: "Sauce Architect badge", xpReward: 600, difficulty: "head-chef", guildId: "sauce" },
    ],
    featuredDishes: ["Hollandaise over asparagus", "Beurre blanc with salmon", "Mole negro"],
  },
  {
    id: "fire",
    name: "Fire",
    fullName: "Guild of Fire",
    icon: "🔥",
    tagline: "Control the flame, command the food",
    description: "Master heat in all its forms — from the gentle simmer to the roaring open flame. The Guild of Fire trains chefs in Maillard mastery, smoke, char, and the full spectrum of thermal cooking.",
    philosophy: "Every cooking method is a language of heat. Sous vide whispers. The grill commands. The wok shouts. Know them all and you can speak any culinary tongue.",
    color: "#C84B11",
    memberCount: 5102,
    ranks: [
      { id: "kindler", name: "Kindler", tier: 1, requirements: "Master three heat methods", perks: ["Temperature guides"], icon: "🕯️" },
      { id: "flame-keeper", name: "Flame Keeper", tier: 2, requirements: "Complete Maillard masterclass", perks: ["Smoking wood selection guide"], icon: "🔥" },
      { id: "pyromaster", name: "Pyromaster", tier: 3, requirements: "Execute omakase using 6 different heat methods", perks: ["Live fire challenge access"], icon: "⚡" },
    ],
    lessons: [
      { id: "fi-1", title: "The Maillard Reaction", description: "The chemistry that makes browning the most delicious thing in cooking", difficulty: "home-cook", duration: 30, topics: ["amino acids", "sugars", "temperature"], guildId: "fire" },
      { id: "fi-2", title: "Dry vs Wet Heat", description: "When to roast, when to braise — the full heat spectrum", difficulty: "apprentice", duration: 25, topics: ["roasting", "braising", "steaming", "poaching"], guildId: "fire" },
    ],
    signatureTechniques: ["Searing", "Smoking", "Wok hei", "Wood-fired roasting", "Sous vide finishing"],
    seasonalQuests: [],
    featuredDishes: ["Wood-smoked brisket", "Wok-charred bok choy", "Perfect reverse-sear steak"],
  },
  {
    id: "spice",
    name: "Spice",
    fullName: "Guild of Spice",
    icon: "🌶️",
    tagline: "Spice is history, culture, and fire in one",
    description: "Navigate 60+ global spice traditions. Learn to toast, bloom, grind, and layer spices with the confidence of an Old Spice Road merchant-philosopher.",
    philosophy: "Spice is civilization. The desire for it drove the age of exploration. Every spice tells a story of land, people, and exchange. The Guild of Spice honors that story in every dish.",
    color: "#D4AF37",
    memberCount: 3879,
    ranks: [
      { id: "spice-hunter", name: "Spice Hunter", tier: 1, requirements: "Identify 20 spices by smell alone", perks: ["Spice Codex access"], icon: "🌶️" },
      { id: "blender", name: "Master Blender", tier: 2, requirements: "Create 3 original spice blends", perks: ["Spice blend marketplace"], icon: "⚗️" },
      { id: "aromatist", name: "Grand Aromatist", tier: 3, requirements: "Document a regional spice tradition", perks: ["Heritage Guild collaboration"], icon: "✨" },
    ],
    lessons: [],
    signatureTechniques: ["Dry toasting", "Bloom in fat", "Grinding fresh", "Layered spicing", "Cold infusion"],
    seasonalQuests: [],
    featuredDishes: ["Ras el hanout lamb", "Berbere stew", "Garam masala chai cake"],
  },
  {
    id: "heritage",
    name: "Heritage",
    fullName: "Guild of Heritage",
    icon: "📿",
    tagline: "Every recipe is a cultural artifact",
    description: "Explore and preserve the culinary traditions of 20+ regional cuisines. From Gullah Geechee rice culture to Levantine mezze to Oaxacan mole — the Guild of Heritage keeps these fires burning.",
    philosophy: "To cook a traditional dish with accuracy and reverence is an act of cultural preservation. The Guild of Heritage believes every cook has a responsibility to know the stories behind their food.",
    color: "#4A7C59",
    memberCount: 2651,
    ranks: [],
    lessons: [],
    signatureTechniques: ["Traditional fermentation", "Open-fire cooking", "Ancestral spice blending", "Preservation curing", "Regional grain preparation"],
    seasonalQuests: [],
    featuredDishes: ["Gullah red rice", "West African jollof", "Levantine kibbeh", "Native fry bread"],
  },
  {
    id: "bake",
    name: "Bake",
    fullName: "Guild of Bake",
    icon: "🍞",
    tagline: "Bread is civilization made edible",
    description: "Master the living science of bread, pastry, and fermentation. The Guild of Bake teaches everything from sourdough's wild microbiome to croissant lamination to the perfect macaron.",
    philosophy: "Baking is the most honest of all culinary arts — it does not forgive imprecision. But when the science aligns with the craft, bread transcends nourishment and becomes comfort, memory, and culture.",
    color: "#C9A227",
    memberCount: 4190,
    ranks: [],
    lessons: [],
    signatureTechniques: ["Sourdough fermentation", "Lamination", "Autolyse", "Proofing curves", "Sugar work"],
    seasonalQuests: [],
    featuredDishes: ["Country sourdough", "Kouign-amann", "Choux pastry éclairs"],
  },
  {
    id: "broth",
    name: "Broth",
    fullName: "Guild of Broth",
    icon: "🍲",
    tagline: "Great soup is the distillation of great cooking",
    description: "From Japanese dashi to French consommé to Korean doenjang jjigae — the Guild of Broth teaches the profound art of extracting flavor from liquid.",
    philosophy: "Stock is not a background player. It is the foundation upon which all complexity is built. The Guild of Broth trains masters in patience, technique, and the transformative power of time over heat.",
    color: "#8A7020",
    memberCount: 2103,
    ranks: [],
    lessons: [],
    signatureTechniques: ["Long-bone roasting", "Clarification", "Cold extraction", "Dashi making", "Pressure reduction"],
    seasonalQuests: [],
    featuredDishes: ["48-hour bone broth", "Tonkotsu ramen broth", "Consommé double"],
  },
  {
    id: "mixology",
    name: "Mixology",
    fullName: "Guild of Mixology",
    icon: "🍸",
    tagline: "A great cocktail is a recipe in liquid form",
    description: "Bridge the gap between kitchen and bar. The Guild of Mixology teaches cocktail craft as a culinary discipline — with balance, technique, flavor intelligence, and impeccable presentation.",
    philosophy: "The cocktail is not decoration for a meal — it is an extension of it. Every spirit carries terroir, every citrus is an acid source, every bitter is a culinary ingredient.",
    color: "#3A4A5C",
    memberCount: 3308,
    ranks: [],
    lessons: [],
    signatureTechniques: ["Fat-washing", "Clarification", "Carbonation", "Dehydrating", "Culinary infusion"],
    seasonalQuests: [],
    featuredDishes: ["Smoked Negroni", "Culinary Daiquiri", "Shrub-based mocktail"],
  },
  {
    id: "otaku",
    name: "Otaku",
    fullName: "Otaku Culinary Guild",
    icon: "⛩️",
    tagline: "Cook the meals that made you want to live inside the story",
    description: "Anime, manga, and fiction-inspired cooking brought to life with AI accuracy. Recreate iconic dishes from 25+ series, guided by food style detection and culinary inference.",
    philosophy: "The food in anime is never incidental. It is world-building made edible — a taste of the fictional world filtered through Japanese culinary tradition, fantasy, and pure emotional resonance.",
    color: "#8B1A1A",
    memberCount: 7840,
    ranks: [
      { id: "fan", name: "Culinary Fan", tier: 1, requirements: "Recreate 1 anime dish", perks: ["Anime food style guide"], icon: "⭐" },
      { id: "otaku-cook", name: "Otaku Cook", tier: 2, requirements: "Complete 5 anime dish recreations", perks: ["Immersion mode access"], icon: "⛩️" },
      { id: "culinary-weeb", name: "Grand Culinary Otaku", tier: 3, requirements: "Create original anime-inspired dish", perks: ["Otaku trial creation access"], icon: "🌸" },
    ],
    lessons: [],
    signatureTechniques: ["Anime-faithful plating", "Japanese home cooking", "Fantasy ingredient substitution", "Ambiance recreation", "Fandom storytelling through food"],
    seasonalQuests: [],
    featuredDishes: ["Naruto's miso ramen", "Spirited Away's onigiri", "Howl's bacon and eggs"],
  },
];

// ==========================================
// ANIME SERIES (sample — full in JSON)
// ==========================================
export const ANIME_SERIES: Pick<AnimeSeries, "id" | "title" | "foodStyle" | "cuisineFamily" | "tags">[] = [
  { id: "food-wars", title: "Food Wars! Shokugeki no Soma", foodStyle: "Elite culinary academy, competitive cooking", cuisineFamily: "Japanese fusion + international", tags: ["competitive", "technique", "drama"] },
  { id: "naruto", title: "Naruto / Boruto", foodStyle: "Village comfort food, ninja field rations", cuisineFamily: "Japanese comfort", tags: ["ramen", "comfort", "dango"] },
  { id: "one-piece", title: "One Piece", foodStyle: "Maritime adventure, island cuisine", cuisineFamily: "Multi-regional seafood", tags: ["seafood", "adventure", "meat"] },
  { id: "spirited-away", title: "Spirited Away", foodStyle: "Spirit world bathhouse cuisine", cuisineFamily: "Japanese traditional", tags: ["onigiris", "spirit-world", "magical"] },
  { id: "howls-castle", title: "Howl's Moving Castle", foodStyle: "Cottage hearth cooking, European countryside", cuisineFamily: "Central European", tags: ["breakfast", "bacon", "eggs", "hearth"] },
  { id: "delicious-dungeon", title: "Delicious in Dungeon", foodStyle: "Monster ingredient cookery, dungeon foraging", cuisineFamily: "Fantasy medieval", tags: ["monster-cooking", "adventure", "survival"] },
  { id: "restaurant-another-world", title: "Restaurant to Another World", foodStyle: "Western restaurant cuisine in isekai setting", cuisineFamily: "Japanese-style Western", tags: ["yoshoku", "comfort", "isekai"] },
  { id: "sweetness-lightning", title: "Sweetness & Lightning", foodStyle: "Single parent home cooking, Japanese home meals", cuisineFamily: "Japanese home cooking", tags: ["heartfelt", "home-cooking", "family"] },
  { id: "toriko", title: "Toriko", foodStyle: "Extreme gourmet hunting, mythical ingredients", cuisineFamily: "Hyperbolic gourmet fantasy", tags: ["gourmet", "fantasy", "hunting"] },
  { id: "yakitate-japan", title: "Yakitate!! Japan", foodStyle: "Competitive bread baking", cuisineFamily: "Artisan baking", tags: ["bread", "baking", "competition"] },
  { id: "yumeiro-patissiere", title: "Yumeiro Pâtissière", foodStyle: "French pastry school", cuisineFamily: "French pastry", tags: ["pastry", "sweets", "school"] },
  { id: "isekai-izakaya", title: "Isekai Izakaya: Japanese Food From Another World", foodStyle: "Japanese izakaya classics served to fantasy world patrons", cuisineFamily: "Japanese izakaya", tags: ["izakaya", "isekai", "pub-food"] },
  { id: "laid-back-camp", title: "Laid-Back Camp", foodStyle: "Campfire cooking, outdoor meals", cuisineFamily: "Japanese camping cuisine", tags: ["campfire", "outdoor", "simple"] },
  { id: "shirobako", title: "Various Slice of Life", foodStyle: "Tokyo café and convenience food", cuisineFamily: "Modern Japanese urban", tags: ["cafe", "urban", "daily"] },
  { id: "kiki-delivery", title: "Kiki's Delivery Service", foodStyle: "Southern European town bakery", cuisineFamily: "Mediterranean baking", tags: ["bakery", "magical", "pumpkin-cake"] },
];

// ==========================================
// SPICES (sample — full in JSON)
// ==========================================
export const SPICES: Pick<Spice, "id" | "name" | "origin" | "region" | "flavorProfile" | "intensity">[] = [
  { id: "sumac", name: "Sumac", origin: "Middle East", region: "Levant", flavorProfile: ["tangy", "citrus", "tart"], intensity: 3 },
  { id: "ras-el-hanout", name: "Ras el Hanout", origin: "Morocco", region: "North Africa", flavorProfile: ["complex", "warm", "floral", "spicy"], intensity: 4 },
  { id: "berbere", name: "Berbere", origin: "Ethiopia", region: "East Africa", flavorProfile: ["fiery", "earthy", "aromatic"], intensity: 5 },
  { id: "garam-masala", name: "Garam Masala", origin: "Northern India", region: "South Asia", flavorProfile: ["warm", "complex", "earthy", "sweet"], intensity: 3 },
  { id: "szechuan-pepper", name: "Szechuan Pepper", origin: "Sichuan Province, China", region: "East Asia", flavorProfile: ["numbing", "citrus", "floral"], intensity: 4 },
  { id: "za-atar", name: "Za'atar", origin: "Levant", region: "Middle East", flavorProfile: ["herbal", "nutty", "tangy", "earthy"], intensity: 3 },
  { id: "smoked-paprika", name: "Smoked Paprika", origin: "Spain", region: "Mediterranean", flavorProfile: ["smoky", "sweet", "earthy"], intensity: 3 },
  { id: "fenugreek", name: "Fenugreek", origin: "India / Near East", region: "South Asia", flavorProfile: ["bitter", "nutty", "maple-like"], intensity: 4 },
  { id: "annatto", name: "Annatto", origin: "Central America", region: "Americas", flavorProfile: ["earthy", "slightly sweet", "peppery"], intensity: 2 },
  { id: "asafoetida", name: "Asafoetida (Hing)", origin: "Iran / Afghanistan", region: "Central Asia", flavorProfile: ["pungent", "onion-garlic", "sulfurous"], intensity: 5 },
  { id: "saffron", name: "Saffron", origin: "Iran / Kashmir", region: "Middle East / South Asia", flavorProfile: ["floral", "honey", "metallic", "earthy"], intensity: 3 },
  { id: "mace", name: "Mace", origin: "Banda Islands, Indonesia", region: "Southeast Asia", flavorProfile: ["warm", "sweet", "nutmeg-like", "peppery"], intensity: 3 },
  { id: "ajwain", name: "Ajwain (Carom Seeds)", origin: "India / Middle East", region: "South Asia", flavorProfile: ["thyme-like", "bitter", "pungent"], intensity: 4 },
  { id: "epazote", name: "Epazote", origin: "Mexico / Central America", region: "Mesoamerica", flavorProfile: ["pungent", "herbal", "petroleum-like"], intensity: 4 },
  { id: "grains-of-paradise", name: "Grains of Paradise", origin: "West Africa", region: "West Africa", flavorProfile: ["gingery", "peppery", "earthy", "citrus"], intensity: 3 },
];

// ==========================================
// TRIALS (sample — full in JSON)
// ==========================================
export const TRIALS: Pick<Trial, "id" | "name" | "type" | "difficulty" | "basket" | "timeLimitMinutes" | "cuisineStyle">[] = [
  {
    id: "mystery-pantry-1",
    name: "The Midnight Pantry",
    type: "trial",
    difficulty: "home-cook",
    basket: [
      { name: "Canned chickpeas", category: "protein", required: true },
      { name: "Preserved lemons", category: "misc", required: true },
      { name: "Tahini", category: "misc", required: true },
      { name: "Smoked paprika", category: "spice", required: true },
    ],
    timeLimitMinutes: 45,
    cuisineStyle: "Middle Eastern",
  },
  {
    id: "fire-trial-1",
    name: "Wok This Way",
    type: "trial",
    difficulty: "sous-chef",
    basket: [
      { name: "Flank steak", category: "protein", required: true },
      { name: "Bok choy", category: "vegetable", required: true },
      { name: "Oyster sauce", category: "misc", required: true },
      { name: "Szechuan peppercorns", category: "spice", required: true },
    ],
    timeLimitMinutes: 30,
    cuisineStyle: "Chinese",
  },
  {
    id: "seafood-trial-1",
    name: "Coastal Memory",
    type: "campaign",
    difficulty: "head-chef",
    basket: [
      { name: "Fresh clams", category: "protein", required: true },
      { name: "Fennel", category: "vegetable", required: true },
      { name: "Saffron", category: "spice", required: true },
      { name: "Sourdough bread", category: "starch", required: true },
    ],
    timeLimitMinutes: 60,
    cuisineStyle: "Mediterranean",
  },
  {
    id: "umami-bomb-1",
    name: "Umami Protocol",
    type: "arena",
    difficulty: "executive-chef",
    basket: [
      { name: "Kombu", category: "misc", required: true },
      { name: "Porcini mushrooms", category: "vegetable", required: true },
      { name: "Parmesan rind", category: "dairy", required: true },
      { name: "Anchovy fillets", category: "protein", required: true },
    ],
    timeLimitMinutes: 75,
    cuisineStyle: "Fusion",
  },
  {
    id: "daily-trial-1",
    name: "Root to Stem",
    type: "daily",
    difficulty: "home-cook",
    basket: [
      { name: "Beets", category: "vegetable", required: true },
      { name: "Beet greens", category: "vegetable", required: true },
      { name: "Goat cheese", category: "dairy", required: true },
      { name: "Walnuts", category: "misc", required: true },
    ],
    timeLimitMinutes: 40,
    cuisineStyle: "Contemporary",
  },
];

// ==========================================
// BADGES
// ==========================================
export const BADGES: Badge[] = [
  { id: "first-trial", name: "Trial Initiator", description: "Completed your first Kitchen Trial", icon: "⚗️", rarity: "common", condition: "Complete 1 trial" },
  { id: "perfect-score", name: "Culinary Perfection", description: "Achieved a perfect 100-point score", icon: "💯", rarity: "legendary", condition: "Score 100/100 on any trial" },
  { id: "flavor-master", name: "Flavor Savant", description: "Demonstrated exceptional flavor understanding", icon: "🌊", rarity: "rare", condition: "Score 95+ on flavor category 5 times" },
  { id: "guild-joiner", name: "Guild Initiate", description: "Joined your first Guild", icon: "⚜️", rarity: "common", condition: "Join any guild" },
  { id: "anime-chef", name: "Otaku Chef", description: "Recreated 5 anime-inspired dishes", icon: "⛩️", rarity: "uncommon", condition: "Complete 5 anime dish recreations" },
  { id: "spice-road", name: "Spice Road Traveler", description: "Cooked with spices from 10 different regions", icon: "🌶️", rarity: "rare", condition: "Use spices from 10+ regions" },
  { id: "heritage-keeper", name: "Heritage Keeper", description: "Completed Heritage Table explorations from 5 cultures", icon: "📿", rarity: "epic", condition: "Explore 5+ regional cuisines" },
  { id: "daily-streak", name: "Daily Devotion", description: "Completed 30 consecutive daily trials", icon: "🔥", rarity: "epic", condition: "30-day daily trial streak" },
  { id: "sauce-master", name: "Saucier Supreme", description: "Executed all five mother sauces with excellence", icon: "🫙", rarity: "rare", condition: "Score 85+ on all mother sauce trials" },
];

// ==========================================
// DIFFICULTY ORDER
// ==========================================
export const DIFFICULTY_ORDER = [
  "apprentice",
  "home-cook",
  "sous-chef",
  "head-chef",
  "executive-chef",
  "culinary-legend",
] as const;

// ==========================================
// REGIONS
// ==========================================
export const REGIONS = [
  "East Asia",
  "Southeast Asia",
  "South Asia",
  "Central Asia",
  "Middle East",
  "Levant",
  "North Africa",
  "West Africa",
  "East Africa",
  "Mediterranean",
  "Central Europe",
  "Western Europe",
  "Americas",
  "Mesoamerica",
  "Caribbean",
  "South America",
  "Pacific Islands",
] as const;

// ==========================================
// CUISINE STYLES
// ==========================================
export const CUISINE_STYLES = [
  "Japanese",
  "Chinese",
  "Korean",
  "Vietnamese",
  "Thai",
  "Indian",
  "Levantine",
  "Moroccan",
  "Ethiopian",
  "West African",
  "French",
  "Italian",
  "Spanish",
  "Mediterranean",
  "Mexican",
  "Caribbean",
  "Cajun/Creole",
  "Peruvian",
  "Middle Eastern",
  "Contemporary",
  "Fusion",
] as const;

// ==========================================
// FLAVOR FAMILIES
// ==========================================
export const FLAVOR_FAMILIES = [
  { id: "sweet", label: "Sweet", icon: "🍯", description: "Sugars, caramelization, natural fruit sugars" },
  { id: "salty", label: "Salty", icon: "🧂", description: "Mineral, oceanic, preserved" },
  { id: "acid", label: "Acid", icon: "🍋", description: "Citrus, fermented, vinegar-based" },
  { id: "bitter", label: "Bitter", icon: "☕", description: "Coffee, dark greens, char, some spices" },
  { id: "umami", label: "Umami", icon: "🍄", description: "Glutamates: mushroom, aged cheese, soy, meat" },
  { id: "fat", label: "Fat", icon: "🥑", description: "Richness, mouthfeel, creaminess" },
  { id: "heat", label: "Heat", icon: "🌶️", description: "Capsaicin, piperine, allicin" },
  { id: "herbal", label: "Herbal", icon: "🌿", description: "Fresh herbs, green, grassy" },
  { id: "floral", label: "Floral", icon: "🌸", description: "Rose, lavender, saffron, elderflower" },
  { id: "smoky", label: "Smoky", icon: "💨", description: "Wood smoke, char, chipotle" },
] as const;
