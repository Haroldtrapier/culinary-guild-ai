"use client";

import Link from "next/link";
import { ArrowLeft, Users, Trophy, Star, Shield, BookOpen, ChevronRight, Flame } from "lucide-react";
import { GUILDS } from "@/lib/constants";
import { getDifficultyLabel } from "@/lib/utils";

export default function GuildPage({ params }: { params: { guild: string } }) {
  const guild = GUILDS.find((g) => g.id === params.guild) ?? GUILDS[0];

  const MEMBER_RANKS = [
    { name: "ChefAuguste", rank: guild.ranks[guild.ranks.length - 1]?.name ?? "Grand Master", xp: 14820, badge: "👑" },
    { name: "SaffronDreams", rank: guild.ranks[Math.max(0, guild.ranks.length - 2)]?.name ?? "Master", xp: 11402, badge: "⭐" },
    { name: "MirepoixMaster", rank: guild.ranks[0]?.name ?? "Initiate", xp: 9831, badge: "🔥" },
  ];

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Back */}
      <div className="border-b border-elevated">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link href="/guilds" className="flex items-center gap-2 text-cream-muted hover:text-gold transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Guild Hall
          </Link>
        </div>
      </div>

      {/* Guild Hero */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="text-6xl mb-4">{guild.icon}</div>
              <h1 className="font-cinzel font-black text-3xl md:text-5xl text-cream mb-2">{guild.fullName}</h1>
              <p className="font-playfair italic text-cream-warm text-xl mb-4">{guild.tagline}</p>
              <p className="text-cream-muted leading-relaxed mb-6">{guild.description}</p>

              <div className="bg-gold-faint border border-gold/20 rounded-sm p-4 mb-6">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Guild Philosophy</div>
                <p className="font-playfair italic text-cream-warm text-sm leading-relaxed">&ldquo;{guild.philosophy}&rdquo;</p>
              </div>

              <div className="flex items-center gap-4">
                <button className="btn-gold">
                  <Shield className="w-4 h-4" />
                  Join Guild
                </button>
                <div className="flex items-center gap-2 text-cream-muted text-sm">
                  <Users className="w-4 h-4 text-gold" />
                  {guild.memberCount.toLocaleString()} members
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Ranks */}
              {guild.ranks.length > 0 && (
                <div className="card-premium p-5">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Guild Ranks</div>
                  <div className="space-y-3">
                    {guild.ranks.map((rank) => (
                      <div key={rank.id} className="flex items-center gap-3">
                        <div className="text-2xl">{rank.icon}</div>
                        <div>
                          <div className="font-cinzel text-sm text-cream">{rank.name}</div>
                          <div className="text-xs text-cream-faint">{rank.requirements}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signature Techniques */}
              <div className="card-premium p-5">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Signature Techniques</div>
                <div className="space-y-2">
                  {guild.signatureTechniques.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-cream-warm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Lessons */}
        {guild.lessons.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="badge-gold mb-2">Curriculum</div>
                <h2 className="font-playfair text-2xl font-bold text-cream">Guild Lessons</h2>
              </div>
            </div>
            <div className="space-y-4">
              {guild.lessons.map((lesson) => (
                <div key={lesson.id} className="card-premium p-5 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-playfair font-bold text-cream">{lesson.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${{
                        apprentice: "bg-sage/10 text-sage border-sage/30",
                        "home-cook": "bg-sky-400/10 text-sky-400 border-sky-400/30",
                        "sous-chef": "bg-gold/10 text-gold border-gold/30",
                        "head-chef": "bg-ember/10 text-ember border-ember/30",
                        "executive-chef": "bg-crimson/10 text-crimson border-crimson/30",
                        "culinary-legend": "bg-purple-400/10 text-purple-400 border-purple-400/30",
                      }[lesson.difficulty]}`}>
                        {getDifficultyLabel(lesson.difficulty)}
                      </span>
                    </div>
                    <p className="text-sm text-cream-muted mb-2">{lesson.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.topics.map((t) => (
                        <span key={t} className="tag text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-cream-faint mb-2">{lesson.duration} min</div>
                    <button className="btn-outline-gold text-xs py-1.5 px-3 inline-flex">
                      Start <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Guild Trials */}
        <section>
          <div className="mb-6">
            <div className="badge-gold mb-2">Exclusive Challenges</div>
            <h2 className="font-playfair text-2xl font-bold text-cream">Guild Trials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: `${guild.name} Fundamentals`, difficulty: "Apprentice", description: `Demonstrate foundational ${guild.name.toLowerCase()} principles`, xp: 200 },
              { name: `${guild.name} Mastery`, difficulty: "Sous Chef", description: `Advanced ${guild.name.toLowerCase()} technique showcase`, xp: 450 },
              { name: `The ${guild.name} Grand Challenge`, difficulty: "Head Chef", description: `The definitive ${guild.name.toLowerCase()} test`, xp: 800 },
              { name: `${guild.name} Seasonal Quest`, difficulty: "Home Cook", description: `Seasonal ${guild.name.toLowerCase()} challenge`, xp: 300 },
            ].map((trial) => (
              <div key={trial.name} className="card-premium p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-playfair font-semibold text-cream">{trial.name}</h3>
                  <span className="badge-difficulty text-xs px-2 py-0.5 rounded-full border bg-gold/10 text-gold border-gold/30 flex-shrink-0">
                    {trial.difficulty}
                  </span>
                </div>
                <p className="text-sm text-cream-muted mb-4">{trial.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold flex items-center gap-1">
                    <Star className="w-3 h-3" /> {trial.xp} XP
                  </span>
                  <Link href="/kitchen-trials/active" className="btn-outline-gold text-xs py-1.5 px-3 inline-flex">
                    <Flame className="w-3 h-3" /> Start Trial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Quests */}
        {guild.seasonalQuests.length > 0 && (
          <section>
            <div className="mb-6">
              <div className="badge-gold mb-2">Seasonal</div>
              <h2 className="font-playfair text-2xl font-bold text-cream">Active Quests</h2>
            </div>
            <div className="space-y-4">
              {guild.seasonalQuests.map((quest) => (
                <div key={quest.id} className="card-gold-border p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-playfair font-bold text-cream text-lg mb-1">{quest.title}</h3>
                      <p className="text-sm text-cream-muted">{quest.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-cinzel text-gold font-bold">+{quest.xpReward} XP</div>
                      <div className="text-xs text-cream-faint">on completion</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-cream-faint mb-2 font-cinzel uppercase tracking-widest">Objectives</div>
                    <div className="space-y-1">
                      {quest.objectives.map((obj) => (
                        <div key={obj} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span className="text-cream-muted">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-elevated">
                    <div className="flex items-center gap-2 text-sm text-cream-muted">
                      <Trophy className="w-4 h-4 text-gold" />
                      Reward: {quest.reward}
                    </div>
                    <button className="btn-gold text-xs py-2 px-4">Accept Quest</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Member Ranks */}
        <section>
          <div className="mb-6">
            <div className="badge-gold mb-2">Community</div>
            <h2 className="font-playfair text-2xl font-bold text-cream">Top Members</h2>
          </div>
          <div className="card-premium p-5">
            <div className="space-y-4">
              {MEMBER_RANKS.map((member, i) => (
                <div key={member.name} className="flex items-center gap-4 py-3 border-b border-elevated last:border-0">
                  <div className="text-2xl w-8 text-center">{member.badge}</div>
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-sm font-bold text-gold">{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-inter font-semibold text-cream">{member.name}</div>
                    <div className="text-xs text-cream-muted">{member.rank}</div>
                  </div>
                  <div className="font-cinzel text-gold font-bold">{member.xp.toLocaleString()} XP</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Dishes */}
        {guild.featuredDishes && guild.featuredDishes.length > 0 && (
          <section>
            <div className="mb-6">
              <div className="badge-gold mb-2">Signature</div>
              <h2 className="font-playfair text-2xl font-bold text-cream">Guild Dishes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guild.featuredDishes.map((dish) => (
                <div key={dish} className="card-premium p-5 text-center">
                  <div className="text-4xl mb-3">🍽️</div>
                  <div className="font-playfair font-semibold text-cream text-sm">{dish}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
