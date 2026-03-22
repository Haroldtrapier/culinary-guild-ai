"use client";

import { useState } from "react";
import { Plus, X, ChefHat, UtensilsCrossed, Clock, Users, ArrowRight, Loader } from "lucide-react";
import { CUISINE_STYLES } from "@/lib/constants";
import { getDifficultyLabel } from "@/lib/utils";
import type { DifficultyLevel } from "@/lib/types";

const DIETARY = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Nut-free", "Kosher", "Halal", "Low-carb", "Paleo"];
const MEAL_TYPES = ["Breakfast", "Brunch", "Lunch", "Dinner", "Appetizer", "Side dish", "Dessert", "Snack"];
const DIFFICULTIES: DifficultyLevel[] = ["apprentice", "home-cook", "sous-chef", "head-chef", "executive-chef"];

// Mock generated recipe
const MOCK_RECIPE = {
  title: "Miso-Glazed Eggplant with Sesame and Ginger Rice",
  cuisine: "Japanese",
  difficulty: "home-cook" as DifficultyLevel,
  prepTime: 15,
  cookTime: 30,
  servings: 2,
  description: "A deeply savory, umami-rich dish built around eggplant's natural ability to absorb flavor. The miso glaze caramelizes under heat to create a lacquered, slightly sweet crust. Ginger rice grounds the dish while sesame adds nutty complexity throughout.",
  ingredients: [
    { name: "Japanese eggplant", amount: "2", unit: "medium", notes: "Halved lengthwise" },
    { name: "White miso paste", amount: "3", unit: "tbsp" },
    { name: "Mirin", amount: "2", unit: "tbsp" },
    { name: "Soy sauce", amount: "1", unit: "tbsp" },
    { name: "Sake (or dry sherry)", amount: "2", unit: "tbsp" },
    { name: "Sesame oil", amount: "1", unit: "tbsp" },
    { name: "Jasmine rice", amount: "1", unit: "cup" },
    { name: "Fresh ginger", amount: "1", unit: "inch", notes: "Finely grated" },
    { name: "Sesame seeds", amount: "2", unit: "tbsp", notes: "Toasted" },
    { name: "Scallions", amount: "3", unit: "stalks", notes: "Thinly sliced" },
    { name: "Neutral oil", amount: "2", unit: "tbsp", notes: "For cooking" },
  ],
  instructions: [
    { number: 1, title: "Score and season the eggplant", instruction: "Using a sharp knife, score the flesh of each eggplant half in a crosshatch pattern, cutting down to about 1/4 inch from the skin. This allows the miso glaze to penetrate deeply. Season lightly with salt and let rest 10 minutes.", technique: "Scoring", tips: ["Don't cut through the skin", "The salt draws out excess moisture"] },
    { number: 2, title: "Prepare the miso glaze", instruction: "Whisk together miso paste, mirin, sake, and soy sauce until completely smooth. The glaze should be thick but spreadable. Taste and adjust — it should be intensely savory with a sweet undertone.", technique: "Whisking", tips: ["White miso is milder — red miso will be more intense", "The glaze will darken significantly when broiled"] },
    { number: 3, title: "Cook the ginger rice", instruction: "Rinse rice until water runs clear. Cook with grated ginger stirred into the cooking water. The ratio is 1:1.25 rice to water. Bring to boil, then lowest simmer, covered, for 15 minutes.", technique: "Absorption method", tips: ["Resting the rice after cooking for 5 minutes improves texture", "Ginger becomes sweeter and more subtle when cooked"] },
    { number: 4, title: "Sear the eggplant", instruction: "Heat oil in an oven-safe pan over medium-high heat. Place eggplant cut-side down and cook without moving for 4-5 minutes until deeply golden brown. Flip carefully and cook skin-side down for 2 minutes.", technique: "Searing", tips: ["Don't crowd the pan — work in batches if needed", "High enough heat to create color, not steam"] },
    { number: 5, title: "Glaze and broil", instruction: "Brush the miso glaze generously over the cut side of each eggplant. Place under the broiler 6 inches from the element and broil 4-5 minutes until the glaze is bubbling and caramelized in places.", technique: "Broiling", tips: ["Watch carefully — miso burns quickly", "The sugars in mirin and miso will caramelize and deepen"] },
    { number: 6, title: "Plate and finish", instruction: "Fluff the ginger rice and mound into bowls. Place glazed eggplant alongside. Drizzle with sesame oil. Scatter toasted sesame seeds and sliced scallions. Serve immediately.", technique: "Plating", tips: ["The sesame oil added cold at the end gives maximum aroma", "Eat immediately — the glaze is at its best just out of the broiler"] },
  ],
  flavorTags: ["umami", "sweet", "savory", "smoky", "nutty"],
  techniqueTags: ["Broiling", "Miso glazing", "Absorption method"],
  sauceSuggestions: ["A drizzle of ponzu for acid brightness", "Gochujang cream for heat and richness"],
  spiceSuggestions: ["Togarashi for heat", "Sansho pepper for numbing citrus notes"],
  pairingSuggestions: [
    { type: "wine", suggestion: "Dry Junmai Sake", notes: "Mirrors the umami profile, cleanses between bites", confidence: 95 },
    { type: "non-alcoholic", suggestion: "Cold Mugicha (barley tea)", notes: "Toasty, earthy — complementary grain note", confidence: 88 },
  ],
  culturalNotes: "Nasu dengaku (miso-glazed eggplant) is one of Japan's most beloved vegetarian preparations. The technique dates back centuries to tofu dengaku, which was adapted for eggplant in Kyoto's Buddhist temple cooking tradition.",
  authorNote: "This dish rewards patience. The scoring and salting step is non-negotiable for proper glaze penetration. The difference between a rushed version and a properly executed one is significant.",
};

export default function RecipeGeneratorPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [cuisine, setCuisine] = useState<string>("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<DifficultyLevel>("home-cook");
  const [servings, setServings] = useState(2);
  const [mealType, setMealType] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const toggleDietary = (d: string) => {
    setDietary((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Recipe Generator</div>
          <h1 className="font-cinzel font-black text-4xl md:text-5xl text-cream mb-4">
            Tell Us What&apos;s in Your Kitchen.<br />
            <span className="gradient-text-gold">We&apos;ll Tell You What to Cook.</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl max-w-2xl mx-auto">
            From pantry ingredients to Michelin-quality recipes in seconds. AI-powered with sauce, spice, and pairing suggestions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Config Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ingredients */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Your Ingredients</div>
              <div className="flex gap-2 mb-3">
                <input
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                  placeholder="Add ingredient..."
                  className="input-dark text-sm flex-1"
                />
                <button onClick={addIngredient} className="btn-gold text-sm py-2 px-3">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <div key={ing} className="flex items-center gap-1.5 px-3 py-1.5 bg-elevated rounded-full border border-gold/20">
                      <span className="text-sm text-cream">{ing}</span>
                      <button onClick={() => removeIngredient(ing)} className="text-cream-faint hover:text-cream">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-cream-faint text-xs">
                  Add ingredients from your pantry, fridge, or garden
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-elevated">
                <div className="text-xs text-cream-faint mb-2">Quick add:</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Chicken", "Garlic", "Lemon", "Olive oil", "Pasta", "Eggs", "Butter", "Onion"].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => !ingredients.includes(quick) && setIngredients([...ingredients, quick])}
                      className="text-xs px-2 py-1 rounded-full border border-elevated text-cream-faint hover:border-gold/30 hover:text-cream transition-colors"
                    >
                      + {quick}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cuisine Style */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Cuisine Style</div>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="input-dark text-sm"
              >
                <option value="">Any cuisine</option>
                {CUISINE_STYLES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Meal Type */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Meal Type</div>
              <div className="grid grid-cols-2 gap-2">
                {MEAL_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setMealType(mealType === type ? "" : type)}
                    className={`py-2 text-xs rounded-sm border transition-all duration-200 ${mealType === type ? "border-gold bg-gold-faint text-gold" : "border-elevated text-cream-muted hover:border-gold/30"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Skill Level</div>
              <div className="space-y-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSkillLevel(d)}
                    className={`w-full py-2 px-3 text-sm rounded-sm border text-left transition-all duration-200 ${skillLevel === d ? "border-gold bg-gold-faint text-gold" : "border-elevated text-cream-muted hover:border-gold/30"}`}
                  >
                    {getDifficultyLabel(d)}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Dietary Restrictions</div>
              <div className="flex flex-wrap gap-2">
                {DIETARY.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDietary(d)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${dietary.includes(d) ? "border-sage/50 bg-sage/10 text-sage" : "border-elevated text-cream-muted hover:border-sage/30"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Servings */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Servings: {servings}
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-cream-faint mt-1">
                <span>1 person</span>
                <span>12 people</span>
              </div>
            </div>

            {/* Generate */}
            <button
              onClick={handleGenerate}
              disabled={loading || ingredients.length === 0}
              className={`btn-gold w-full justify-center py-4 text-base shadow-gold ${(loading || ingredients.length === 0) ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Crafting your recipe...
                </>
              ) : (
                <>
                  <ChefHat className="w-5 h-5" />
                  Generate Recipe
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Recipe Output */}
          <div className="lg:col-span-3">
            {!generated && !loading ? (
              <div className="card-premium p-12 text-center h-full flex flex-col items-center justify-center">
                <UtensilsCrossed className="w-16 h-16 text-cream-faint mx-auto mb-4" />
                <div className="font-playfair text-2xl text-cream-muted mb-2">Your recipe awaits</div>
                <p className="text-cream-faint text-sm max-w-sm">
                  Add your pantry ingredients, set your preferences, and let the AI craft a complete recipe — with technique guidance, sauce suggestions, and pairing recommendations.
                </p>
              </div>
            ) : loading ? (
              <div className="card-premium p-12 text-center h-full flex flex-col items-center justify-center gap-4">
                <Loader className="w-12 h-12 text-gold animate-spin" />
                <div className="font-playfair text-xl text-cream">Crafting your recipe...</div>
                <div className="text-cream-muted text-sm">Analyzing ingredients, flavor profiles, and technique combinations</div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recipe Header */}
                <div className="card-gold-border p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">{MOCK_RECIPE.cuisine} · AI Generated</div>
                      <h2 className="font-playfair text-2xl font-bold text-cream">{MOCK_RECIPE.title}</h2>
                    </div>
                    <div className="badge-gold">Ready</div>
                  </div>
                  <p className="font-playfair italic text-cream-warm leading-relaxed mb-4">{MOCK_RECIPE.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-elevated">
                    {[
                      { label: "Prep", value: `${MOCK_RECIPE.prepTime} min`, icon: Clock },
                      { label: "Cook", value: `${MOCK_RECIPE.cookTime} min`, icon: Clock },
                      { label: "Serves", value: MOCK_RECIPE.servings, icon: Users },
                      { label: "Level", value: getDifficultyLabel(MOCK_RECIPE.difficulty), icon: ChefHat },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="text-center">
                          <Icon className="w-4 h-4 text-gold mx-auto mb-1" />
                          <div className="text-cream font-semibold text-sm">{String(stat.value)}</div>
                          <div className="text-cream-faint text-xs">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {MOCK_RECIPE.flavorTags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-gold/20 bg-gold-faint text-gold">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Ingredients</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {MOCK_RECIPE.ingredients.map((ing) => (
                      <div key={ing.name} className="flex items-center gap-3 py-2 border-b border-elevated last:border-0">
                        <div className="text-gold font-mono text-sm w-12 text-right">{ing.amount} {ing.unit}</div>
                        <div>
                          <div className="text-sm text-cream">{ing.name}</div>
                          {ing.notes && <div className="text-xs text-cream-faint">{ing.notes}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Instructions</div>
                  <div className="space-y-5">
                    {MOCK_RECIPE.instructions.map((step) => (
                      <div key={step.number} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 font-cinzel text-gold text-sm">
                          {step.number}
                        </div>
                        <div>
                          <div className="font-cinzel text-sm text-cream font-bold mb-1">{step.title}</div>
                          <p className="text-sm text-cream-muted leading-relaxed mb-2">{step.instruction}</p>
                          {step.tips && (
                            <div className="bg-gold-faint border border-gold/10 rounded-sm p-2">
                              {step.tips.map((tip) => (
                                <div key={tip} className="text-xs text-cream-warm flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                                  {tip}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card-premium p-5">
                    <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Sauce Suggestions</div>
                    <div className="space-y-2">
                      {MOCK_RECIPE.sauceSuggestions.map((s) => (
                        <div key={s} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                          <span className="text-cream-muted">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-premium p-5">
                    <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Spice Options</div>
                    <div className="space-y-2">
                      {MOCK_RECIPE.spiceSuggestions.map((s) => (
                        <div key={s} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                          <span className="text-cream-muted">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cultural Notes */}
                {MOCK_RECIPE.culturalNotes && (
                  <div className="bg-elevated rounded-sm p-5">
                    <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Cultural Context</div>
                    <p className="text-sm text-cream-muted font-playfair italic leading-relaxed">{MOCK_RECIPE.culturalNotes}</p>
                  </div>
                )}

                {/* Chef Note */}
                {MOCK_RECIPE.authorNote && (
                  <div className="bg-gold-faint border border-gold/20 rounded-sm p-5">
                    <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Chef&apos;s Note</div>
                    <p className="text-sm text-cream-warm font-playfair italic leading-relaxed">{MOCK_RECIPE.authorNote}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
