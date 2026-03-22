"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, ArrowRight, Users, Trophy, Sparkles } from "lucide-react";

const FEATURED_ANIME = [
  {
    id: "food-wars",
    title: "Food Wars! Shokugeki no Soma",
    style: "Elite culinary competition",
    cuisine: "Japanese fusion",
    dishes: ["Furikake Rice", "Transforming Autumn Potato", "Eggs Benedict Redux"],
    members: 8420,
    slug: "food-wars",
  },
  {
    id: "delicious-dungeon",
    title: "Delicious in Dungeon",
    style: "Monster ingredient cookery",
    cuisine: "Fantasy medieval",
    dishes: ["Basilisk Egg Omelette", "Dungeon Mushroom Stir-Fry", "Slime Pudding"],
    members: 6103,
    slug: "delicious-in-dungeon",
  },
  {
    id: "spirited-away",
    title: "Spirited Away",
    style: "Spirit world banquet cuisine",
    cuisine: "Japanese traditional",
    dishes: ["Spirit World Feast Bowls", "Onigiri", "Mysterious Herbal Soup"],
    members: 5890,
    slug: "spirited-away",
  },
  {
    id: "naruto",
    title: "Naruto / Boruto",
    style: "Village comfort food",
    cuisine: "Japanese home cooking",
    dishes: ["Ichiraku Miso Ramen", "Sakura Mochi", "Ninja Field Onigiri"],
    members: 11200,
    slug: "naruto",
  },
  {
    id: "howls-castle",
    title: "Howl's Moving Castle",
    style: "European hearth cooking",
    cuisine: "Central European",
    dishes: ["Calcifer's Bacon & Eggs", "Witch's Pumpkin Cake", "Wizard's Herb Bread"],
    members: 4320,
    slug: "howls-moving-castle",
  },
  {
    id: "restaurant-another-world",
    title: "Restaurant to Another World",
    style: "Japanese-Western yoshoku",
    cuisine: "Japanese-style Western",
    dishes: ["Hayashi Rice", "Minced Meat Cutlet", "Cream Stew"],
    members: 3540,
    slug: "restaurant-to-another-world",
  },
];

const FOOD_CATEGORIES = [
  { label: "Ramen & Noodles", icon: "🍜", count: 48 },
  { label: "Bento & Rice", icon: "🍱", count: 62 },
  { label: "Tavern & Izakaya", icon: "🍶", count: 35 },
  { label: "Festival Food", icon: "🏮", count: 27 },
  { label: "Fantasy Cuisine", icon: "⚔️", count: 41 },
  { label: "Sweets & Pastry", icon: "🍡", count: 53 },
  { label: "Hearth Cooking", icon: "🔥", count: 29 },
  { label: "Seafood", icon: "🦐", count: 38 },
];

const RECENT_TRIALS = [
  { anime: "Food Wars!", trial: "Furikake Challenge: Transform simple rice into culinary gold", difficulty: "Sous Chef", xp: 400 },
  { anime: "Delicious in Dungeon", trial: "Dungeon Forager: Cook with only foraged ingredients", difficulty: "Head Chef", xp: 600 },
  { anime: "Spirited Away", trial: "Spirit Feast: Create a meal worthy of the spirit world", difficulty: "Home Cook", xp: 300 },
  { anime: "Naruto", trial: "Ichiraku Ramen Replica: Perfect the miso broth and toppings", difficulty: "Home Cook", xp: 250 },
];

const FANDOM_RANKS = [
  { name: "Casual Viewer", icon: "📺", requirement: "1 anime dish recreated" },
  { name: "Culinary Fan", icon: "⭐", requirement: "5 dishes across 3 series" },
  { name: "Otaku Cook", icon: "⛩️", requirement: "15 dishes, 6 series" },
  { name: "Anime Palate", icon: "🌸", requirement: "30 dishes, all difficulty tiers" },
  { name: "Grand Culinary Otaku", icon: "🏯", requirement: "Original anime-inspired dish created" },
  { name: "Legendary Weeb Chef", icon: "⚜️", requirement: "50 dishes, community recognition" },
];

export default function OtakuGuildPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-void to-void" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="font-cinzel text-xs tracking-widest text-purple-400 uppercase">Otaku Culinary Guild</span>
          </div>

          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            Cook the Meals That Made You
            <br />
            <span className="gradient-text-gold">Want to Live Inside the Story</span>
          </h1>

          <p className="font-playfair italic text-cream-warm text-xl mb-8 max-w-2xl mx-auto">
            Our AI detects food styles, cuisine families, and culinary philosophies from any anime — then guides you through expert recreations of iconic dishes.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter an anime title... (e.g., &quot;Attack on Titan&quot;, &quot;My Hero Academia&quot;)"
                className="input-dark text-base pr-12 py-4"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-gold flex items-center justify-center hover:bg-gold-light transition-colors">
                <Search className="w-4 h-4 text-void" />
              </button>
            </div>
            {searchQuery && (
              <div className="mt-3 text-center">
                <Link
                  href={`/otaku-guild/${encodeURIComponent(searchQuery.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="btn-gold text-sm py-3"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Food Style for &ldquo;{searchQuery}&rdquo;
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
            <p className="text-cream-faint text-xs mt-3">
              Covering 25+ series — or try any anime you love. Our AI will infer the food style.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Featured Collections */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="badge-gold mb-2">Featured Collections</div>
              <h2 className="font-playfair text-3xl font-bold text-cream">Iconic Series</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_ANIME.map((anime) => (
              <Link
                key={anime.id}
                href={`/otaku-guild/${anime.slug}`}
                className="card-premium p-5 group hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300 block"
              >
                <div className="text-4xl mb-4">⛩️</div>
                <div className="font-cinzel text-xs text-purple-400 tracking-wide mb-1 uppercase">{anime.cuisine}</div>
                <h3 className="font-playfair text-lg font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                  {anime.title}
                </h3>
                <p className="text-sm text-cream-muted italic font-playfair mb-3">{anime.style}</p>

                <div className="mb-4">
                  <div className="text-xs text-cream-faint mb-2 font-cinzel tracking-wide uppercase">Featured Dishes</div>
                  <div className="space-y-1">
                    {anime.dishes.map((dish) => (
                      <div key={dish} className="flex items-center gap-2 text-xs text-cream-muted">
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        {dish}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-elevated">
                  <div className="flex items-center gap-1 text-xs text-cream-faint">
                    <Users className="w-3 h-3" />
                    {anime.members.toLocaleString()} cooks
                  </div>
                  <div className="flex items-center gap-1 text-purple-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Food Type */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Browse</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">By Food Type</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FOOD_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className="card-premium p-5 text-center group hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-inter text-sm text-cream group-hover:text-gold transition-colors duration-300">{cat.label}</div>
                <div className="text-xs text-cream-faint mt-1">{cat.count} dishes</div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Anime Trials */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="badge-gold mb-2">Anime Trials</div>
              <h2 className="font-playfair text-3xl font-bold text-cream">Recent Challenge Releases</h2>
            </div>
            <Link href="/kitchen-trials" className="btn-outline-gold text-sm py-2 px-4 hidden md:inline-flex">
              All Trials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECENT_TRIALS.map((trial) => (
              <div key={trial.trial} className="card-premium p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-cinzel text-xs text-purple-400 tracking-wide mb-1">{trial.anime}</div>
                    <div className="font-playfair text-base font-semibold text-cream">{trial.trial}</div>
                  </div>
                  <span className="badge-difficulty px-2 py-1 text-xs rounded-full border bg-gold/10 text-gold border-gold/30 flex-shrink-0">
                    {trial.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-elevated">
                  <span className="text-xs text-cream-faint flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-gold" /> {trial.xp} XP
                  </span>
                  <Link href="/kitchen-trials/active" className="btn-outline-gold text-xs py-1.5 px-3 inline-flex">
                    Try This Trial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fandom Ranks */}
        <section className="bg-deep border border-elevated rounded-sm p-8">
          <div className="text-center mb-10">
            <div className="badge-gold mb-3">Progression</div>
            <h2 className="font-playfair text-3xl font-bold text-cream mb-2">Fandom Progression Ranks</h2>
            <p className="font-playfair italic text-cream-muted">Recreate dishes. Earn ranks. Unlock immersion modes.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FANDOM_RANKS.map((rank, i) => (
              <div key={rank.name} className={`text-center p-4 rounded-sm border ${i === 2 ? "border-gold/30 bg-gold-faint" : "border-elevated bg-charcoal"}`}>
                <div className="text-3xl mb-2">{rank.icon}</div>
                <div className={`font-cinzel text-xs font-bold mb-2 ${i === 2 ? "text-gold" : "text-cream"}`}>{rank.name}</div>
                <div className="text-xs text-cream-faint leading-relaxed">{rank.requirement}</div>
                {i === 2 && (
                  <div className="mt-2 text-xs text-gold font-cinzel">Current Rank</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
