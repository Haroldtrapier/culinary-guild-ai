"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, ArrowRight, Loader, Sparkles } from "lucide-react";
import { slugify, getDifficultyLabel } from "@/lib/utils";
import type { AnimeInferenceResult } from "@/lib/types";

interface AnimeLookupProps {
  placeholder?: string;
  compact?: boolean;
  onResult?: (result: AnimeInferenceResult) => void;
}

const MOCK_RESULT: AnimeInferenceResult = {
  seriesTitle: "Attack on Titan",
  detectedStyle: "Military ration cooking with Central European peasant tradition undertones",
  cuisineFamily: "Central European — German/Austrian-style hearty fare",
  settingType: "Walled fortress city, military barracks and mess halls",
  foodPhilosophy: "Food is survival and morale. Within the walls, bread, stew, and preserved meats sustain soldiers. Outside the walls, nothing. The scarcity makes every meal significant.",
  keyDishes: [
    {
      name: "Survey Corps Potato Soup",
      ingredients: ["Potatoes", "Barley", "Smoked pork", "Onions", "Bay leaves", "Salt"],
      technique: "Long simmer in a large pot. Root vegetables added in stages. Potatoes last so they don't dissolve.",
      difficulty: "apprentice",
      platingNotes: "Served in deep bowls, no decoration. The meal is the sustenance. Bread alongside.",
      flavorProfile: ["Hearty", "Smoky", "Earthy", "Warming"],
      recreationGuide: "Use smoked pork belly or smoked sausage for the authentic military smokiness. The barley gives body and makes it properly filling — this is designed to fuel soldiers for combat.",
    },
    {
      name: "Garrison Barracks Bread",
      ingredients: ["Rye flour", "Wheat flour", "Wild yeast starter", "Salt", "Caraway seeds"],
      technique: "Long cold fermentation. Dense, chewy crumb. Baked in a Dutch oven.",
      difficulty: "sous-chef",
      platingNotes: "Sliced thick. Eaten with whatever is available — the bread is the meal, not the accompaniment.",
      flavorProfile: ["Earthy", "Slightly sour", "Nutty", "Dense"],
      recreationGuide: "Use 70% rye flour for the authentic dense Central European quality. The caraway seeds are period-accurate and add unmistakable flavor.",
    },
  ],
  atmosphericNotes: "All meals are consumed quickly, standing or seated on rough benches. Meals are fuel, not pleasure. But the moments of eating together form the emotional core of the show.",
  recommendedDifficulty: "home-cook",
  confidence: 84,
};

export default function AnimeLookup({ placeholder = "Enter any anime title...", compact = false, onResult }: AnimeLookupProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnimeInferenceResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const inferredResult = { ...MOCK_RESULT, seriesTitle: query };
    setResult(inferredResult);
    setLoading(false);
    onResult?.(inferredResult);
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={placeholder}
              className="input-dark pl-10 text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="btn-gold text-sm py-2 px-4 disabled:opacity-60"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>
        {result && (
          <Link href={`/otaku-guild/${slugify(result.seriesTitle)}`} className="btn-outline-gold text-sm py-2 w-full justify-center inline-flex">
            <Star className="w-4 h-4" />
            View {result.seriesTitle} dishes
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={placeholder}
            className="input-dark pl-10"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="btn-gold disabled:opacity-60"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : (
            <>
              <Sparkles className="w-4 h-4" />
              Detect Style
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card-premium p-8 text-center">
          <Loader className="w-8 h-8 text-gold animate-spin mx-auto mb-3" />
          <div className="font-playfair text-cream">Analyzing food style for &ldquo;{query}&rdquo;...</div>
          <div className="text-cream-faint text-sm mt-2">Detecting cuisine family, setting type, and key dishes</div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-4">
          {/* Detection Summary */}
          <div className="card-gold-border p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-3">
                  <Star className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-cinzel text-xs tracking-widest text-purple-400">Food Style Detected</span>
                </div>
                <h3 className="font-playfair font-bold text-xl text-cream">{result.seriesTitle}</h3>
              </div>
              <div className="text-right">
                <div className="font-cinzel text-gold font-bold text-xl">{result.confidence}%</div>
                <div className="text-xs text-cream-faint">confidence</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-elevated rounded-sm p-3">
                <div className="text-xs text-gold font-cinzel tracking-wide uppercase mb-1">Food Style</div>
                <div className="text-sm text-cream-warm">{result.detectedStyle}</div>
              </div>
              <div className="bg-elevated rounded-sm p-3">
                <div className="text-xs text-gold font-cinzel tracking-wide uppercase mb-1">Cuisine Family</div>
                <div className="text-sm text-cream-warm">{result.cuisineFamily}</div>
              </div>
              <div className="bg-elevated rounded-sm p-3 md:col-span-2">
                <div className="text-xs text-gold font-cinzel tracking-wide uppercase mb-1">Food Philosophy</div>
                <div className="text-sm text-cream-muted font-playfair italic">{result.foodPhilosophy}</div>
              </div>
            </div>
          </div>

          {/* Key Dishes */}
          <div>
            <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Detected Key Dishes</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.keyDishes.map((dish) => (
                <div key={dish.name} className="card-premium p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-playfair font-semibold text-cream">{dish.name}</div>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-gold/20 bg-gold-faint text-gold flex-shrink-0">
                      {getDifficultyLabel(dish.difficulty)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dish.flavorProfile.map((f) => (
                      <span key={f} className="text-xs text-cream-faint">{f}</span>
                    ))}
                  </div>
                  <p className="text-xs text-cream-muted">{dish.recreationGuide.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/otaku-guild/${slugify(result.seriesTitle)}`} className="btn-gold flex-1 justify-center">
              <Star className="w-4 h-4" />
              Full Recreation Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => { setResult(null); setQuery(""); }} className="btn-ghost text-sm px-4">
              New Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
