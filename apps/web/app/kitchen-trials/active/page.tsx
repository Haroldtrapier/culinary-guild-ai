"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Clock, Lightbulb, BookOpen, MessageCircle, ChevronRight, AlertCircle, Send, Flame } from "lucide-react";
import { formatCountdown } from "@/lib/utils";

const BASKET_INGREDIENTS = [
  { name: "Beets (whole)", category: "vegetable", notes: "Must use root, stems, and greens" },
  { name: "Beet Greens", category: "vegetable", notes: "Part of the zero-waste challenge" },
  { name: "Goat Cheese", category: "dairy", notes: "Fresh chèvre preferred" },
  { name: "Walnuts", category: "misc", notes: "Raw or toasted" },
];

const PANTRY_STAPLES = ["Olive oil", "Salt", "Black pepper", "Garlic", "Shallots", "Lemon", "Honey", "Butter", "Fresh herbs", "Balsamic vinegar", "Stock (any)", "Cream"];

const HINTS = [
  "Roast the beets at 400°F wrapped in foil until fork-tender — usually 45-60 minutes. The skin slides off easily when warm.",
  "Beet greens can be treated like Swiss chard: sauté with garlic and olive oil, or use raw in a warm salad.",
  "The stems can be pickled in a quick brine of vinegar, sugar, and salt — they add both color and acid to the dish.",
  "Goat cheese pairs beautifully with beet's natural sweetness. A warm beet and goat cheese combination is a classic for good reason.",
  "Walnuts add fat, crunch, and a slightly bitter note that cuts through the sweet beet and rich cheese.",
  "Consider a vinaigrette to tie everything together: honey, balsamic, Dijon, olive oil.",
];

const COOKING_STEPS = [
  { id: 1, title: "Prep & Separate", description: "Wash and separate beet roots, stems, and greens. Reserve all three.", estimated: "5 min" },
  { id: 2, title: "Roast the Roots", description: "Wrap beets in foil with olive oil and salt. Roast at 400°F until tender.", estimated: "45 min" },
  { id: 3, title: "Quick-Pickle the Stems", description: "Slice stems thinly. Brine in apple cider vinegar, sugar, and salt for 20 minutes.", estimated: "20 min (passive)" },
  { id: 4, title: "Prepare the Greens", description: "Sauté garlic in olive oil, add beet greens, season with salt, pepper, and lemon.", estimated: "8 min" },
  { id: 5, title: "Toast the Walnuts", description: "Toast walnuts in dry pan over medium heat until fragrant. Cool and roughly chop.", estimated: "5 min" },
  { id: 6, title: "Build the Dish", description: "Slice roasted beets. Arrange greens as base, add beets, crumble goat cheese, scatter walnuts and pickled stems.", estimated: "10 min" },
  { id: 7, title: "Dress & Finish", description: "Drizzle with honey balsamic vinaigrette. Taste and adjust seasoning. Plate with intention.", estimated: "5 min" },
];

type PanelMode = "planning" | "hints" | "coach";

export default function ActiveTrialPage() {
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [started, setStarted] = useState(false);
  const [panel, setPanel] = useState<PanelMode>("planning");
  const [hintIndex, setHintIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [techniques, setTechniques] = useState("");

  const tick = useCallback(() => {
    setTimeLeft((t) => Math.max(0, t - 1));
  }, []);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [started, tick]);

  const timerColor = timeLeft > 600 ? "text-gold" : timeLeft > 180 ? "text-ember" : "text-crimson";
  const progressPct = ((40 * 60 - timeLeft) / (40 * 60)) * 100;

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((s) => s !== stepId) : [...prev, stepId]
    );
  };

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      {/* Timer Bar */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-deep border-b border-elevated">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-ember" />
            <div>
              <div className="font-cinzel text-xs text-cream-muted tracking-widest">ACTIVE TRIAL</div>
              <div className="font-playfair font-semibold text-cream text-sm">Root to Stem</div>
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <div className="w-full bg-elevated rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gold-gradient transition-all duration-1000"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className={`font-cinzel font-black text-2xl tabular-nums ${timerColor}`}>
            {formatCountdown(timeLeft)}
          </div>

          {!started ? (
            <button onClick={() => setStarted(true)} className="btn-gold text-sm py-2">
              <Flame className="w-4 h-4" />
              Start Clock
            </button>
          ) : (
            <div className="text-xs text-cream-faint font-inter">Clock Running</div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Basket + Steps */}
          <div className="space-y-6">
            {/* Basket */}
            <div className="card-gold-border p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Mystery Basket</div>
              <div className="space-y-3">
                {BASKET_INGREDIENTS.map((ing) => (
                  <div key={ing.name} className="bg-elevated rounded-sm p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span className="text-sm text-cream font-medium">{ing.name}</span>
                      <span className="ml-auto text-xs px-1.5 py-0.5 bg-ember/20 text-ember rounded">{ing.category}</span>
                    </div>
                    <div className="text-xs text-cream-faint pl-4">{ing.notes}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pantry Staples */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Available Pantry</div>
              <div className="flex flex-wrap gap-1.5">
                {PANTRY_STAPLES.map((item) => (
                  <span key={item} className="tag text-xs">{item}</span>
                ))}
              </div>
            </div>

            {/* Cooking Steps */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Cooking Roadmap</div>
              <div className="space-y-3">
                {COOKING_STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`w-full text-left p-3 rounded-sm border transition-all duration-200 ${
                      completedSteps.includes(step.id)
                        ? "border-sage/30 bg-sage/5 opacity-60"
                        : "border-elevated bg-elevated/50 hover:border-gold/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs ${
                        completedSteps.includes(step.id) ? "bg-sage border-sage text-void" : "border-gold/40 text-gold"
                      }`}>
                        {completedSteps.includes(step.id) ? "✓" : step.id}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-cream mb-0.5">{step.title}</div>
                        <div className="text-xs text-cream-muted">{step.description}</div>
                        <div className="text-xs text-cream-faint mt-1 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {step.estimated}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-cream-faint text-center">
                {completedSteps.length} of {COOKING_STEPS.length} steps complete
              </div>
            </div>
          </div>

          {/* Center: Panel */}
          <div className="space-y-4">
            {/* Panel Tabs */}
            <div className="flex gap-2">
              {(["planning", "hints", "coach"] as PanelMode[]).map((p) => {
                const labels: Record<PanelMode, { label: string; icon: React.ElementType }> = {
                  planning: { label: "Planning", icon: BookOpen },
                  hints: { label: "Hints", icon: Lightbulb },
                  coach: { label: "AI Coach", icon: MessageCircle },
                };
                const { label, icon: Icon } = labels[p];
                return (
                  <button
                    key={p}
                    onClick={() => setPanel(p)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-cinzel tracking-wide rounded-sm border transition-all duration-200 ${
                      panel === p ? "bg-gold-faint border-gold text-gold" : "border-elevated text-cream-muted hover:border-gold/30"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>

            {panel === "planning" && (
              <div className="card-premium p-5 space-y-4">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase">Dish Planning</div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Dish Concept</label>
                  <input
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g., Roasted Beet Salad with Pickled Stems..."
                    className="input-dark text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Description & Approach</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your dish and how you plan to use each basket ingredient..."
                    rows={5}
                    className="input-dark text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Key Techniques</label>
                  <input
                    value={techniques}
                    onChange={(e) => setTechniques(e.target.value)}
                    placeholder="e.g., Quick pickling, roasting, sauté..."
                    className="input-dark text-sm"
                  />
                </div>
                <div className="bg-gold-faint border border-gold/20 rounded-sm p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gold font-cinzel tracking-wide mb-1">Bonus Objective</div>
                      <div className="text-xs text-cream-warm font-playfair italic">Use the entire beet — root, stem, and greens — in one cohesive dish. Zero waste.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {panel === "hints" && (
              <div className="card-premium p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-cinzel text-xs text-gold tracking-widest uppercase">Technique Hints</div>
                  <div className="text-xs text-cream-faint">{hintIndex + 1} of {HINTS.length}</div>
                </div>
                <div className="bg-gold-faint border border-gold/20 rounded-sm p-4">
                  <Lightbulb className="w-5 h-5 text-gold mb-3" />
                  <p className="text-sm text-cream-warm font-playfair italic leading-relaxed">{HINTS[hintIndex]}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setHintIndex((i) => Math.max(0, i - 1))}
                    disabled={hintIndex === 0}
                    className="flex-1 py-2 text-xs border border-elevated rounded-sm text-cream-muted hover:border-gold/30 disabled:opacity-40 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setHintIndex((i) => Math.min(HINTS.length - 1, i + 1))}
                    disabled={hintIndex === HINTS.length - 1}
                    className="flex-1 py-2 text-xs border border-gold text-gold rounded-sm hover:bg-gold-faint disabled:opacity-40 transition-colors"
                  >
                    Next Hint
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-cream-muted font-cinzel tracking-wide uppercase">All Tips</div>
                  {HINTS.map((hint, i) => (
                    <button
                      key={i}
                      onClick={() => setHintIndex(i)}
                      className={`w-full text-left p-2 rounded-sm text-xs transition-colors ${
                        i === hintIndex ? "bg-gold-faint text-gold" : "text-cream-muted hover:bg-elevated"
                      }`}
                    >
                      Hint {i + 1}: {hint.substring(0, 60)}...
                    </button>
                  ))}
                </div>
              </div>
            )}

            {panel === "coach" && (
              <div className="card-premium p-5">
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">AI Culinary Coach</div>
                <div className="bg-elevated rounded-sm p-4 mb-4 min-h-48 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gold">AI</span>
                    </div>
                    <div className="bg-charcoal rounded-sm p-3 text-xs text-cream-warm leading-relaxed max-w-xs">
                      Welcome to your Kitchen Trial. I&apos;m your culinary coach. Ask me anything — technique questions, flavor pairings, timing advice, or plating ideas. I&apos;m here to help without giving the answer away.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gold">AI</span>
                    </div>
                    <div className="bg-charcoal rounded-sm p-3 text-xs text-cream-warm leading-relaxed max-w-xs">
                      The beet&apos;s earthiness is its strength. Think about how to contrast it: acid, richness, crunch. What element do you feel is missing from your current plan?
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="Ask your coach anything..."
                    className="input-dark text-xs flex-1"
                  />
                  <button className="btn-gold text-xs py-2 px-3">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["How do I cook beet greens?", "What acid pairs with beet?", "Plating suggestions?"].map((q) => (
                    <button key={q} className="text-xs border border-elevated rounded-full px-3 py-1 text-cream-muted hover:border-gold/30 hover:text-cream transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Submission */}
          <div className="space-y-6">
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Submit Your Dish</div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Final Dish Name *</label>
                  <input
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="Name your creation..."
                    className="input-dark text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Dish Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your dish, how you used each ingredient, and the flavor story..."
                    rows={6}
                    className="input-dark text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Techniques Used</label>
                  <input
                    value={techniques}
                    onChange={(e) => setTechniques(e.target.value)}
                    placeholder="e.g., Quick pickling, oven roasting, pan sauté..."
                    className="input-dark text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-cream-muted mb-2 block">Plating Notes</label>
                  <textarea
                    placeholder="Describe how you plated the dish..."
                    rows={3}
                    className="input-dark text-sm resize-none"
                  />
                </div>

                <div className="border-t border-elevated pt-4">
                  <div className="text-xs text-cream-muted mb-3">Ingredient Checklist</div>
                  <div className="space-y-2">
                    {BASKET_INGREDIENTS.map((ing) => (
                      <label key={ing.name} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gold/30" />
                        <span className="text-xs text-cream">{ing.name} used</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Link
                  href="/kitchen-trials/results"
                  className={`btn-gold w-full justify-center py-4 text-sm ${!dishName || !description ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <Send className="w-4 h-4" />
                  Submit for Judging
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Judge Preview */}
            <div className="card-premium p-5">
              <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-4">Your Judge</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-2xl">👨‍⚖️</div>
                <div>
                  <div className="font-playfair font-semibold text-cream">Chef Auguste</div>
                  <div className="text-xs text-cream-muted">Classically trained, zero tolerance for waste</div>
                </div>
              </div>
              <p className="text-xs text-cream-muted italic font-playfair leading-relaxed">
                &ldquo;I judge flavor first. A perfectly plated mediocre dish is still mediocre. But a boldly conceived dish that tells a story — that earns my respect, even when imperfect.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
