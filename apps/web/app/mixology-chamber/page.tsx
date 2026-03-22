"use client";

import { useState } from "react";
import { Search, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const SPIRITS = ["Whiskey/Bourbon", "Gin", "Vodka", "Rum", "Tequila/Mezcal", "Brandy/Cognac", "Aperol", "Campari"];
const FLAVOR_MOODS = ["Refreshing", "Spirit-forward", "Tropical", "Smoky", "Citrus-bright", "Herbal", "Sweet & Spicy", "Classic"];
const OCCASIONS = ["Aperitif", "Dinner Pairing", "Digestif", "Brunch", "Celebration", "Cozy Night In"];

const CLASSIC_COCKTAILS = [
  {
    name: "Negroni",
    spirit: "Gin",
    category: "Classic Aperitif",
    flavorProfile: ["Bitter", "Herbal", "Citrus", "Boozy"],
    ingredients: [
      { name: "Gin", amount: "1", unit: "oz" },
      { name: "Campari", amount: "1", unit: "oz" },
      { name: "Sweet Vermouth", amount: "1", unit: "oz" },
    ],
    method: "Stir with ice for 30-45 seconds. Strain into rocks glass over a large ice cube.",
    glassware: "Rocks glass",
    garnish: "Orange peel twist — expressed and dropped",
    history: "Invented in Florence, 1919, when Count Camillo Negroni asked bartender Fosco Scarselli to strengthen his Americano by replacing the soda water with gin.",
    foodPairings: ["Charcuterie", "Salty snacks", "Aged cheese", "Prosciutto"],
    difficulty: "home-cook",
    mocktailVersion: "Seedlip Spice 94 + Campari + sweet vermouth — a surprisingly faithful bitter aperitif",
  },
  {
    name: "Old Fashioned",
    spirit: "Whiskey/Bourbon",
    category: "Classic Spirit-Forward",
    flavorProfile: ["Boozy", "Sweet", "Bitter", "Aromatic"],
    ingredients: [
      { name: "Bourbon or Rye Whiskey", amount: "2", unit: "oz" },
      { name: "Simple syrup", amount: "1/4", unit: "oz" },
      { name: "Angostura bitters", amount: "2", unit: "dashes" },
    ],
    method: "Combine in glass with a large ice cube. Stir gently 15-20 times. Don't over-dilute.",
    glassware: "Rocks glass",
    garnish: "Orange peel + cocktail cherry",
    history: "Considered the oldest cocktail — the original recipe was simply whiskey, sugar, bitters, and water. Published in 1806 as the definition of a 'cocktail'.",
    foodPairings: ["Smoked meat", "Dark chocolate", "Aged beef", "Caramelized dishes"],
    difficulty: "home-cook",
    mocktailVersion: "Strong brewed black tea + brown sugar + bitters + orange peel. Smoky and complex.",
  },
  {
    name: "Daiquiri",
    spirit: "Rum",
    category: "Classic Sour",
    flavorProfile: ["Citrus", "Sweet", "Bright", "Balanced"],
    ingredients: [
      { name: "White rum", amount: "2", unit: "oz" },
      { name: "Fresh lime juice", amount: "3/4", unit: "oz" },
      { name: "Simple syrup", amount: "3/4", unit: "oz" },
    ],
    method: "Shake vigorously with ice. Double-strain into chilled coupe. The emulsification from vigorous shaking is everything.",
    glassware: "Chilled coupe",
    garnish: "Lime wheel or none",
    history: "Created in 1898 in the Cuban mining town of Daiquirí by American engineer Jennings Cox. Became a favorite of Ernest Hemingway and President Kennedy.",
    foodPairings: ["Ceviche", "Grilled fish", "Tropical fruit", "Light seafood"],
    difficulty: "apprentice",
    mocktailVersion: "Coconut water + fresh lime + simple syrup. Add a pinch of salt for depth.",
  },
  {
    name: "Last Word",
    spirit: "Gin",
    category: "Pre-Prohibition Classic",
    flavorProfile: ["Herbal", "Citrus", "Floral", "Balanced"],
    ingredients: [
      { name: "Gin", amount: "3/4", unit: "oz" },
      { name: "Green Chartreuse", amount: "3/4", unit: "oz" },
      { name: "Maraschino liqueur", amount: "3/4", unit: "oz" },
      { name: "Fresh lime juice", amount: "3/4", unit: "oz" },
    ],
    method: "Shake with ice. Strain into chilled coupe. Equal parts — the magic is in the precision.",
    glassware: "Chilled coupe",
    garnish: "None needed — the drink speaks for itself",
    history: "1916 Detroit Athletic Club. Fell out of fashion. Rediscovered in the 2000s cocktail renaissance. Now a bartender's favorite to showcase spirits literacy.",
    foodPairings: ["Herb-forward appetizers", "Goat cheese", "Light spring dishes"],
    difficulty: "home-cook",
    mocktailVersion: "Seedlip Garden 108 + elderflower cordial + lime + green tea. Herbal and elevated.",
  },
];

const TECHNIQUES = [
  { name: "Emulsification", icon: "🥚", description: "Fat-washing spirits, egg white shaken cocktails — creating texture through science", applications: ["Whiskey sour with egg white", "Rum-butter fat wash", "Coconut-washed vodka"] },
  { name: "Infusion", icon: "⚗️", description: "Cold or heat infusion of flavors into spirits — from simple overnight to rapid sous vide", applications: ["Jalapeño tequila", "Earl Grey gin", "Coffee bourbon"] },
  { name: "Clarification", icon: "💎", description: "Milk wash clarification for visually stunning, texturally smooth cocktails", applications: ["Milk-washed rum punch", "Clarified Negroni", "Crystal-clear sours"] },
  { name: "Carbonation", icon: "🫧", description: "Force carbonating cocktails for perfect, lasting effervescence without dilution", applications: ["Sparkling Negroni", "Canned cocktails", "Nitro cold foam"] },
];

const FOOD_PAIRINGS = [
  { food: "Oysters", drinks: ["Champagne / Cava", "Classic Martini", "Fino Sherry", "Sauvignon Blanc"] },
  { food: "Charcuterie", drinks: ["Negroni", "Aperol Spritz", "Light red wine", "Provence Rosé"] },
  { food: "Dark Chocolate", drinks: ["Bourbon", "Stout beer", "Port wine", "Espresso Martini"] },
  { food: "Spicy Food", drinks: ["Cucumber Gimlet", "Coconut Daiquiri", "Sweet Riesling", "Mango Lassi Mocktail"] },
  { food: "Grilled Meat", drinks: ["Old Fashioned", "Smoky Mezcal", "Argentinian Malbec", "Dark IPA"] },
  { food: "Delicate Fish", drinks: ["Sake", "White Burgundy", "Daiquiri", "Dry Martini"] },
];

export default function MixologyChamberPage() {
  const [selectedSpirit, setSelectedSpirit] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [expandedCocktail, setExpandedCocktail] = useState<string | null>(null);

  const filtered = CLASSIC_COCKTAILS.filter((c) => {
    const spiritMatch = !selectedSpirit || c.spirit === selectedSpirit;
    const moodMatch = !selectedMood || c.flavorProfile.some((f) => f.toLowerCase().includes(selectedMood.toLowerCase())) || c.category.toLowerCase().includes(selectedMood.toLowerCase());
    return spiritMatch && moodMatch;
  });

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Mixology Chamber</div>
          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            The Bar as<br />
            <span className="gradient-text-gold">Culinary Discipline</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl mb-4 max-w-2xl mx-auto">
            A great cocktail is a recipe in liquid form — balance, technique, flavor intelligence, and impeccable execution.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Generator */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Generator</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Cocktail Generator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium p-6">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-5">Choose Your Spirit</div>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {SPIRITS.map((spirit) => (
                  <button
                    key={spirit}
                    onClick={() => setSelectedSpirit(selectedSpirit === spirit ? null : spirit)}
                    className={`py-2 px-3 text-sm rounded-sm border transition-all duration-200 text-left ${
                      selectedSpirit === spirit ? "border-gold bg-gold-faint text-gold" : "border-elevated text-cream-muted hover:border-gold/30"
                    }`}
                  >
                    {spirit}
                  </button>
                ))}
              </div>

              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Flavor Mood</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {FLAVOR_MOODS.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                      selectedMood === mood ? "border-gold bg-gold-faint text-gold" : "border-elevated text-cream-muted hover:border-gold/30"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>

              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Occasion</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {OCCASIONS.map((occ) => (
                  <button key={occ} className="px-3 py-1.5 text-xs rounded-full border border-elevated text-cream-muted hover:border-gold/30 transition-colors">
                    {occ}
                  </button>
                ))}
              </div>

              <button className="btn-gold w-full justify-center">
                Generate Cocktail
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">
                {filtered.length} Matching Cocktails
              </div>
              {filtered.slice(0, 2).map((cocktail) => (
                <div key={cocktail.name} className="card-premium p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-cinzel text-xs text-cream-muted tracking-wide mb-1">{cocktail.spirit} · {cocktail.category}</div>
                      <div className="font-playfair font-bold text-xl text-cream">{cocktail.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cocktail.flavorProfile.map((f) => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded-full border border-slate-500/30 bg-slate-500/10 text-slate-300">{f}</span>
                    ))}
                  </div>
                  <div className="text-sm text-cream-muted">{cocktail.method.substring(0, 80)}...</div>
                  <button className="mt-3 btn-outline-gold text-xs py-2 px-4 inline-flex">
                    Full Recipe
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classic Library */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Library</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Classic Cocktails</h2>
          </div>
          <div className="space-y-4">
            {CLASSIC_COCKTAILS.map((cocktail) => (
              <div key={cocktail.name} className="card-premium overflow-hidden">
                <button
                  onClick={() => setExpandedCocktail(expandedCocktail === cocktail.name ? null : cocktail.name)}
                  className="w-full text-left p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-cinzel text-xs text-cream-muted tracking-wide mb-1">{cocktail.spirit} · {cocktail.category}</div>
                      <div className="font-playfair font-bold text-xl text-cream">{cocktail.name}</div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {cocktail.flavorProfile.map((f) => (
                          <span key={f} className="text-xs px-2 py-0.5 rounded-full border border-slate-500/30 bg-slate-500/10 text-slate-300">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-cream-muted text-sm">{cocktail.glassware}</span>
                      {expandedCocktail === cocktail.name ? <ChevronUp className="w-5 h-5 text-cream-muted" /> : <ChevronDown className="w-5 h-5 text-cream-muted" />}
                    </div>
                  </div>
                </button>

                {expandedCocktail === cocktail.name && (
                  <div className="px-6 pb-6 border-t border-elevated">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                      <div>
                        <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Ingredients</div>
                        <div className="space-y-2 mb-5">
                          {cocktail.ingredients.map((ing) => (
                            <div key={ing.name} className="flex items-center gap-3 text-sm">
                              <span className="text-gold font-mono w-8 text-right">{ing.amount}</span>
                              <span className="text-cream-faint text-xs">{ing.unit}</span>
                              <span className="text-cream">{ing.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Garnish</div>
                        <div className="text-sm text-cream-muted mb-4">{cocktail.garnish}</div>
                        <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Food Pairings</div>
                        <div className="flex flex-wrap gap-2">
                          {cocktail.foodPairings.map((f) => <span key={f} className="tag text-xs">{f}</span>)}
                        </div>
                      </div>
                      <div>
                        <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Method</div>
                        <p className="text-sm text-cream-warm mb-5 leading-relaxed">{cocktail.method}</p>
                        <div className="bg-elevated rounded-sm p-3 mb-4">
                          <div className="font-cinzel text-xs text-cream-muted tracking-widest uppercase mb-2">History</div>
                          <p className="text-xs text-cream-muted font-playfair italic leading-relaxed">{cocktail.history}</p>
                        </div>
                        {cocktail.mocktailVersion && (
                          <div className="bg-sage/10 border border-sage/20 rounded-sm p-3">
                            <div className="font-cinzel text-xs text-sage tracking-widest uppercase mb-2">Mocktail Version</div>
                            <p className="text-xs text-cream-muted leading-relaxed">{cocktail.mocktailVersion}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Techniques */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Craft</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Advanced Techniques</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TECHNIQUES.map((tech) => (
              <div key={tech.name} className="card-premium p-5">
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-cinzel font-bold text-cream mb-2">{tech.name}</h3>
                <p className="text-sm text-cream-muted mb-4">{tech.description}</p>
                <div className="space-y-1">
                  {tech.applications.map((app) => (
                    <div key={app} className="flex items-center gap-2 text-xs text-cream-muted">
                      <div className="w-1 h-1 rounded-full bg-gold" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Food + Drink Pairing */}
        <section className="bg-deep border border-elevated rounded-sm p-8">
          <div className="text-center mb-10">
            <div className="badge-gold mb-3">Pairing</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Food + Drink Intelligence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FOOD_PAIRINGS.map((pairing) => (
              <div key={pairing.food} className="card-premium p-5">
                <div className="font-playfair font-bold text-cream mb-3">{pairing.food}</div>
                <div className="space-y-2">
                  {pairing.drinks.map((drink) => (
                    <div key={drink} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-cream-muted">{drink}</span>
                    </div>
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
