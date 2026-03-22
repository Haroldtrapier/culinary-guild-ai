"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, Plus, X, Globe } from "lucide-react";
import { getFlavorColor, cn } from "@/lib/utils";

const FLAVOR_FAMILIES = [
  { id: "umami", label: "Umami", icon: "🍄", ingredients: ["Mushrooms", "Parmesan", "Soy sauce", "Miso", "Anchovies", "Tomato", "Worcestershire"] },
  { id: "acid", label: "Acid", icon: "🍋", ingredients: ["Lemon", "Lime", "Vinegar", "Yogurt", "Tamarind", "Pomegranate molasses", "Wine"] },
  { id: "fat", label: "Fat & Richness", icon: "🥑", ingredients: ["Butter", "Olive oil", "Cream", "Avocado", "Tahini", "Coconut milk", "Duck fat"] },
  { id: "sweet", label: "Sweet", icon: "🍯", ingredients: ["Honey", "Brown sugar", "Mirin", "Dates", "Caramelized onion", "Beets", "Sweet potato"] },
  { id: "bitter", label: "Bitter", icon: "☕", ingredients: ["Coffee", "Dark chocolate", "Radicchio", "Endive", "Arugula", "Espresso", "Stout"] },
  { id: "heat", label: "Heat", icon: "🌶️", ingredients: ["Jalapeño", "Szechuan pepper", "Ginger", "Horseradish", "Mustard", "Wasabi", "Black pepper"] },
  { id: "herbal", label: "Herbal & Fresh", icon: "🌿", ingredients: ["Basil", "Cilantro", "Mint", "Tarragon", "Dill", "Parsley", "Shiso"] },
  { id: "smoky", label: "Smoky", icon: "💨", ingredients: ["Smoked paprika", "Chipotle", "Lapsang souchong", "Miso (smoked)", "Bacon", "Charred vegetables"] },
];

const PAIRING_DATA: Record<string, { ingredients: string[]; confidence: number; reason: string }[]> = {
  "beets": [
    { ingredients: ["Goat cheese"], confidence: 97, reason: "Earthy sweetness balanced by acid fat — a timeless combination" },
    { ingredients: ["Orange"], confidence: 94, reason: "Citrus acid brightens beet's earthiness and complements its sweetness" },
    { ingredients: ["Walnuts"], confidence: 92, reason: "Bitter notes from walnuts contrast beet sweetness; textural contrast" },
    { ingredients: ["Dill"], confidence: 89, reason: "Fresh herbal quality lifts the heavy earthiness of roasted beet" },
    { ingredients: ["Horseradish"], confidence: 85, reason: "Sharp heat cuts through the richness and sweetness" },
    { ingredients: ["Balsamic vinegar"], confidence: 88, reason: "Sweet-acid complexity mirrors and amplifies beet's own profile" },
  ],
  "chocolate": [
    { ingredients: ["Coffee"], confidence: 98, reason: "Shared roasted, bitter compounds create harmonic resonance" },
    { ingredients: ["Raspberry"], confidence: 95, reason: "Bright acid and fruit notes contrast the heavy richness" },
    { ingredients: ["Chili"], confidence: 91, reason: "Heat activates the same receptors as chocolate's theobromine" },
    { ingredients: ["Cardamom"], confidence: 88, reason: "Floral, citrus notes elevate chocolate's aromatic complexity" },
    { ingredients: ["Sea salt"], confidence: 96, reason: "Salt enhances sweetness perception and adds textural contrast" },
    { ingredients: ["Orange"], confidence: 93, reason: "Classic combination — citrus oil and cocoa butter are complementary fats" },
  ],
  "lamb": [
    { ingredients: ["Rosemary"], confidence: 96, reason: "Classic: the pine-resin compounds in rosemary mirror lamb's own aromatics" },
    { ingredients: ["Mint"], confidence: 94, reason: "Fresh brightness cuts through the rich fat; British tradition with good reason" },
    { ingredients: ["Pomegranate"], confidence: 92, reason: "Middle Eastern tradition — acid and fruit tames lamb's gaminess" },
    { ingredients: ["Harissa"], confidence: 90, reason: "North African spice heat complements lamb's robust flavor" },
    { ingredients: ["Apricot"], confidence: 87, reason: "Sweet stone fruit's acidity and natural pectin glaze beautifully" },
    { ingredients: ["Anchovy"], confidence: 82, reason: "Umami amplifier — invisible but intensifies the meat's savory depth" },
  ],
};

const BALANCE_GUIDE = [
  { element: "Salt", level: 3, role: "Enhances all other flavors; perceived sweetness increases; bitterness decreases", sources: ["Sea salt", "Fish sauce", "Soy sauce", "Miso", "Parmesan"] },
  { element: "Acid", level: 4, role: "Brightens and lifts; cuts richness; heightens freshness perception", sources: ["Lemon juice", "Vinegar", "Wine", "Yogurt", "Tamarind"] },
  { element: "Fat", level: 3, role: "Carries flavor molecules; adds richness and mouthfeel; extends finish", sources: ["Butter", "Olive oil", "Cream", "Avocado", "Tahini"] },
  { element: "Heat", level: 2, role: "Activates heat receptors; increases saliva; energizes the palate", sources: ["Chili", "Black pepper", "Ginger", "Horseradish", "Mustard"] },
  { element: "Sweet", level: 2, role: "Balances acid and heat; adds depth; encourages browning", sources: ["Honey", "Sugar", "Mirin", "Caramelized onion", "Dates"] },
  { element: "Bitter", level: 1, role: "Adds complexity; signals health compounds; grounds the dish", sources: ["Coffee", "Dark greens", "Radicchio", "Char", "Citrus peel"] },
];

export default function FlavorAtlasPage() {
  const [searchIngredient, setSearchIngredient] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [pantryInput, setPantryInput] = useState("");

  const pairings = selectedIngredient
    ? PAIRING_DATA[selectedIngredient.toLowerCase()] ?? []
    : [];

  const handleSearch = () => {
    const key = searchIngredient.toLowerCase().trim();
    if (PAIRING_DATA[key]) {
      setSelectedIngredient(searchIngredient);
    } else {
      setSelectedIngredient(searchIngredient); // Will show empty state
    }
  };

  const addPantryItem = () => {
    if (pantryInput.trim() && !pantryItems.includes(pantryInput.trim())) {
      setPantryItems([...pantryItems, pantryInput.trim()]);
      setPantryInput("");
    }
  };

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Flavor Atlas</div>
          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            Intelligent <span className="gradient-text-gold">Flavor Intelligence</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl mb-4">
            Discover what goes with what — across 500+ ingredients and flavor families.
          </p>
          <p className="text-cream-muted text-sm max-w-2xl mx-auto">
            Flavor science-backed pairing suggestions with confidence scores, flavor family maps, and balance guidance.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Main Pairing Tool */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredient Search */}
          <div>
            <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Ingredient Pairing</h2>
            <div className="card-premium p-6">
              <div className="font-playfair text-xl font-bold text-cream mb-2">What goes with...?</div>
              <p className="text-cream-muted text-sm mb-5">Enter any ingredient to discover its best pairings with confidence scores and reasoning.</p>

              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-faint" />
                  <input
                    value={searchIngredient}
                    onChange={(e) => setSearchIngredient(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="e.g., beets, chocolate, lamb, miso..."
                    className="input-dark pl-10 text-sm"
                  />
                </div>
                <button onClick={handleSearch} className="btn-gold text-sm py-2 px-4">
                  Pair
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2">
                {["Beets", "Chocolate", "Lamb"].map((ing) => (
                  <button
                    key={ing}
                    onClick={() => { setSearchIngredient(ing); setSelectedIngredient(ing); }}
                    className={cn("text-xs px-3 py-1.5 rounded-full border transition-all duration-200", selectedIngredient === ing ? "border-gold bg-gold-faint text-gold" : "border-elevated text-cream-muted hover:border-gold/30")}
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {selectedIngredient && (
              <div className="mt-4 space-y-3">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase">
                  Pairings for &ldquo;{selectedIngredient}&rdquo;
                </div>
                {pairings.length > 0 ? pairings.map((pairing, i) => (
                  <div key={i} className="card-premium p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-playfair font-semibold text-cream">{pairing.ingredients.join(" + ")}</div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="font-cinzel text-gold font-bold text-sm">{pairing.confidence}%</div>
                        <div className="w-12 h-1.5 bg-elevated rounded-full">
                          <div className="h-1.5 rounded-full bg-gold-gradient" style={{ width: `${pairing.confidence}%` }} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-cream-muted font-playfair italic">{pairing.reason}</p>
                  </div>
                )) : (
                  <div className="card-premium p-6 text-center">
                    <Globe className="w-8 h-8 text-cream-muted mx-auto mb-3" />
                    <div className="font-playfair text-cream-muted">No pre-loaded pairings for &ldquo;{selectedIngredient}&rdquo;</div>
                    <p className="text-xs text-cream-faint mt-2">Try the AI pairing engine for any ingredient</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pantry Pairing Tool */}
          <div>
            <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Pantry Pairing</h2>
            <div className="card-premium p-6">
              <div className="font-playfair text-xl font-bold text-cream mb-2">What can I make?</div>
              <p className="text-cream-muted text-sm mb-5">Add your pantry ingredients and discover what flavors complement them together.</p>

              <div className="flex gap-2 mb-4">
                <input
                  value={pantryInput}
                  onChange={(e) => setPantryInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPantryItem()}
                  placeholder="Add ingredient..."
                  className="input-dark text-sm flex-1"
                />
                <button onClick={addPantryItem} className="btn-gold text-sm py-2 px-3">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {pantryItems.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {pantryItems.map((item) => (
                    <div key={item} className="flex items-center gap-2 px-3 py-1.5 bg-elevated rounded-full border border-gold/20">
                      <span className="text-sm text-cream">{item}</span>
                      <button onClick={() => setPantryItems(pantryItems.filter((i) => i !== item))} className="text-cream-faint hover:text-cream transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-elevated rounded-sm p-4 text-center mb-4">
                  <div className="text-cream-faint text-sm">Add ingredients to analyze flavor compatibility</div>
                </div>
              )}

              {pantryItems.length >= 2 && (
                <button className="btn-gold w-full justify-center text-sm">
                  <Search className="w-4 h-4" />
                  Analyze Flavor Compatibility
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Balance Guide */}
            <div className="mt-4 card-premium p-6">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Flavor Balance Check</div>
              <div className="space-y-3">
                {BALANCE_GUIDE.slice(0, 4).map((element) => (
                  <div key={element.element}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-cinzel text-cream">{element.element}</span>
                      <span className="text-xs text-cream-faint">Level {element.level}/5</span>
                    </div>
                    <div className="w-full bg-elevated rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-gold-gradient" style={{ width: `${(element.level / 5) * 100}%` }} />
                    </div>
                    <div className="text-xs text-cream-faint mt-0.5 truncate">{element.sources.slice(0, 2).join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flavor Families */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Flavor Families</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Browse by Flavor Family</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FLAVOR_FAMILIES.map((family) => (
              <button
                key={family.id}
                onClick={() => setActiveFamily(activeFamily === family.id ? null : family.id)}
                className={cn(
                  "card-premium p-5 text-left transition-all duration-200",
                  activeFamily === family.id ? "border-gold bg-gold-faint" : "hover:border-gold/30"
                )}
              >
                <div className="text-3xl mb-3">{family.icon}</div>
                <div className={cn("font-cinzel text-sm font-bold mb-2", activeFamily === family.id ? "text-gold" : "text-cream")}>
                  {family.label}
                </div>
                <div className="text-xs text-cream-faint">{family.ingredients.length} ingredients</div>
              </button>
            ))}
          </div>

          {activeFamily && (() => {
            const family = FLAVOR_FAMILIES.find((f) => f.id === activeFamily);
            if (!family) return null;
            return (
              <div className="mt-4 card-premium p-5">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-2">
                  {family.icon} {family.label} Ingredients
                </div>
                <div className="flex flex-wrap gap-2">
                  {family.ingredients.map((ing) => (
                    <button
                      key={ing}
                      onClick={() => { setSearchIngredient(ing); setSelectedIngredient(ing); }}
                      className="tag hover:border-gold/30 hover:text-cream transition-colors cursor-pointer"
                    >
                      {ing}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* Full Balance Guide */}
        <section className="bg-deep border border-elevated rounded-sm p-8">
          <div className="text-center mb-10">
            <div className="badge-gold mb-3">Balance Science</div>
            <h2 className="font-playfair text-3xl font-bold text-cream mb-2">The Six Elements of Flavor Balance</h2>
            <p className="font-playfair italic text-cream-muted">Understanding how flavor elements interact is the foundation of every great dish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BALANCE_GUIDE.map((element) => (
              <div key={element.element} className="card-premium p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-cinzel font-bold text-cream">{element.element}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={cn("w-2 h-2 rounded-full", i < element.level ? "bg-gold" : "bg-elevated")} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-cream-muted leading-relaxed mb-3">{element.role}</p>
                <div className="font-cinzel text-xs text-cream-faint tracking-wide uppercase mb-2">Sources</div>
                <div className="flex flex-wrap gap-1">
                  {element.sources.map((s) => (
                    <span key={s} className="tag text-xs">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
