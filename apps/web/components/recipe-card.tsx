import Link from "next/link";
import { Clock, Users, ChefHat } from "lucide-react";
import { cn, getDifficultyColor, getDifficultyLabel, formatTime, getFlavorColor } from "@/lib/utils";
import type { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export default function RecipeCard({ recipe, variant = "default", className }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  if (variant === "compact") {
    return (
      <div className={cn("card-premium p-4 flex items-center gap-4", className)}>
        <div className="w-12 h-12 rounded-sm bg-elevated flex items-center justify-center text-2xl flex-shrink-0">
          🍽️
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-playfair font-semibold text-cream text-sm truncate">{recipe.title}</div>
          <div className="flex items-center gap-2 text-xs text-cream-faint mt-0.5">
            <span>{recipe.cuisine}</span>
            <span>·</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>
        <span className={cn("badge-difficulty text-xs px-2 py-0.5 rounded-full border flex-shrink-0", getDifficultyColor(recipe.difficulty))}>
          {getDifficultyLabel(recipe.difficulty)}
        </span>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={cn("card-premium p-5 flex gap-5", className)}>
        <div className="w-24 h-24 rounded-sm bg-elevated flex items-center justify-center text-4xl flex-shrink-0">
          🍽️
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="font-cinzel text-xs text-cream-muted tracking-wide mb-1">{recipe.cuisine}</div>
              <h3 className="font-playfair font-bold text-cream text-lg">{recipe.title}</h3>
            </div>
            <span className={cn("badge-difficulty text-xs px-2 py-0.5 rounded-full border flex-shrink-0", getDifficultyColor(recipe.difficulty))}>
              {getDifficultyLabel(recipe.difficulty)}
            </span>
          </div>
          <p className="text-sm text-cream-muted line-clamp-2 mb-3">{recipe.description}</p>
          <div className="flex items-center gap-4 text-xs text-cream-faint">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(totalTime)}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {recipe.servings} servings</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("card-premium overflow-hidden group hover:border-gold/20 transition-all duration-300", className)}>
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-charcoal to-deep flex items-center justify-center text-5xl border-b border-elevated">
        🍽️
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="font-cinzel text-xs text-cream-muted tracking-wide mb-1 uppercase">{recipe.cuisine}</div>
            <h3 className="font-playfair font-bold text-cream text-lg group-hover:text-gold transition-colors duration-300 leading-tight">
              {recipe.title}
            </h3>
          </div>
          <span className={cn("badge-difficulty text-xs px-2 py-0.5 rounded-full border flex-shrink-0", getDifficultyColor(recipe.difficulty))}>
            {getDifficultyLabel(recipe.difficulty)}
          </span>
        </div>

        <p className="text-sm text-cream-muted leading-relaxed mb-4 line-clamp-2">{recipe.description}</p>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {recipe.flavorTags.slice(0, 4).map((tag) => (
            <span key={tag} className={cn("text-xs px-2 py-0.5 rounded-full border", getFlavorColor(tag))}>
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-cream-faint pt-3 border-t border-elevated">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(totalTime)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {recipe.servings} servings
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="w-3 h-3" />
            {recipe.techniqueTags[0] ?? "Various"}
          </span>
        </div>

        {recipe.isAIGenerated && (
          <div className="mt-3 text-xs text-cream-faint/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            AI Generated Recipe
          </div>
        )}
      </div>
    </div>
  );
}
