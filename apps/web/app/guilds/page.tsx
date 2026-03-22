"use client";

import Link from "next/link";
import { Users, ArrowRight, Trophy, Star, Shield } from "lucide-react";
import { GUILDS } from "@/lib/constants";

const SEASONAL_QUESTS = [
  { guild: "Guild of Flavor", quest: "Spring Awakening", deadline: "Apr 15", reward: "Flavor Savant badge", difficulty: "Sous Chef" },
  { guild: "Guild of Spice", quest: "Silk Road Journey", deadline: "Apr 22", reward: "Aromatist title + 800 XP", difficulty: "Head Chef" },
  { guild: "Otaku Culinary Guild", quest: "Spring Festival Cook-Off", deadline: "Apr 30", reward: "Hanami badge", difficulty: "Home Cook" },
];

const GUILD_LEADERBOARD = [
  { guild: "Otaku Culinary Guild", icon: "⛩️", members: 7840, rank: 1 },
  { guild: "Guild of Fire", icon: "🔥", members: 5102, rank: 2 },
  { guild: "Guild of Flavor", icon: "🌊", members: 4821, rank: 3 },
  { guild: "Guild of Bake", icon: "🍞", members: 4190, rank: 4 },
  { guild: "Guild of Sauce", icon: "🫙", members: 3246, rank: 5 },
];

export default function GuildsPage() {
  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="badge-gold mb-4">Guild Hall</div>
          <h1 className="font-cinzel font-black text-4xl md:text-6xl text-cream mb-4">
            Nine Guilds.<br />
            <span className="gradient-text-gold">One Culinary Universe.</span>
          </h1>
          <p className="font-playfair italic text-cream-warm text-xl mb-6 max-w-2xl mx-auto">
            Each guild is a specialized academy with its own philosophy, ranks, quests, and culinary traditions. Join one. Master all.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-cream-muted">
              <Users className="w-4 h-4 text-gold" />
              37,140 total members
            </div>
            <div className="flex items-center gap-2 text-cream-muted">
              <Trophy className="w-4 h-4 text-gold" />
              180+ seasonal quests
            </div>
            <div className="flex items-center gap-2 text-cream-muted">
              <Star className="w-4 h-4 text-gold" />
              9 unique paths
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Guild Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUILDS.map((guild) => (
              <Link
                key={guild.id}
                href={`/guilds/${guild.id}`}
                className="card-premium p-6 group hover:border-gold/30 hover:shadow-gold-sm transition-all duration-300 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{guild.icon}</div>
                  <div className="flex items-center gap-1 text-xs text-cream-faint">
                    <Users className="w-3 h-3" />
                    {guild.memberCount.toLocaleString()}
                  </div>
                </div>

                <h3 className="font-cinzel font-bold text-lg text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                  {guild.fullName}
                </h3>
                <p className="font-playfair italic text-cream-muted text-sm mb-3">{guild.tagline}</p>
                <p className="text-cream-muted text-xs leading-relaxed mb-4 line-clamp-3">{guild.description}</p>

                {/* Techniques preview */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {guild.signatureTechniques.slice(0, 3).map((tech) => (
                    <span key={tech} className="tag text-xs">{tech}</span>
                  ))}
                </div>

                {/* Ranks preview */}
                {guild.ranks.length > 0 && (
                  <div className="border-t border-elevated pt-4">
                    <div className="text-xs text-cream-faint mb-2 font-cinzel tracking-widest uppercase">Ranks</div>
                    <div className="flex gap-2">
                      {guild.ranks.map((rank) => (
                        <div key={rank.id} title={rank.name} className="text-lg">{rank.icon}</div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Enter Guild <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Seasonal Quests */}
        <section>
          <div className="mb-8">
            <div className="badge-gold mb-2">Seasonal Quests</div>
            <h2 className="font-playfair text-3xl font-bold text-cream">Active This Season</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SEASONAL_QUESTS.map((quest) => (
              <div key={quest.quest} className="card-premium p-5">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-1">{quest.guild}</div>
                <h3 className="font-playfair text-lg font-bold text-cream mb-2">{quest.quest}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge-difficulty text-xs px-2 py-0.5 rounded-full border bg-gold/10 text-gold border-gold/30">{quest.difficulty}</span>
                  <span className="badge-difficulty text-xs px-2 py-0.5 rounded-full border bg-ember/10 text-ember border-ember/30">Ends {quest.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cream-muted">
                  <Trophy className="w-4 h-4 text-gold" />
                  {quest.reward}
                </div>
                <button className="mt-4 btn-outline-gold text-xs py-2 px-4 w-full justify-center">
                  Accept Quest
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Guild Leaderboard */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-premium p-6">
            <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Guild Popularity
            </div>
            <div className="space-y-4">
              {GUILD_LEADERBOARD.map((entry) => (
                <div key={entry.guild} className="flex items-center gap-3">
                  <div className="font-cinzel text-lg text-gold font-bold w-6 text-center">{entry.rank}</div>
                  <div className="text-2xl">{entry.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-cream">{entry.guild}</div>
                    <div className="w-full bg-elevated rounded-full h-1 mt-1">
                      <div className="h-1 rounded-full bg-gold-gradient" style={{ width: `${(entry.members / 8000) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-xs text-cream-muted">{entry.members.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-6">
            <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Guild Progression System
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center text-gold font-cinzel font-bold flex-shrink-0">1</div>
                <div>
                  <div className="text-cream font-medium">Join a Guild</div>
                  <div className="text-cream-muted text-xs">Start as an initiate in any guild. No limits on exploration.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center text-gold font-cinzel font-bold flex-shrink-0">2</div>
                <div>
                  <div className="text-cream font-medium">Complete Lessons & Quests</div>
                  <div className="text-cream-muted text-xs">Earn XP through guild-specific lessons, trials, and seasonal quests.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center text-gold font-cinzel font-bold flex-shrink-0">3</div>
                <div>
                  <div className="text-cream font-medium">Advance Through Ranks</div>
                  <div className="text-cream-muted text-xs">Each guild has 3-5 ranks with unique perks, badges, and access.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center text-gold font-cinzel font-bold flex-shrink-0">4</div>
                <div>
                  <div className="text-cream font-medium">Master Multiple Guilds</div>
                  <div className="text-cream-muted text-xs">The most distinguished chefs hold rank in multiple guilds simultaneously.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
