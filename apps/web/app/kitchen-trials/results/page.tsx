"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, ArrowRight, RotateCcw, ChevronRight, Star, Zap, Award, TrendingUp, MessageCircle } from "lucide-react";
import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";

const SCORE_CATEGORIES = [
  { name: "Flavor", score: 26, maxScore: 30, icon: "🌊", commentary: "Exceptional use of beet's earthiness against the acid of the pickled stems. The goat cheese fat carried the flavors beautifully. A touch more salt on the greens would have elevated this further." },
  { name: "Technique", score: 21, maxScore: 25, icon: "🔪", commentary: "Confident roasting, properly executed quick-pickle. The sauté of greens showed solid heat control. The walnut toast was skilled but slightly uneven in browning." },
  { name: "Creativity", score: 17, maxScore: 20, icon: "✨", commentary: "The decision to use the pickled stems as a garnish rather than hiding them was bold and intelligent. The balsamic honey dressing was familiar but executed with personal conviction." },
  { name: "Presentation", score: 12, maxScore: 15, icon: "🍽️", commentary: "Clean, intentional plating with good color contrast. The scattered walnut approach reads natural rather than considered. A more deliberate placement would have scored higher." },
  { name: "Constraint Use", score: 9, maxScore: 10, icon: "🎯", commentary: "All four basket items used purposefully. The zero-waste bonus was honored — root, stem, and greens all appeared. Excellent constraint discipline." },
];

const TOTAL_SCORE = SCORE_CATEGORIES.reduce((sum, c) => sum + c.score, 0);

const BADGES_EARNED = [
  { name: "Zero Waste Champion", icon: "♻️", description: "Used every part of the basket ingredient" },
  { name: "Root to Stem Master", icon: "🌱", description: "Completed the Root to Stem daily trial" },
];

const SUGGESTIONS = [
  "Season beet greens more aggressively — they can handle salt and acid",
  "Even walnut browning comes from constant movement in the pan — don't walk away",
  "Consider a quenelle of goat cheese rather than free-form crumbling for elevated presentation",
  "The pickled stems are the most interesting element — give them center stage next time",
];

const HIGHLIGHTS = [
  "Outstanding flavor composition — beet earthiness balanced perfectly with acid and fat",
  "Zero-waste discipline honored completely — a rare achievement in this trial",
  "The decision to pickle the stems shows intuitive understanding of the ingredient",
];

export default function TrialResultsPage() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCategories(true);
      const start = Date.now();
      const duration = 1500;
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedScore(Math.round(eased * TOTAL_SCORE));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const percentile = 87;
  const xpEarned = 380;

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Results Header */}
      <section className="relative py-16 px-6 overflow-hidden border-b border-elevated">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-3">Trial Complete</div>
          <h1 className="font-playfair text-4xl font-bold text-cream mb-2">Root to Stem</h1>
          <p className="text-cream-muted text-sm mb-8">Daily Trial · Home Cook · Contemporary</p>

          {/* Big Score */}
          <div className="relative inline-block mb-6">
            <div className={cn("font-cinzel font-black text-8xl md:text-9xl", getScoreColor(animatedScore), "transition-colors duration-300")}>
              {animatedScore}
            </div>
            <div className="font-cinzel text-2xl text-cream-muted absolute -top-2 right-0">/ 100</div>
          </div>

          <div className={cn("font-playfair italic text-2xl mb-4", getScoreColor(TOTAL_SCORE))}>
            {getScoreLabel(TOTAL_SCORE)}
          </div>

          <p className="text-cream-muted text-sm mb-8">
            You scored in the <span className="text-gold font-bold">top {100 - percentile}%</span> of all submissions for this trial
          </p>

          {/* XP & Badges */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-gold-faint border border-gold/30 rounded-sm">
              <Zap className="w-5 h-5 text-gold" />
              <div>
                <div className="font-cinzel font-bold text-xl text-gold">+{xpEarned} XP</div>
                <div className="text-xs text-cream-muted">Experience Gained</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-sm">
              <Award className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-cinzel font-bold text-xl text-purple-400">{BADGES_EARNED.length} Badges</div>
                <div className="text-xs text-cream-muted">Earned This Trial</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kitchen-trials" className="btn-outline-gold">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Link>
            <Link href="/kitchen-trials" className="btn-gold">
              Next Trial
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Scores */}
            <div className="card-premium p-6">
              <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Score Breakdown
              </div>

              <div className="space-y-6">
                {SCORE_CATEGORIES.map((cat, i) => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <div>
                            <div className="font-cinzel text-sm text-cream">{cat.name}</div>
                            <div className="text-xs text-cream-faint">out of {cat.maxScore} points</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={cn("font-cinzel font-bold text-2xl", getScoreColor((cat.score / cat.maxScore) * 100))}>
                            {cat.score}
                          </div>
                          <ChevronRight className={cn("w-4 h-4 text-cream-muted transition-transform duration-200", activeCategory === i && "rotate-90")} />
                        </div>
                      </div>
                      <div className="w-full bg-elevated rounded-full h-2">
                        <div
                          className={cn("h-2 rounded-full transition-all duration-1000 bg-gold-gradient", showCategories ? "" : "w-0")}
                          style={{ width: showCategories ? `${(cat.score / cat.maxScore) * 100}%` : "0%" }}
                        />
                      </div>
                    </button>

                    {activeCategory === i && (
                      <div className="mt-3 pl-10 bg-elevated rounded-sm p-3">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-cream-warm font-playfair italic leading-relaxed">{cat.commentary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Judge Commentary */}
            <div className="card-premium p-6">
              <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Judge&apos;s Commentary
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-3xl flex-shrink-0">👨‍⚖️</div>
                <div>
                  <div className="font-playfair font-semibold text-cream text-lg">Chef Auguste</div>
                  <div className="text-xs text-cream-muted">Classically trained · Executive judge</div>
                </div>
              </div>
              <div className="space-y-4 font-playfair italic text-cream-warm text-base leading-relaxed">
                <p>&ldquo;This dish demonstrates what happens when a cook listens to the ingredient. The beet was allowed to be itself — earthy, sweet, deeply mineral — rather than being overwhelmed by ambition.&rdquo;</p>
                <p>&ldquo;The pickled stems are the most sophisticated decision on the plate. They provide acid and textural contrast while honoring the zero-waste directive with elegance rather than obligation.&rdquo;</p>
                <p>&ldquo;Where this dish falls short is in presentation precision and the final seasoning of the greens. These are fixable. The palate and concept behind them are not something that can be taught — you either have it or you develop it. You have it.&rdquo;</p>
                <p>&ldquo;Score: <span className="text-gold not-italic font-bold">{TOTAL_SCORE}/100</span>. Excellent work. I look forward to seeing what you do under greater pressure.&rdquo;</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="card-premium p-6">
              <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Highlights
              </div>
              <div className="space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sage/20 border border-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3 h-3 text-sage" />
                    </div>
                    <p className="text-sm text-cream-warm">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="card-premium p-6">
              <div className="font-cinzel text-sm text-gold tracking-widest uppercase mb-4">Areas to Develop</div>
              <div className="space-y-3">
                {SUGGESTIONS.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-cream-muted">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Percentile */}
            <div className="card-gold-border p-5 text-center">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Global Rank</div>
              <div className="font-cinzel font-black text-5xl text-gold mb-2">Top {100 - percentile}%</div>
              <p className="text-cream-muted text-xs">of {(1847).toLocaleString()} submissions for Root to Stem</p>
              <div className="w-full bg-elevated rounded-full h-3 mt-4">
                <div className="h-3 rounded-full bg-gold-gradient" style={{ width: `${percentile}%` }} />
              </div>
              <div className="flex justify-between text-xs text-cream-faint mt-1">
                <span>Worst</span>
                <span>Best</span>
              </div>
            </div>

            {/* Badges */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Badges Earned
              </div>
              <div className="space-y-3">
                {BADGES_EARNED.map((badge) => (
                  <div key={badge.name} className="flex items-center gap-3 bg-elevated rounded-sm p-3">
                    <div className="text-3xl">{badge.icon}</div>
                    <div>
                      <div className="text-sm text-cream font-medium">{badge.name}</div>
                      <div className="text-xs text-cream-faint">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Breakdown */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                XP Earned
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Base Trial XP", xp: 250 },
                  { label: "Difficulty Bonus (1.5×)", xp: 125 },
                  { label: "Zero Waste Bonus", xp: 50 },
                  { label: "Daily Trial Bonus", xp: 25 },
                  { label: "Badge Earn Bonus", xp: 30 },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-cream-muted">{item.label}</span>
                    <span className="text-gold font-cinzel">+{item.xp}</span>
                  </div>
                ))}
                <div className="border-t border-elevated pt-2 flex justify-between">
                  <span className="text-cream font-semibold text-sm">Total XP</span>
                  <span className="text-gold font-cinzel font-bold text-lg">+{xpEarned}</span>
                </div>
              </div>
              <div className="text-xs text-cream-muted">
                Progress to Head Chef: <span className="text-gold">8,620 / 13,000 XP</span>
              </div>
              <div className="w-full bg-elevated rounded-full h-1.5 mt-2">
                <div className="h-1.5 rounded-full bg-gold-gradient" style={{ width: "66%" }} />
              </div>
            </div>

            {/* Next Steps */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">What&apos;s Next</div>
              <div className="space-y-2">
                <Link href="/kitchen-trials" className="flex items-center gap-3 p-3 bg-elevated rounded-sm hover:bg-charcoal transition-colors group">
                  <RotateCcw className="w-4 h-4 text-ember group-hover:rotate-12 transition-transform" />
                  <span className="text-sm text-cream">Try this trial again</span>
                </Link>
                <Link href="/kitchen-trials" className="flex items-center gap-3 p-3 bg-elevated rounded-sm hover:bg-charcoal transition-colors group">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="text-sm text-cream">View leaderboard</span>
                </Link>
                <Link href="/guilds" className="flex items-center gap-3 p-3 bg-elevated rounded-sm hover:bg-charcoal transition-colors group">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-cream">Explore Guild Quests</span>
                </Link>
                <Link href="/flavor-atlas" className="flex items-center gap-3 p-3 bg-elevated rounded-sm hover:bg-charcoal transition-colors group">
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                  <span className="text-sm text-cream">Study flavor pairings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
