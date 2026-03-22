import Link from "next/link";
import { Clock, Zap, Users, Flame } from "lucide-react";
import { cn, getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import type { Trial } from "@/lib/types";

interface TrialCardProps {
  trial: Trial;
  variant?: "default" | "compact" | "featured";
  showCTA?: boolean;
  className?: string;
}

export default function TrialCard({ trial, variant = "default", showCTA = true, className }: TrialCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("card-premium p-4", className)}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="font-playfair font-semibold text-cream text-sm">{trial.name}</div>
          <span className={cn("badge-difficulty text-xs px-2 py-0.5 rounded-full border flex-shrink-0", getDifficultyColor(trial.difficulty))}>
            {getDifficultyLabel(trial.difficulty)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-cream-faint">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {trial.timeLimitMinutes}m</span>
          <span className="text-xs px-2 py-0.5 rounded border border-elevated text-cream-faint">{trial.cuisineStyle}</span>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className={cn("card-gold-border p-6 animate-glow-pulse", className)}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-1">
              {trial.type === "daily" ? "Daily Trial" : trial.type === "campaign" ? "Campaign" : "Kitchen Trial"}
            </div>
            <div className="font-playfair text-2xl font-bold text-cream">{trial.name}</div>
          </div>
          <span className={cn("badge-difficulty px-3 py-1 text-xs rounded-full border", getDifficultyColor(trial.difficulty))}>
            {getDifficultyLabel(trial.difficulty)}
          </span>
        </div>

        <div className="mb-5">
          <div className="text-xs text-cream-muted uppercase tracking-widest mb-3 font-cinzel">Mystery Basket</div>
          <div className="grid grid-cols-2 gap-2">
            {trial.basket.map((ingredient) => (
              <div key={ingredient.name} className="flex items-center gap-2 bg-elevated rounded-sm p-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-sm text-cream">{ingredient.name}</span>
              </div>
            ))}
          </div>
        </div>

        {trial.bonusObjective && (
          <div className="bg-gold-faint border border-gold/20 rounded-sm p-3 mb-5">
            <div className="text-xs text-gold font-cinzel tracking-wide uppercase mb-1">Bonus Objective</div>
            <div className="text-sm text-cream-warm font-playfair italic">{trial.bonusObjective}</div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-elevated">
          <div className="flex items-center gap-4 text-sm text-cream-muted">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {trial.timeLimitMinutes} min</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> XP Reward</span>
          </div>
          {showCTA && (
            <Link href="/kitchen-trials/active" className="btn-gold text-sm py-2 px-4 inline-flex">
              <Flame className="w-4 h-4" />
              Start Trial
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("card-premium p-5", className)}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="font-cinzel text-xs text-cream-muted tracking-wide mb-1 uppercase">{trial.cuisineStyle} · {trial.type}</div>
          <h3 className="font-playfair font-bold text-cream text-lg">{trial.name}</h3>
        </div>
        <span className={cn("badge-difficulty text-xs px-3 py-1 rounded-full border flex-shrink-0", getDifficultyColor(trial.difficulty))}>
          {getDifficultyLabel(trial.difficulty)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {trial.basket.slice(0, 4).map((ingredient) => (
          <div key={ingredient.name} className="flex items-center gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-cream-muted">{ingredient.name}</span>
          </div>
        ))}
        {trial.basket.length > 4 && (
          <div className="text-xs text-cream-faint col-span-2">+{trial.basket.length - 4} more ingredients</div>
        )}
      </div>

      {trial.constraints.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trial.constraints.slice(0, 2).map((c) => (
            <span key={c} className="tag text-xs">{c}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-elevated">
        <div className="flex items-center gap-3 text-xs text-cream-muted">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {trial.timeLimitMinutes}m</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Active</span>
        </div>
        {showCTA && (
          <Link href="/kitchen-trials/active" className="btn-outline-gold text-xs py-1.5 px-3 inline-flex">
            <Flame className="w-3 h-3" /> Try This
          </Link>
        )}
      </div>
    </div>
  );
}
