"use client";

import Link from "next/link";
import {
  Flame, Star, Globe, Scroll, BookOpen, Beaker, ChefHat, UtensilsCrossed,
  ArrowRight, Trophy, Clock, Zap, TrendingUp, Calendar, Users,
  Award, Shield, Target,
} from "lucide-react";

const QUICK_ACCESS = [
  { label: "Kitchen Trials", icon: Flame, href: "/kitchen-trials", color: "text-ember", bg: "bg-ember/10" },
  { label: "Otaku Guild", icon: Star, href: "/otaku-guild", color: "text-purple-400", bg: "bg-purple-400/10" },
  { label: "Guilds", icon: ChefHat, href: "/guilds", color: "text-gold", bg: "bg-gold/10" },
  { label: "Flavor Atlas", icon: Globe, href: "/flavor-atlas", color: "text-sky-400", bg: "bg-sky-400/10" },
  { label: "Spice Codex", icon: Scroll, href: "/spice-codex", color: "text-gold", bg: "bg-gold/10" },
  { label: "Heritage Table", icon: BookOpen, href: "/heritage-table", color: "text-sage", bg: "bg-sage/10" },
  { label: "Mixology", icon: Beaker, href: "/mixology-chamber", color: "text-slate-300", bg: "bg-slate-400/10" },
  { label: "Recipes", icon: UtensilsCrossed, href: "/recipe-generator", color: "text-cream-muted", bg: "bg-elevated" },
];

const RECENT_ACTIVITY = [
  { type: "trial", title: "Completed 'Umami Protocol'", detail: "Score: 88/100 — Head Chef difficulty", time: "2h ago", icon: Flame, color: "text-ember" },
  { type: "guild", title: "Guild Quest accepted", detail: "Spring Awakening — Guild of Flavor", time: "4h ago", icon: ChefHat, color: "text-gold" },
  { type: "badge", title: "Badge earned: Spice Road Traveler", detail: "Used spices from 10 different regions", time: "1d ago", icon: Award, color: "text-purple-400" },
  { type: "recipe", title: "Recipe generated: Sumac-glazed lamb", detail: "Levantine style • Head Chef level", time: "2d ago", icon: UtensilsCrossed, color: "text-sage" },
  { type: "anime", title: "Explored: Delicious in Dungeon", detail: "Unlocked 6 dish recreation guides", time: "3d ago", icon: Star, color: "text-purple-400" },
];

const GUILD_PROGRESS = [
  { guild: "Guild of Flavor", icon: "🌊", rank: "Palate Master", xp: 2400, nextXp: 3500, progress: 68 },
  { guild: "Guild of Spice", icon: "🌶️", rank: "Spice Hunter", xp: 800, nextXp: 1500, progress: 53 },
  { guild: "Otaku Guild", icon: "⛩️", rank: "Otaku Cook", xp: 1200, nextXp: 2000, progress: 60 },
];

const FEATURED_RECIPE = {
  title: "Miso-Glazed Black Cod with Dashi Broth",
  cuisine: "Japanese",
  difficulty: "Head Chef",
  prepTime: "20 min",
  cookTime: "40 min",
  description: "A master-class in umami layering. The three-day miso marinade penetrates the cod, creating a lacquered exterior that caramelizes under the broiler. The dashi broth beneath it holds the dish's soul.",
  flavorTags: ["umami", "sweet", "smoky", "delicate"],
};

export default function DashboardPage() {
  const userRank = {
    name: "Sous Chef",
    tier: 5,
    icon: "👨‍🍳",
    currentXp: 8240,
    nextXp: 13000,
    progress: Math.round((8240 / 13000) * 100),
  };

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Welcome back, Chef</div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-1">Your Culinary Command</h1>
              <p className="text-cream-muted font-inter text-sm">The kitchen never sleeps. Your next trial awaits.</p>
            </div>

            {/* Rank Display */}
            <div className="card-gold-border px-6 py-4 flex items-center gap-4 min-w-[280px]">
              <div className="text-4xl">{userRank.icon}</div>
              <div className="flex-1">
                <div className="font-cinzel text-xs text-gold tracking-widest mb-1 uppercase">{userRank.name}</div>
                <div className="text-cream-muted text-xs mb-2">{userRank.currentXp.toLocaleString()} / {userRank.nextXp.toLocaleString()} XP</div>
                <div className="w-full bg-elevated rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gold-gradient transition-all duration-700"
                    style={{ width: `${userRank.progress}%` }}
                  />
                </div>
                <div className="text-cream-faint text-xs mt-1">{userRank.progress}% to Head Chef</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Daily Trial Card */}
            <div className="card-gold-border p-6 animate-glow-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase">Today&apos;s Daily Trial</div>
                </div>
                <div className="flex items-center gap-2 text-cream-faint text-xs">
                  <Clock className="w-3 h-3" />
                  Resets in 14h 23m
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-cream mb-2">Root to Stem</h3>
                  <p className="text-cream-muted text-sm leading-relaxed mb-4">
                    A zero-waste challenge. Use the entire beet — root, stems, and greens — in a single cohesive dish that demonstrates balance and respect for the ingredient.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge-difficulty px-2 py-1 text-xs rounded-full border bg-sage/10 text-sage border-sage/30">Home Cook</span>
                    <span className="badge-difficulty px-2 py-1 text-xs rounded-full border bg-gold/10 text-gold border-gold/30">Contemporary</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-cream-muted mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 40 minutes</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 250 XP</span>
                    <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> 1,847 entered</span>
                  </div>
                  <Link href="/kitchen-trials/active" className="btn-gold text-sm py-3 inline-flex">
                    <Flame className="w-4 h-4" />
                    Accept Trial
                  </Link>
                </div>

                <div>
                  <div className="text-xs text-cream-muted uppercase tracking-widest mb-3 font-cinzel">Mystery Basket</div>
                  <div className="space-y-2 mb-4">
                    {["Beets (whole)", "Beet Greens", "Goat Cheese", "Walnuts"].map((ing) => (
                      <div key={ing} className="flex items-center gap-3 bg-elevated rounded-sm px-3 py-2">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-sm text-cream">{ing}</span>
                        <span className="ml-auto text-xs text-cream-faint">Required</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gold-faint border border-gold/20 rounded-sm p-3">
                    <div className="text-xs text-gold font-cinzel tracking-wide uppercase mb-1">Bonus Objective</div>
                    <div className="text-sm text-cream-warm font-playfair italic">Use the entire beet — zero waste</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Grid */}
            <div>
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Quick Access</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {QUICK_ACCESS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="card-premium p-4 flex flex-col items-center gap-3 group hover:border-gold/20 transition-all duration-300 text-center"
                    >
                      <div className={`w-10 h-10 rounded-sm ${item.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-xs text-cream-muted group-hover:text-cream transition-colors font-inter">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Featured Recipe */}
            <div className="card-premium p-6">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Featured Recipe
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-charcoal rounded-sm aspect-video flex items-center justify-center text-5xl border border-elevated">
                  🐟
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-cream mb-2">{FEATURED_RECIPE.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="tag">{FEATURED_RECIPE.cuisine}</span>
                    <span className="tag">{FEATURED_RECIPE.difficulty}</span>
                    <span className="tag">{FEATURED_RECIPE.prepTime} prep</span>
                    <span className="tag">{FEATURED_RECIPE.cookTime} cook</span>
                  </div>
                  <p className="text-cream-muted text-sm leading-relaxed mb-4">{FEATURED_RECIPE.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {FEATURED_RECIPE.flavorTags.map((tag) => (
                      <span key={tag} className="inline-flex px-2 py-0.5 text-xs rounded-full bg-gold/10 text-gold border border-gold/20">{tag}</span>
                    ))}
                  </div>
                  <Link href="/recipe-generator" className="btn-outline-gold text-xs py-2 px-4 inline-flex">
                    <UtensilsCrossed className="w-3 h-3" />
                    View Full Recipe
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Guild Progress */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-5 flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                Guild Progress
              </div>
              <div className="space-y-5">
                {GUILD_PROGRESS.map((g) => (
                  <div key={g.guild}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{g.icon}</span>
                        <div>
                          <div className="text-xs text-cream font-inter font-medium">{g.guild}</div>
                          <div className="text-xs text-cream-faint">{g.rank}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gold font-cinzel">{g.xp.toLocaleString()} XP</div>
                    </div>
                    <div className="w-full bg-elevated rounded-full h-1">
                      <div className="h-1 rounded-full bg-gold-gradient" style={{ width: `${g.progress}%` }} />
                    </div>
                    <div className="text-xs text-cream-faint mt-1 text-right">{g.progress}%</div>
                  </div>
                ))}
              </div>
              <Link href="/guilds" className="btn-ghost text-xs py-2 mt-4 w-full justify-center">
                All Guilds <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recent Activity
              </div>
              <div className="space-y-4">
                {RECENT_ACTIVITY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-sm bg-elevated flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-cream font-medium leading-tight">{item.title}</div>
                        <div className="text-xs text-cream-faint mt-0.5 leading-tight">{item.detail}</div>
                        <div className="text-xs text-cream-faint/50 mt-1">{item.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Quests */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-5 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Active Quests
              </div>
              <div className="space-y-4">
                <div className="bg-elevated rounded-sm p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-xs text-cream font-medium">Spring Awakening</div>
                    <span className="badge-difficulty text-xs px-2 py-0.5 rounded-full border bg-sage/10 text-sage border-sage/30 flex-shrink-0">Active</span>
                  </div>
                  <div className="text-xs text-cream-muted mb-2">Create 3 dishes using only spring vegetables with zero added umami</div>
                  <div className="text-xs text-gold">2/3 completed</div>
                  <div className="w-full bg-charcoal rounded-full h-1 mt-2">
                    <div className="h-1 rounded-full bg-gold-gradient" style={{ width: "66%" }} />
                  </div>
                </div>
                <div className="bg-elevated rounded-sm p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-xs text-cream font-medium">Spice Road Expedition</div>
                    <span className="badge-difficulty text-xs px-2 py-0.5 rounded-full border bg-gold/10 text-gold border-gold/30 flex-shrink-0">Active</span>
                  </div>
                  <div className="text-xs text-cream-muted mb-2">Cook with spices from 5 different world regions this week</div>
                  <div className="text-xs text-gold">3/5 completed</div>
                  <div className="w-full bg-charcoal rounded-full h-1 mt-2">
                    <div className="h-1 rounded-full bg-gold-gradient" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
              <Link href="/guilds" className="btn-ghost text-xs py-2 mt-4 w-full justify-center">
                View All Quests <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Leaderboard Peek */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-5 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Global Leaderboard
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "MirepoixMaster", score: 9842, icon: "👑" },
                  { rank: 2, name: "FermentedSoul", score: 9401, icon: "🥈" },
                  { rank: 3, name: "UmamiAlchemist", score: 9137, icon: "🥉" },
                  { rank: 47, name: "You", score: 8240, icon: "👨‍🍳", isYou: true },
                ].map((entry) => (
                  <div key={entry.name} className={`flex items-center gap-3 ${(entry as { isYou?: boolean }).isYou ? "bg-gold-faint border border-gold/20 rounded-sm px-3 py-2" : ""}`}>
                    <div className="text-base w-6 text-center">{entry.icon}</div>
                    <div className="flex-1">
                      <div className={`text-xs font-medium ${(entry as { isYou?: boolean }).isYou ? "text-gold" : "text-cream"}`}>{entry.name}</div>
                    </div>
                    <div className="text-xs text-cream-muted">{entry.score.toLocaleString()} XP</div>
                  </div>
                ))}
              </div>
              <Link href="/kitchen-trials" className="btn-ghost text-xs py-2 mt-4 w-full justify-center">
                Full Leaderboard <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Badges Earned */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Recent Badges
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "◃️", name: "Trial Initiator", rarity: "common" },
                  { icon: "⛩️", name: "Otaku Chef", rarity: "uncommon" },
                  { icon: "🌶️", name: "Spice Traveler", rarity: "rare" },
                ].map((badge) => (
                  <div key={badge.name} className="text-center bg-elevated rounded-sm p-3">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs text-cream-faint leading-tight">{badge.name}</div>
                    <div className={`text-xs mt-1 ${badge.rarity === "rare" ? "text-sky-400" : badge.rarity === "uncommon" ? "text-sage" : "text-cream-faint"}`}>
                      {badge.rarity}
                    </div>
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
