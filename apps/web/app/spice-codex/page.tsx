"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { SPICES, REGIONS } from "@/lib/constants";
import { getFlavorColor, cn } from "@/lib/utils";

const EXTENDED_SPICES = [
  { id: "sumac", name: "Sumac", origin: "Middle East", region: "Levant", flavorProfile: ["tangy", "citrus", "tart"], intensity: 3, bestUses: ["Sprinkled on salads", "Za'atar blend", "Meat rub", "Hummus"], cuisineFamilies: ["Levantine", "Turkish", "Persian"], historicalNotes: "Used since ancient times in the Fertile Crescent as a souring agent before lemons arrived in the region.", preparationTips: "Best added at the end of cooking or as a finishing touch — heat diminishes its brightness." },
  { id: "ras-el-hanout", name: "Ras el Hanout", origin: "Morocco", region: "North Africa", flavorProfile: ["complex", "warm", "floral", "spicy"], intensity: 4, bestUses: ["Tagine", "Couscous", "Lamb rub", "Roasted vegetables"], cuisineFamilies: ["Moroccan", "North African"], historicalNotes: "The name translates to 'top of the shop' — a prestigious blend of the finest available spices, unique to each merchant.", preparationTips: "Bloom in oil or butter before adding other ingredients to release the aromatic compounds." },
  { id: "berbere", name: "Berbere", origin: "Ethiopia", region: "East Africa", flavorProfile: ["fiery", "earthy", "aromatic", "smoky"], intensity: 5, bestUses: ["Doro wat", "Lentil stew", "Injera accompaniment", "Meat rub"], cuisineFamilies: ["Ethiopian", "Eritrean"], historicalNotes: "A cornerstone of Ethiopian cuisine for centuries, berbere varies regionally and is considered a closely guarded household recipe.", preparationTips: "Toast the whole spices before grinding for maximum depth. Use with niter kibbeh for authentic foundation." },
  { id: "garam-masala", name: "Garam Masala", origin: "Northern India", region: "South Asia", flavorProfile: ["warm", "complex", "earthy", "sweet"], intensity: 3, bestUses: ["Curries", "Biryani", "Marinades", "Roasted meats"], cuisineFamilies: ["Indian", "Pakistani"], historicalNotes: "Developed in the Mughal court cuisine, 'garam' means hot in the Ayurvedic sense — ingredients that warm the body.", preparationTips: "Add toward the end of cooking to preserve the volatile aromatics. Blooming at the start is a separate technique for foundation spicing." },
  { id: "szechuan-pepper", name: "Szechuan Pepper", origin: "Sichuan Province, China", region: "East Asia", flavorProfile: ["numbing", "citrus", "floral", "tingling"], intensity: 4, bestUses: ["Mapo tofu", "Dan dan noodles", "Five-spice blend", "Stir-fry"], cuisineFamilies: ["Chinese (Sichuan)", "Chinese (Hunan)"], historicalNotes: "Not a true pepper — it's the dried berry of the prickly ash tree. Its numbing quality (ma) is distinct from capsaicin heat (la).", preparationTips: "Dry-toast in a pan, then grind fresh. The numbing compound, hydroxy-alpha-sanshool, is potent — use sparingly until familiar." },
  { id: "zaatar", name: "Za'atar", origin: "Levant", region: "Middle East", flavorProfile: ["herbal", "nutty", "tangy", "earthy"], intensity: 3, bestUses: ["Flatbread with oil", "Labneh", "Roasted chicken", "Vegetables"], cuisineFamilies: ["Levantine", "Israeli", "Palestinian"], historicalNotes: "Both a plant (Syrian oregano) and a spice blend. The blend with sesame and sumac is ancient, with Quranic references to herb bundles.", preparationTips: "Mix with good olive oil for the classic manaeesh application. Fresh thyme is an excellent substitute for the wild zaatar herb." },
  { id: "smoked-paprika", name: "Smoked Paprika", origin: "Spain", region: "Mediterranean", flavorProfile: ["smoky", "sweet", "earthy", "peppery"], intensity: 3, bestUses: ["Patatas bravas", "Chorizo seasoning", "Paella", "Romesco sauce"], cuisineFamilies: ["Spanish", "Portuguese", "South American"], historicalNotes: "Brought from the Americas by Columbus, peppers were dried and smoked over oak fires in La Vera, Spain — creating pimentón de la Vera.", preparationTips: "Bloom briefly in hot oil at the start of cooking. Sweet, bittersweet, and hot varieties are distinct — understand which your dish needs." },
  { id: "fenugreek", name: "Fenugreek", origin: "India / Near East", region: "South Asia", flavorProfile: ["bitter", "nutty", "maple-like", "pungent"], intensity: 4, bestUses: ["Curry base", "Methi dal", "Spice blends", "Pickles"], cuisineFamilies: ["Indian", "Middle Eastern", "Ethiopian"], historicalNotes: "One of the oldest cultivated plants — seeds found in excavations of ancient Egypt. Used medicinally and culinarily across multiple ancient cultures.", preparationTips: "Seeds must be cooked to reduce bitterness. Leaves (methi) are milder and can be used fresh or dried in curries." },
  { id: "annatto", name: "Annatto", origin: "Central America", region: "Americas", flavorProfile: ["earthy", "slightly sweet", "peppery", "floral"], intensity: 2, bestUses: ["Recado rojo", "Cochinita pibil", "Coloring rice", "Achiote paste"], cuisineFamilies: ["Mexican", "Caribbean", "Peruvian"], historicalNotes: "Seeds of the achiote tree, used by the Maya and Aztec for food, body paint, and ritual. Spanish colonizers adopted it as a saffron substitute.", preparationTips: "Infuse in warm oil or lard to extract color and flavor. The seeds themselves are tough — strain them out before cooking the dish." },
  { id: "asafoetida", name: "Asafoetida (Hing)", origin: "Iran / Afghanistan", region: "Central Asia", flavorProfile: ["pungent", "onion-garlic", "sulfurous", "savory"], intensity: 5, bestUses: ["Dal tempering", "South Indian cooking", "Vegetarian cooking", "Digestive aid"], cuisineFamilies: ["Indian", "Persian"], historicalNotes: "Known as 'devil's dung' in Europe for its raw smell, but indispensable in Indian vegetarian cooking, especially for Jain communities who avoid alliums.", preparationTips: "Use in tiny amounts — just a pinch. Fry in hot oil for 30 seconds before adding other ingredients. Transforms from sulfurous to rich onion-garlic flavor." },
  { id: "saffron", name: "Saffron", origin: "Iran / Kashmir", region: "Middle East / South Asia", flavorProfile: ["floral", "honey", "metallic", "earthy"], intensity: 3, bestUses: ["Risotto Milanese", "Bouillabaisse", "Biryani", "Persian rice dishes"], cuisineFamilies: ["Persian", "Spanish", "Indian", "Moroccan"], historicalNotes: "The world's most expensive spice by weight — harvested by hand from Crocus sativus flowers. Three stigmas per flower, 70,000 flowers per pound.", preparationTips: "Bloom in warm liquid (not boiling) for 20-30 minutes before using. This releases the crocin pigment and safranal aroma. Toasting briefly first intensifies flavor." },
  { id: "mace", name: "Mace", origin: "Banda Islands, Indonesia", region: "Southeast Asia", flavorProfile: ["warm", "sweet", "nutmeg-like", "peppery"], intensity: 3, bestUses: ["Béchamel", "Pâtés", "Light curries", "Baking"], cuisineFamilies: ["European", "Indian", "Indonesian"], historicalNotes: "The aril (red net covering) around the nutmeg seed. Among the most valuable spices in European trade history — the Dutch monopoly over it shaped global colonialism.", preparationTips: "Use whole blade mace when possible for subtler flavor. Ground mace is more intense — a lighter, more floral alternative to nutmeg." },
  { id: "ajwain", name: "Ajwain (Carom Seeds)", origin: "India / Middle East", region: "South Asia", flavorProfile: ["thyme-like", "bitter", "pungent", "anise"], intensity: 4, bestUses: ["Paratha flatbreads", "Pakoras", "Fish marinades", "Lentils"], cuisineFamilies: ["Indian", "Pakistani", "Afghan"], historicalNotes: "Related to caraway and cumin. Essential to Indian street food and bread-making for thousands of years, also valued in Ayurvedic medicine for digestion.", preparationTips: "Dry toast before using to mellow the raw bitterness. A little goes a long way — the thymol content is potent and can overwhelm a dish." },
  { id: "epazote", name: "Epazote", origin: "Mexico / Central America", region: "Mesoamerica", flavorProfile: ["pungent", "herbal", "petroleum-like", "anise"], intensity: 4, bestUses: ["Black beans", "Tamales", "Quesadillas", "Salsas"], cuisineFamilies: ["Mexican", "Central American"], historicalNotes: "A pre-Columbian herb deeply embedded in Mexican cuisine. The name comes from Nahuatl — 'epazotl'. Also used medicinally as an antiparasitic.", preparationTips: "Add a few sprigs to beans during cooking — it reduces gas-causing compounds and adds distinctive Mexican flavor. Don't use dried — fresh or nothing." },
  { id: "grains-of-paradise", name: "Grains of Paradise", origin: "West Africa", region: "West Africa", flavorProfile: ["gingery", "peppery", "earthy", "citrus"], intensity: 3, bestUses: ["West African stews", "Belgian beer", "Gin botanicals", "Spice blends"], cuisineFamilies: ["West African", "Belgian brewing"], historicalNotes: "A West African pepper that was the dominant spice in medieval European cuisine before black pepper trade routes established. Fell out of use as black pepper became cheap.", preparationTips: "Grind fresh — they lose potency quickly when pre-ground. Use like black pepper with extra warmth and ginger notes." },
];

const ALL_REGIONS = [...new Set(EXTENDED_SPICES.map((s) => s.region))].sort();
const ALL_FLAVORS = ["tangy", "warm", "complex", "earthy", "spicy", "sweet", "bitter", "floral", "smoky", "herbal", "numbing", "pungent"];

export default function SpiceCodexPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return EXTENDED_SPICES.filter((spice) => {
      const matchSearch = !search || spice.name.toLowerCase().includes(search.toLowerCase()) ||
        spice.origin.toLowerCase().includes(search.toLowerCase()) ||
        spice.flavorProfile.some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = selectedRegion === "all" || spice.region === selectedRegion;
      const matchFlavor = selectedFlavor === "all" || spice.flavorProfile.some((f) => f.includes(selectedFlavor));
      return matchSearch && matchRegion && matchFlavor;
    });
  }, [search, selectedRegion, selectedFlavor]);

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Spice Codex</div>
          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            The Complete <span className="gradient-text-gold">Spice Encyclopedia</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl mb-4">
            60+ global spices. Every origin, flavor profile, pairing guide, and historical note.
          </p>
          <p className="text-cream-muted text-sm max-w-2xl mx-auto">
            From Sumac to Szechuan Pepper, Grains of Paradise to Asafoetida — the complete spice library for culinary mastery.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-deep/95 backdrop-blur-sm border-b border-elevated">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-faint" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spices, origins, flavors..."
                className="input-dark pl-10 text-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="input-dark text-sm px-3 py-2"
              >
                <option value="all">All Regions</option>
                {ALL_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="input-dark text-sm px-3 py-2"
              >
                <option value="all">All Flavors</option>
                {ALL_FLAVORS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-xs text-cream-faint">
            Showing {filtered.length} of {EXTENDED_SPICES.length} spices
          </div>
        </div>
      </div>

      {/* Spice Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((spice) => (
            <div key={spice.id} className="card-premium overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedId(expandedId === spice.id ? null : spice.id)}
                className="w-full text-left p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-cream mb-0.5">{spice.name}</h3>
                    <div className="text-xs text-cream-faint">{spice.origin}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="badge-gold text-xs">{spice.region}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn("w-2 h-2 rounded-full", i < spice.intensity ? "bg-gold" : "bg-elevated")}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flavor Profile */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {spice.flavorProfile.map((flavor) => (
                    <span key={flavor} className={cn("text-xs px-2 py-0.5 rounded-full border", getFlavorColor(flavor))}>
                      {flavor}
                    </span>
                  ))}
                </div>

                {/* Best Uses preview */}
                <div className="text-xs text-cream-faint">
                  Best for: {spice.bestUses.slice(0, 2).join(", ")}
                  {spice.bestUses.length > 2 && ` +${spice.bestUses.length - 2} more`}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === spice.id && (
                <div className="px-5 pb-5 border-t border-elevated">
                  <div className="pt-4 space-y-4">
                    {/* Best Uses */}
                    <div>
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Best Uses</div>
                      <div className="flex flex-wrap gap-1.5">
                        {spice.bestUses.map((use) => (
                          <span key={use} className="tag text-xs">{use}</span>
                        ))}
                      </div>
                    </div>

                    {/* Cuisine Families */}
                    <div>
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Cuisine Families</div>
                      <div className="flex flex-wrap gap-1.5">
                        {spice.cuisineFamilies.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full border border-gold/20 bg-gold-faint text-gold">{c}</span>
                        ))}
                      </div>
                    </div>

                    {/* Historical Notes */}
                    <div className="bg-elevated rounded-sm p-3">
                      <div className="font-cinzel text-xs text-cream-muted tracking-widest uppercase mb-2">History</div>
                      <p className="text-xs text-cream-muted leading-relaxed font-playfair italic">{spice.historicalNotes}</p>
                    </div>

                    {/* Preparation */}
                    <div className="bg-gold-faint border border-gold/20 rounded-sm p-3">
                      <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Preparation Tips</div>
                      <p className="text-xs text-cream-warm leading-relaxed">{spice.preparationTips}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🌶️</div>
            <div className="font-playfair text-xl text-cream-muted mb-2">No spices found</div>
            <div className="text-sm text-cream-faint">Try a different search term or filter</div>
          </div>
        )}
      </div>

      {/* Historical Context Sections */}
      <div className="bg-deep border-t border-elevated py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge-gold mb-3">History</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Spice & Civilization</h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🚢", title: "The Spice Trade", text: "The desire for nutmeg, cloves, pepper, and cinnamon drove the Age of Exploration. Vasco da Gama, Columbus, Magellan — all were chasing spices. The spice trade reshaped geopolitics and created the modern world." },
              { icon: "⚗️", title: "Spice Science", text: "Capsaicin produces heat, eugenol gives cloves their bite, piperine defines pepper's punch, and safranal creates saffron's distinctive aroma. Understanding the chemistry transforms intuitive cooking into mastery." },
              { icon: "🌍", title: "Cultural Identity", text: "Every spice tradition carries a culture's soul. Za'atar is Palestinian memory. Berbere is Ethiopian identity. Garam masala is centuries of Mughal refinement. To know a spice is to know its people." },
            ].map((item) => (
              <div key={item.title} className="card-premium p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-xl font-bold text-cream mb-3">{item.title}</h3>
                <p className="text-sm text-cream-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
