"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ChevronDown, ChevronUp, Flame, Globe, BookOpen, Sparkles } from "lucide-react";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import type { DifficultyLevel } from "@/lib/types";

// In production this would fetch from the API based on params.anime
const ANIME_DATA = {
  title: "Delicious in Dungeon",
  alternateTitle: "Dungeon Meshi",
  foodStyle: "Monster ingredient cookery — using dungeon-sourced creatures as primary proteins and vegetables",
  cuisineFamily: "Fantasy medieval European with Japanese cooking sensibility",
  settingType: "Underground dungeon — dark, resource-scarce, adventurer context",
  foodPhilosophy: "Resourcefulness defines flavor. Every monster is an ingredient. The dungeon provides all that is needed if you know how to look. Waste is survival failure.",
  recurringThemes: ["Zero waste cooking", "Creature-based proteins", "Foraging and field cookery", "Cooking as survival skill", "Finding beauty in unconventional ingredients"],
  realWorldAnalogs: ["Medieval European peasant cooking", "Japanese home cooking techniques", "Wild game preparation", "Field foraging"],
  atmosphericNotes: "Meals are cooked in the dungeon — by torchlight, over open flame, in improvised cookware. The ambiance is adventure, necessity, and discovery. Eating together is survival bonding.",
};

const DISHES = [
  {
    name: "Basilisk Egg Omelette with Dungeon Mushrooms",
    originalName: "バジリスクの卵のオムレツ",
    episode: "Episode 2",
    ingredients: ["Giant eggs (substitute: large duck or goose eggs)", "Wild mushrooms (shiitake, maitake, oyster)", "Cave herbs (substitute: thyme, sage, rosemary)", "Rendered monster fat (substitute: duck fat)", "Salt, pepper"],
    technique: "Classic French omelette technique — low heat, constant movement, roll at the end. The dungeon mushrooms are sautéed separately in fat until golden.",
    difficulty: "home-cook" as DifficultyLevel,
    platingNotes: "Rustic, hearty. Serve in the pan if possible — field-style. A scattering of fresh herbs and a crack of black pepper. No delicacy, full flavor.",
    flavorProfile: ["Eggy", "Earthy", "Savory", "Herbaceous", "Fatty"],
    recreationGuide: "Use the largest eggs you can find — duck eggs are ideal. The mushroom selection is key: use at least two varieties for complexity. The fat matters — duck fat gives the best dungeon-authentic richness. Cook the omelette over medium-low heat and never stop moving it. Remove from heat slightly under-set.",
    culturalContext: "The omelette represents the show's central thesis: any ingredient, properly prepared, yields something worth eating. The eggs come from a creature that petrifies with its gaze — yet they make breakfast.",
    immersionNotes: "Eat by torchlight. Set the mood with dungeon ambiance sounds. Serve directly from the pan, no plating ceremony. This is fuel for the adventure ahead.",
  },
  {
    name: "Slime Gelatin Pudding",
    originalName: "スライムプリン",
    episode: "Episode 5",
    ingredients: ["Agar agar or gelatin", "Coconut milk", "Sugar", "Vanilla", "Blue food coloring (optional)", "Honey"],
    technique: "Standard gelatin pudding set in molds. The 'slime' is represented by a wobbling, jewel-clear gelatin base that catches light.",
    difficulty: "apprentice" as DifficultyLevel,
    platingNotes: "Unmold onto a dark plate. The wobble is the presentation. No garnish needed — the translucent quality is the point.",
    flavorProfile: ["Sweet", "Coconut", "Vanilla", "Light", "Ethereal"],
    recreationGuide: "Use agar agar for a firmer, more crystalline result — closer to the show's aesthetic. Add a drop or two of blue food coloring to suggest the slime's otherworldly color. The wobble is non-negotiable.",
    culturalContext: "Slimes are classic fantasy dungeon fodder. The show finds joy in converting the mundane-dangerous into the delicious. The pudding is a comedic and delightful subversion.",
    immersionNotes: "Serve cold. Eat with a small spoon. Appreciate the wobble. The recipe is a celebration of the show's philosophy — nothing is unworthy of culinary exploration.",
  },
  {
    name: "Dungeon Mushroom and Scorpion Stew",
    originalName: "キノコとサソリのシチュー",
    episode: "Episode 7",
    ingredients: ["Large mushrooms (portobello, porcini)", "Whole prawns (for scorpion analog)", "Root vegetables (turnip, carrot, potato)", "Dungeon herbs (thyme, bay, wild garlic)", "Dark stock", "White wine"],
    technique: "Braise and stew. Brown the 'scorpion' (prawn) shells for stock, then cook meat separately. Build vegetable base, add stock, long simmer.",
    difficulty: "sous-chef" as DifficultyLevel,
    platingNotes: "Deep bowl, generous ladle. The prawn/scorpion sits on top, dramatic and whole. Root vegetables visible. Herbs floating on top like collected dungeon flora.",
    flavorProfile: ["Oceanic", "Earthy", "Warm", "Herbal", "Deep"],
    recreationGuide: "The shell-toasted stock is the soul of this dish. Toast prawn shells dry in a hot pan until deeply browned before adding water — you'll extract incredible flavor. The mushrooms should be added in stages: some early for body, some late for texture.",
    culturalContext: "The stew represents the community meal in the dungeon — shared, warming, and built from what the dungeon provides. It is survival cuisine at its most comforting.",
    immersionNotes: "Serve in a cast iron pot at the table. Let everyone ladle their own portion. The communal act is part of the meal.",
  },
  {
    name: "Mandragora Stir-Fry with Rice",
    originalName: "マンドラゴラの炒め物",
    episode: "Episode 11",
    ingredients: ["Mandrake roots (substitute: sunchokes or parsnips)", "Bok choy", "Garlic", "Ginger", "Soy sauce", "Sesame oil", "Steamed rice"],
    technique: "High-heat wok stir-fry. All prep done before heat. The root vegetables are blanched briefly first to soften, then finished in the wok.",
    difficulty: "home-cook" as DifficultyLevel,
    platingNotes: "Rustic mound over rice. The 'mandrake' roots should be visible as the protein-analog. Sesame seeds scattered.",
    flavorProfile: ["Nutty", "Earthy", "Umami", "Ginger-bright", "Savory"],
    recreationGuide: "Sunchokes are the best mandrake analog — they have an earthy, artichoke-like quality that reads as unusual and dungeon-authentic. Parboil them first to remove excess starch and ensure even cooking in the wok.",
    culturalContext: "The mandragora episode humorously treats a legendary screaming plant as a stir-fry vegetable. The show's magic is making you wish you could eat it.",
    immersionNotes: "Use a well-seasoned wok. The sound of the stir-fry is part of the experience. Eat with chopsticks, directly from the bowl.",
  },
];

export default function AnimePage({ params }: { params: { anime: string } }) {
  const [expandedDish, setExpandedDish] = useState<number | null>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [immersionMode, setImmersionMode] = useState(false);

  const animeName = params.anime.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const filteredDishes = selectedDifficulty === "all"
    ? DISHES
    : DISHES.filter((d) => d.difficulty === selectedDifficulty);

  return (
    <div className={`min-h-screen pt-[72px] transition-all duration-500 ${immersionMode ? "bg-[#050505]" : "bg-void"}`}>
      {/* Back Nav */}
      <div className="border-b border-elevated">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link href="/otaku-guild" className="flex items-center gap-2 text-cream-muted hover:text-gold transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Otaku Culinary Guild
          </Link>
        </div>
      </div>

      {/* Anime Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-void to-void" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
                <Star className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-cinzel text-xs tracking-widest text-purple-400 uppercase">Anime Food Detection</span>
              </div>
              <h1 className="font-playfair font-black text-3xl md:text-4xl text-cream mb-3">{ANIME_DATA.title}</h1>
              {ANIME_DATA.alternateTitle && (
                <div className="text-cream-muted italic font-playfair mb-4">{ANIME_DATA.alternateTitle}</div>
              )}

              <div className="space-y-4 mb-6">
                <div className="bg-elevated rounded-sm p-3">
                  <div className="text-xs text-gold font-cinzel tracking-widest uppercase mb-1">Detected Food Style</div>
                  <div className="text-sm text-cream-warm">{ANIME_DATA.foodStyle}</div>
                </div>
                <div className="bg-elevated rounded-sm p-3">
                  <div className="text-xs text-gold font-cinzel tracking-widest uppercase mb-1">Cuisine Family</div>
                  <div className="text-sm text-cream-warm">{ANIME_DATA.cuisineFamily}</div>
                </div>
                <div className="bg-elevated rounded-sm p-3">
                  <div className="text-xs text-gold font-cinzel tracking-widest uppercase mb-1">Setting</div>
                  <div className="text-sm text-cream-warm">{ANIME_DATA.settingType}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {ANIME_DATA.recurringThemes.map((theme) => (
                  <span key={theme} className="tag text-xs">{theme}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="card-gold-border p-5 mb-4">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Food Philosophy</div>
                <p className="font-playfair italic text-cream-warm text-base leading-relaxed">&ldquo;{ANIME_DATA.foodPhilosophy}&rdquo;</p>
              </div>
              <div className="card-premium p-5">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Atmospheric Notes</div>
                <p className="text-sm text-cream-muted leading-relaxed">{ANIME_DATA.atmosphericNotes}</p>
              </div>

              {/* Immersion Mode Toggle */}
              <div className="mt-4 flex items-center justify-between p-4 bg-charcoal border border-elevated rounded-sm">
                <div>
                  <div className="font-cinzel text-sm text-cream font-semibold">Immersion Mode</div>
                  <div className="text-xs text-cream-muted">Deep dark ambiance for the full dungeon experience</div>
                </div>
                <button
                  onClick={() => setImmersionMode(!immersionMode)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${immersionMode ? "bg-gold" : "bg-elevated"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-void absolute top-0.5 transition-all duration-300 ${immersionMode ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="badge-gold mb-2">Inspired Dishes</div>
            <h2 className="font-playfair text-2xl font-bold text-cream">Recreation Guides</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "apprentice", "home-cook", "sous-chef", "head-chef"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 text-xs rounded-sm border transition-all duration-200 ${
                  selectedDifficulty === diff
                    ? "border-gold bg-gold-faint text-gold"
                    : "border-elevated text-cream-muted hover:border-gold/30"
                }`}
              >
                {diff === "all" ? "All Difficulties" : getDifficultyLabel(diff as DifficultyLevel)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredDishes.map((dish, i) => (
            <div key={dish.name} className="card-premium overflow-hidden">
              <button
                onClick={() => setExpandedDish(expandedDish === i ? null : i)}
                className="w-full text-left p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`badge-difficulty text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(dish.difficulty)}`}>
                        {getDifficultyLabel(dish.difficulty)}
                      </span>
                      <span className="text-xs text-cream-faint">{dish.episode}</span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-cream mb-1">{dish.name}</h3>
                    {dish.originalName && (
                      <div className="text-sm text-cream-muted italic">{dish.originalName}</div>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <div className="flex gap-1">
                      {dish.flavorProfile.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded-full border border-gold/20">{f}</span>
                      ))}
                    </div>
                    {expandedDish === i ? (
                      <ChevronUp className="w-5 h-5 text-cream-muted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-cream-muted" />
                    )}
                  </div>
                </div>
              </button>

              {expandedDish === i && (
                <div className="px-6 pb-6 border-t border-elevated">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                    {/* Ingredients */}
                    <div>
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        Ingredients
                      </div>
                      <ul className="space-y-2">
                        {dish.ingredients.map((ing) => (
                          <li key={ing} className="flex items-start gap-2 text-sm text-cream-warm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technique */}
                    <div>
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5" />
                        Technique
                      </div>
                      <p className="text-sm text-cream-muted leading-relaxed mb-4">{dish.technique}</p>

                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        Plating Notes
                      </div>
                      <p className="text-sm text-cream-muted leading-relaxed">{dish.platingNotes}</p>
                    </div>
                  </div>

                  {/* Recreation Guide */}
                  <div className="mt-5 bg-gold-faint border border-gold/20 rounded-sm p-4">
                    <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Recreation Guide
                    </div>
                    <p className="text-sm text-cream-warm leading-relaxed font-playfair italic">{dish.recreationGuide}</p>
                  </div>

                  {/* Cultural Context */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-elevated rounded-sm p-4">
                      <div className="font-cinzel text-xs text-cream-muted tracking-widest uppercase mb-2">Cultural Context</div>
                      <p className="text-xs text-cream-muted leading-relaxed">{dish.culturalContext}</p>
                    </div>
                    <div className={`rounded-sm p-4 border ${immersionMode ? "bg-purple-900/20 border-purple-500/20" : "bg-elevated border-elevated"}`}>
                      <div className="font-cinzel text-xs text-purple-400 tracking-widest uppercase mb-2">Immersion Notes</div>
                      <p className="text-xs text-cream-muted leading-relaxed">{dish.immersionNotes}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex gap-3">
                    <Link href="/kitchen-trials/active" className="btn-gold text-sm py-2 px-5 inline-flex">
                      <Flame className="w-4 h-4" />
                      Cook This Dish
                    </Link>
                    <button className="btn-outline-gold text-sm py-2 px-5 inline-flex">
                      Save to Collection
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Anime Trial CTA */}
        <div className="mt-12 card-gold-border p-8 text-center">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Anime Kitchen Trial</div>
          <h3 className="font-playfair text-2xl font-bold text-cream mb-3">Take the {ANIME_DATA.title} Challenge</h3>
          <p className="text-cream-muted mb-6 max-w-lg mx-auto">
            A curated Kitchen Trial with dungeon-appropriate basket ingredients. Prove your mastery of monster ingredient cookery.
          </p>
          <Link href="/kitchen-trials" className="btn-gold">
            <Flame className="w-4 h-4" />
            Start the Anime Trial
            <Star className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
