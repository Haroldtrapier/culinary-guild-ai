"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Clock, Trophy, Users, ChevronRight, Star, Zap, Shield, Swords, Pencil, Calendar } from "lucide-react";
import { cn, getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import type { DifficultyLevel, TrialMode } from "@/lib/types";

const MODES: { id: TrialMode; label: string; icon: React.ElementType; description: string; badge?: string }[] = [
  { id: "daily", label: "Daily Trial", icon: Calendar, description: "A fresh challenge every 24 hours. Compete globally on the same basket.", badge: "Today" },
  { id: "trial", label: "Classic Trial", icon: Flame, description: "Mystery basket challenges at your chosen difficulty. The core Kitchen Trials experience." },
  { id: "campaign", label: "Campaign", icon: Shield, description: "A narrative series of connected challenges with evolving storylines and cumulative scoring." },
  { id: "arena", label: "Arena", icon: Swords, description: "Competitive head-to-head. Same basket, same time. Score higher to win." },
  { id: "studio", label: "Studio", icon: Pencil, description: "Open creation mode. Build your own basket and challenge friends or the community." },
];

const DIFFICULTIES: { id: DifficultyLevel; label: string; stars: number; description: string; xpMult: number }[] = [
  { id: "apprentice", label: "Apprentice", stars: 1, description: "Basic pantry, familiar techniques. Perfect for beginners.", xpMult: 1 },
  { id: "home-cook", label: "Home Cook", stars: 2, description: "Everyday ingredients, some technique required.", xpMult: 1.5 },
  { id: "sous-chef", label: "Sous Chef", stars: 3, description: "Complex baskets, professional techniques expected.", xpMult: 2 },
  { id: "head-chef", label: "Head Chef", stars: 4, description: "Challenging pairings, advanced skill and creativity required.", xpMult: 3 },
  { id: "executive-chef", label: "Executive Chef", stars: 5, description: "Restaurant-grade complexity. Only the finest will do.", xpMult: 5 },
  { id: "culinary-legend", label: "Culinary Legend", stars: 6, description: "The pinnacle. Mythical baskets. Ruthless judging.", xpMult: 10 },
];

const CHALLENGE_TYPES = [
  { name: "Mystery Basket", icon: "🧺", description: "Four surprise ingredients must all be used" },
  { name: "Single Ingredient", icon: "🎯", description: "Master one ingredient across three preparations" },
  { name: "Constraint Cook", icon: "🔒", description: "Cook with a significant restriction: no salt, only 5 ingredients, etc." },
  { name: "Cuisine Deep Dive", icon: "🌏", description: "Everything must be authentic to one regional cuisine" },
  { name: "Time Attack", icon: "⚡", description: "Full dish in 20 minutes. Speed and skill tested together." },
  { name: "Deconstruct & Reconstruct", icon: "🔬", description: "Take a classic dish and reimagine it completely" },
];

const LEADERBOARD = [
  { rank: 1, name: "MirepoixMaster", score: 98, trial: "Umami Protocol", badge: "👑" },
  { rank: 2, name: "FermentedSoul", score: 96, trial: "Coastal Memory", badge: "🥈" },
  { rank: 3, name: "UmamiAlchemist", score: 94, trial: "Wok This Way", badge: "🥉" },
  { rank: 4, name: "SaffronDreams", score: 92, trial: "Mystery Pantry", badge: "🔥" },
  { rank: 5, name: "BrothKeeper", score: 91, trial: "Root to Stem", badge: "⭐" },
];

export default function KitchenTrialsPage() {
  const [selectedMode, setSelectedMode] = useState<TrialMode>("daily");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("home-cook");
  const [basketRevealed, setBasketRevealed] = useState(false);

  const basket = ["Beets (whole)", "Beet Greens", "Goat Cheese", "Walnuts"];

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-ember/5 via-void to-void" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-ember" />
                <div className="font-cinzel text-xs text-ember tracking-widest uppercase">Kitchen Trials</div>
              </div>
              <h1 className="font-cinzel font-black text-4xl md:text-5xl text-cream mb-3">
                Enter the <span className="gradient-text-gold">Kitchen</span>
              </h1>
              <p className="font-playfair italic text-cream-warm text-xl mb-2">
                The mystery basket has been revealed. The clock is running.
              </p>
              <p className="text-cream-muted text-sm max-w-xl">
                Chopped-style cooking challenges with AI judging. Five modes, six difficulty tiers, and a 100-point scoring system covering flavor, technique, creativity, and presentation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-premium p-4 text-center">
                <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="font-cinzel font-bold text-2xl text-gold">2.4M+</div>
                <div className="text-cream-faint text-xs">Trials Completed</div>
              </div>
              <div className="card-premium p-4 text-center">
                <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="font-cinzel font-bold text-2xl text-gold">12,400</div>
                <div className="text-cream-faint text-xs">Active Today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Config */}
          <div className="lg:col-span-2 space-y-8">

            {/* Mode Selection */}
            <div>
              <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Select Mode</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {MODES.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={cn(
                        "p-4 rounded-sm border text-left transition-all duration-200",
                        selectedMode === mode.id
                          ? "border-gold bg-gold-faint"
                          : "border-elevated bg-charcoal hover:border-gold/30"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={cn("w-5 h-5", selectedMode === mode.id ? "text-gold" : "text-cream-muted")} />
                        {mode.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-ember/20 text-ember border border-ember/30 font-cinzel tracking-wide">
                            {mode.badge}
                          </span>
                        )}
                      </div>
                      <div className={cn("font-cinzel text-sm font-bold mb-1", selectedMode === mode.id ? "text-gold" : "text-cream")}>
                        {mode.label}
                      </div>
                      <div className="text-xs text-cream-muted leading-relaxed">{mode.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div>
              <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Select Difficulty</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={cn(
                      "p-4 rounded-sm border text-left transition-all duration-200",
                      selectedDifficulty === diff.id
                        ? "border-gold bg-gold-faint"
                        : "border-elevated bg-charcoal hover:border-gold/30"
                    )}
                  >
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: diff.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                      ))}
                      {Array.from({ length: 6 - diff.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-elevated" />
                      ))}
                    </div>
                    <div className={cn("font-cinzel text-xs font-bold mb-1", selectedDifficulty === diff.id ? "text-gold" : "text-cream")}>
                      {diff.label}
                    </div>
                    <div className="text-xs text-cream-faint">{diff.description}</div>
                    <div className="text-xs text-gold mt-1">{diff.xpMult}× XP</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mystery Basket Reveal */}
            <div className="card-gold-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase">Mystery Basket</h2>
                <button
                  onClick={() => setBasketRevealed(!basketRevealed)}
                  className="btn-outline-gold text-xs py-2 px-4"
                >
                  {basketRevealed ? "Hide Basket" : "Reveal Basket"}
                </button>
              </div>

              {basketRevealed ? (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {basket.map((ingredient) => (
                    <div key={ingredient} className="flex items-center gap-3 bg-elevated rounded-sm px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span className="text-sm text-cream">{ingredient}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {basket.map((_, i) => (
                    <div key={i} className="bg-elevated rounded-sm px-4 py-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-elevated border border-gold/30" />
                      <div className="h-3 w-24 bg-charcoal rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-elevated">
                <div className="flex items-center gap-4 text-sm text-cream-muted">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 40 minutes</span>
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> 250 XP base</span>
                </div>
                <Link href="/kitchen-trials/active" className="btn-gold text-sm py-3">
                  <Flame className="w-4 h-4" />
                  Start Trial
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Challenge Types */}
            <div>
              <h2 className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Challenge Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHALLENGE_TYPES.map((type) => (
                  <div key={type.name} className="card-premium p-4 flex items-start gap-3">
                    <div className="text-2xl">{type.icon}</div>
                    <div>
                      <div className="font-cinzel text-sm text-cream mb-1">{type.name}</div>
                      <div className="text-xs text-cream-muted">{type.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Leaderboard + Active Trial */}
          <div className="space-y-6">
            {/* Active Trial Card */}
            <div className="card-gold-border p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Today&apos;s Daily Trial
              </div>
              <div className="font-playfair text-xl font-bold text-cream mb-2">Root to Stem</div>
              <div className={cn("inline-flex items-center px-2 py-0.5 text-xs rounded-full border mb-3", getDifficultyColor("home-cook"))}>
                {getDifficultyLabel("home-cook")}
              </div>
              <p className="text-sm text-cream-muted mb-4">A zero-waste challenge. Use the entire beet in one cohesive dish.</p>
              <div className="space-y-2 mb-4">
                {basket.map((ing) => (
                  <div key={ing} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-cream">{ing}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-elevated flex items-center justify-between text-xs text-cream-muted">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 40 min</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 250 XP</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 1,847 entered</span>
              </div>
              <Link href="/kitchen-trials/active" className="btn-gold w-full justify-center mt-4 text-sm py-3">
                Accept & Start
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Leaderboard
              </div>
              <div className="space-y-3">
                {LEADERBOARD.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-3 py-2 border-b border-elevated last:border-0">
                    <div className="text-base w-6 text-center">{entry.badge}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-cream font-medium truncate">{entry.name}</div>
                      <div className="text-xs text-cream-faint truncate">{entry.trial}</div>
                    </div>
                    <div className="font-cinzel text-sm text-gold font-bold">{entry.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring Breakdown */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">How Scoring Works</div>
              <div className="space-y-3">
                {[
                  { category: "Flavor", points: 30, description: "Taste, balance, seasoning" },
                  { category: "Technique", points: 25, description: "Method mastery, precision" },
                  { category: "Creativity", points: 20, description: "Originality, innovation" },
                  { category: "Presentation", points: 15, description: "Visual appeal, plating" },
                  { category: "Constraint Use", points: 10, description: "All basket items used" },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-cream">{item.category}</span>
                      <span className="text-xs text-gold font-cinzel">{item.points} pts</span>
                    </div>
                    <div className="w-full bg-elevated rounded-full h-1">
                      <div className="h-1 rounded-full bg-gold-gradient" style={{ width: `${item.points}%` }} />
                    </div>
                    <div className="text-xs text-cream-faint mt-0.5">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
