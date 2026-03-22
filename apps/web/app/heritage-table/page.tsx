"use client";

import { useState } from "react";
import { Search, BookOpen, Globe, ArrowRight } from "lucide-react";

const CUISINES = [
  {
    id: "cajun",
    name: "Cajun",
    region: "Louisiana, USA",
    icon: "🦐",
    culturalContext: "Born from the French Acadians expelled from Nova Scotia in the 18th century, Cajun cuisine reflects survival, adaptation, and the bounty of Louisiana's bayous. It is bold, rustic, and deeply personal.",
    signatureSpices: ["Filé powder", "Cayenne", "Paprika", "Thyme", "Bay leaf", "Black pepper"],
    cookingTechniques: ["The Holy Trinity (onion, celery, bell pepper)", "Cast iron cooking", "Blackening", "Roux making", "One-pot cooking"],
    stapleIngredients: ["Crawfish", "Andouille sausage", "Okra", "Long-grain rice", "File powder"],
    traditionalDishes: [
      { name: "Gumbo", description: "A roux-based stew that tells the whole story of Louisiana — African (okra, filé), French (roux), Native American, and Spanish" },
      { name: "Étouffée", description: "Shellfish smothered in a butter-rich sauce of the holy trinity. Cajun comfort in its purest form." },
      { name: "Boudin", description: "Rice and pork sausage unique to Cajun country — made fresh, eaten warm, standing by the butcher counter" },
    ],
    flavorProfile: ["Bold", "Smoky", "Spicy", "Earthy", "Rich"],
  },
  {
    id: "creole",
    name: "Creole",
    region: "New Orleans, USA",
    icon: "🎺",
    culturalContext: "Creole cuisine emerged from the cosmopolitan mixing pot of New Orleans — French, Spanish, African, Native American, and later Italian and German influences all present. More urban and refined than Cajun, but equally soulful.",
    signatureSpices: ["Creole seasoning", "Filé", "Cayenne", "Paprika", "Oregano", "Thyme"],
    cookingTechniques: ["Tomato-based roux", "Long simmering", "French mother sauce derivatives", "Creole seasoning", "Braising"],
    stapleIngredients: ["Tomatoes (unlike Cajun)", "Shrimp", "Crab", "Okra", "Andouille"],
    traditionalDishes: [
      { name: "Shrimp Creole", description: "Gulf shrimp in a rich tomato sauce — the defining difference from Cajun gumbo is the tomato base" },
      { name: "Bananas Foster", description: "Created at Brennan's in 1951 — bananas, brown sugar, butter, rum, tableside flambé. Pure New Orleans theater." },
      { name: "Red Beans and Rice", description: "Monday's tradition — red kidney beans slow-cooked with pickled pork, served over rice. Louis Armstrong's signature dish." },
    ],
    flavorProfile: ["Rich", "Tomato-forward", "Spicy", "Complex", "Aromatic"],
  },
  {
    id: "gullah-geechee",
    name: "Gullah Geechee",
    region: "Sea Islands, Carolinas & Georgia",
    icon: "🌾",
    culturalContext: "The Gullah Geechee people are the descendants of enslaved West and Central Africans who developed a remarkable culture on the Sea Islands. Isolated for generations, they preserved African languages, traditions, and foodways in a unique American cultural expression.",
    signatureSpices: ["Red pepper", "Black pepper", "Thyme", "Sage", "Bay leaf"],
    cookingTechniques: ["Rice cultivation tradition (brogues)", "One-pot cooking", "Open fire", "Steaming", "Preserving"],
    stapleIngredients: ["Carolina Gold rice", "Okra", "Peanuts", "Sweet potatoes", "Freshwater fish", "Shellfish"],
    traditionalDishes: [
      { name: "Gullah Red Rice", description: "A West African jollof rice tradition translated to the Lowcountry — tomatoes, bacon, bell pepper, and Carolina Gold rice cooked together" },
      { name: "Frogmore Stew", description: "Also called Lowcountry Boil — shrimp, sausage, corn, and potatoes, a communal feast cooked in one pot" },
      { name: "Perloo", description: "A one-pot rice dish with seafood or chicken — direct lineage to West African pilau traditions" },
    ],
    flavorProfile: ["Smoky", "Rice-centered", "Oceanic", "Earthy", "Rooted"],
  },
  {
    id: "west-african",
    name: "West African",
    region: "Ghana, Nigeria, Senegal, Côte d'Ivoire",
    icon: "🌍",
    culturalContext: "West African cuisine is the root of the African Diaspora foodway — it influenced Cajun, Creole, Gullah Geechee, Brazilian, and Caribbean cuisines. Rich in grains, legumes, fermented ingredients, and the 'Holy Trinity' of palm oil, peanuts, and tomatoes.",
    signatureSpices: ["Grains of paradise", "Suya spice", "Ehuru (calabash nutmeg)", "Uda (negro pepper)", "Fermented locust beans"],
    cookingTechniques: ["Palm oil cooking", "Grinding paste-based sauces", "Long simmering", "Fermentation", "Charcoal grilling"],
    stapleIngredients: ["Palm oil", "Peanuts", "Yam", "Plantain", "Fermented locust beans (dawadawa)", "Cassava"],
    traditionalDishes: [
      { name: "Jollof Rice", description: "The beloved West African rice dish — cooked in a tomato and pepper base, contested between Ghana, Nigeria, and Senegal" },
      { name: "Egusi Soup", description: "Ground melon seeds cooked with leafy greens, palm oil, and protein. A deeply nourishing traditional preparation." },
      { name: "Suya", description: "Beef skewers coated in ground groundnut, ginger, paprika and spices, grilled over charcoal — Nigeria's street food masterpiece" },
    ],
    flavorProfile: ["Umami-rich", "Peanut-forward", "Fermented", "Bold", "Warming"],
  },
  {
    id: "levantine",
    name: "Levantine",
    region: "Lebanon, Syria, Palestine, Jordan, Israel",
    icon: "🫒",
    culturalContext: "Levantine cuisine is ancient — rooted in over 10,000 years of agricultural civilization in the Fertile Crescent. It is characterized by abundance, generosity, and the mezze tradition of communal sharing. Olive oil, lemon, and fresh herbs define its spirit.",
    signatureSpices: ["Za'atar", "Sumac", "Baharat", "Allspice", "Cinnamon", "Seven spice blend"],
    cookingTechniques: ["Mezze assembly", "Slow braising (stews)", "Wood fire grilling", "Flatbread baking", "Fresh herb-forward cooking"],
    stapleIngredients: ["Olive oil", "Lemon", "Chickpeas", "Bulgur", "Lamb", "Eggplant", "Pomegranate"],
    traditionalDishes: [
      { name: "Kibbeh", description: "Ground meat and cracked wheat — fried, baked, or raw. The soul food of the Levant, with regional variations in every village." },
      { name: "Fattoush", description: "Toasted or fried flatbread salad with fresh vegetables and sumac — a tradition of using every scrap" },
      { name: "Mansaf", description: "Jordan's national dish — tender lamb braised in fermented dried yogurt (jameed), served over rice with bread" },
    ],
    flavorProfile: ["Bright", "Herbal", "Acidic", "Olive oil-rich", "Aromatic"],
  },
  {
    id: "indian",
    name: "Indian",
    region: "Subcontinental India",
    icon: "🪷",
    culturalContext: "Indian cuisine is not one cuisine but a vast tapestry of regional traditions shaped by religion, climate, topography, and trade. From the coconut-rich South to the cream-heavy North, from Rajasthani desert cooking to Bengali fish traditions — India contains multitudes.",
    signatureSpices: ["Garam masala", "Turmeric", "Cumin", "Coriander", "Fenugreek", "Asafoetida", "Mustard seeds"],
    cookingTechniques: ["Tempering (tarka)", "Dum cooking", "Tandoor baking", "Slow braising", "Wet grinding spice pastes"],
    stapleIngredients: ["Lentils (dal)", "Basmati rice", "Ghee", "Yogurt", "Paneer", "Tamarind"],
    traditionalDishes: [
      { name: "Dal Makhani", description: "Black lentils slow-cooked overnight with tomatoes, butter, and cream — the pinnacle of North Indian comfort" },
      { name: "Biryani", description: "Fragrant layered rice and meat — each region claims the definitive version. Hyderabadi, Lucknowi, Kolkata each tell a different story." },
      { name: "Dosa", description: "South Indian fermented rice and lentil crepe — consumed daily by hundreds of millions, often with sambar and coconut chutney" },
    ],
    flavorProfile: ["Layered", "Aromatic", "Complex", "Regional variation", "Spice-forward"],
  },
  {
    id: "thai",
    name: "Thai",
    region: "Thailand",
    icon: "🌺",
    culturalContext: "Thai cuisine masters the balance of four primary tastes: sweet, sour, salty, and spicy — with each dish requiring all four in harmony. Thai food is deeply tied to regional identity, royal court tradition, and Buddhist principles of freshness and lightness.",
    signatureSpices: ["Lemongrass", "Galangal", "Kaffir lime leaves", "Thai basil", "Shrimp paste (kapi)", "Bird's eye chili"],
    cookingTechniques: ["Wok stir-frying", "Curry paste pounding", "Steam-grilling", "Som tam technique", "Coconut milk balancing"],
    stapleIngredients: ["Fish sauce", "Palm sugar", "Coconut milk", "Jasmine rice", "Bird's eye chili", "Makrut lime leaves"],
    traditionalDishes: [
      { name: "Som Tam", description: "Green papaya salad pounded in a mortar — balancing fish sauce, lime, palm sugar, and chili in a single bowl" },
      { name: "Khao Man Gai", description: "Poached chicken on rice cooked in chicken stock, with fragrant sauce and clear soup. Deceptive simplicity, devastating flavor." },
      { name: "Massaman Curry", description: "The most complex Thai curry — roasted spices, tamarind, peanuts, and warm aromatics. Persian and Malay influence visible." },
    ],
    flavorProfile: ["Balanced", "Bright", "Spicy", "Aromatic", "Herbal"],
  },
  {
    id: "japanese",
    name: "Japanese",
    region: "Japan",
    icon: "⛩️",
    culturalContext: "Japanese cuisine is a philosophy as much as a food tradition. Seasonality (shun), technique reverence, and respect for the ingredient define washoku. The dashi tradition — extracting profound flavor from minimal ingredients — is a master class in restraint and depth.",
    signatureSpices: ["Sansho pepper", "Shichimi togarashi", "Yuzu", "Wasabi", "Miso varieties", "Dashi kombu"],
    cookingTechniques: ["Dashi extraction", "Knife technique (hōchō)", "Fermentation", "Grilling (yakimono)", "Pickling (tsukemono)"],
    stapleIngredients: ["Soy sauce", "Mirin", "Sake", "Kombu", "Katsuobushi", "Rice vinegar"],
    traditionalDishes: [
      { name: "Ramen", description: "Complex broths (tonkotsu, shoyu, miso, shio) with wheat noodles — each region guards its recipe with fierce pride" },
      { name: "Tempura", description: "Light batter, perfect oil temperature, immediate service — Portuguese in origin, Japanese in mastery" },
      { name: "Kaiseki", description: "The pinnacle of Japanese cuisine: a multi-course seasonal progression reflecting the kaiseki philosophy of nature and time" },
    ],
    flavorProfile: ["Umami-deep", "Subtle", "Seasonal", "Balanced", "Fermented"],
  },
];

export default function HeritageTablePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>("cajun");

  const filtered = CUISINES.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  const activeCuisine = CUISINES.find((c) => c.id === selected);

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-sage/10 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Heritage Table</div>
          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            Every Recipe Is a<br />
            <span className="gradient-text-gold">Cultural Artifact</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl mb-4 max-w-2xl mx-auto">
            Deep exploration of 20+ regional cuisines. Cultural context, historical notes, signature spices, and traditional techniques — all documented with care.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cuisines and regions..."
            className="input-dark pl-10 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cuisine Selector */}
          <div className="space-y-2">
            <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Regional Cuisines</div>
            {filtered.map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => setSelected(cuisine.id)}
                className={`w-full text-left px-4 py-3 rounded-sm border flex items-center gap-3 transition-all duration-200 ${
                  selected === cuisine.id
                    ? "border-gold bg-gold-faint"
                    : "border-elevated bg-charcoal hover:border-gold/30"
                }`}
              >
                <span className="text-xl">{cuisine.icon}</span>
                <div>
                  <div className={`font-cinzel text-sm font-bold ${selected === cuisine.id ? "text-gold" : "text-cream"}`}>{cuisine.name}</div>
                  <div className="text-xs text-cream-faint">{cuisine.region}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Cuisine Detail */}
          <div className="lg:col-span-2">
            {activeCuisine ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="card-gold-border p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{activeCuisine.icon}</div>
                    <div>
                      <h2 className="font-cinzel font-black text-2xl text-cream mb-1">{activeCuisine.name} Cuisine</h2>
                      <div className="flex items-center gap-2 text-cream-muted text-sm mb-2">
                        <Globe className="w-4 h-4" />
                        {activeCuisine.region}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCuisine.flavorProfile.map((f) => (
                          <span key={f} className="text-xs px-2 py-0.5 rounded-full border border-gold/20 bg-gold-faint text-gold">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-cream-muted leading-relaxed font-playfair italic">{activeCuisine.culturalContext}</p>
                </div>

                {/* Signature Spices */}
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Signature Spices</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCuisine.signatureSpices.map((spice) => (
                      <span key={spice} className="tag">{spice}</span>
                    ))}
                  </div>
                </div>

                {/* Techniques */}
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Cooking Techniques</div>
                  <div className="space-y-2">
                    {activeCuisine.cookingTechniques.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="text-cream-warm">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Staple Ingredients */}
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Staple Ingredients</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCuisine.stapleIngredients.map((ing) => (
                      <span key={ing} className="tag">{ing}</span>
                    ))}
                  </div>
                </div>

                {/* Traditional Dishes */}
                <div>
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Traditional Dishes</div>
                  <div className="space-y-4">
                    {activeCuisine.traditionalDishes.map((dish) => (
                      <div key={dish.name} className="card-premium p-5">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-playfair font-bold text-cream text-lg">{dish.name}</h3>
                          <button className="btn-outline-gold text-xs py-1.5 px-3 flex-shrink-0 inline-flex">
                            <BookOpen className="w-3 h-3" /> Recreate
                          </button>
                        </div>
                        <p className="text-sm text-cream-muted font-playfair italic leading-relaxed">{dish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-premium p-10 text-center">
                <Globe className="w-12 h-12 text-cream-muted mx-auto mb-4" />
                <div className="font-playfair text-xl text-cream-muted">Select a cuisine to explore</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
