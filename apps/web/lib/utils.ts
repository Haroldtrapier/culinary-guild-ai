import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DifficultyLevel } from "./types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number, max = 100): string {
  return `${Math.round(score)}/${max}`;
}

export function formatScorePercent(score: number, max = 100): string {
  return `${Math.round((score / max) * 100)}%`;
}

export function getDifficultyColor(difficulty: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    apprentice: "text-sage bg-sage/10 border-sage/30",
    "home-cook": "text-sky-400 bg-sky-400/10 border-sky-400/30",
    "sous-chef": "text-gold bg-gold/10 border-gold/30",
    "head-chef": "text-ember bg-ember/10 border-ember/30",
    "executive-chef": "text-crimson bg-crimson/10 border-crimson/30",
    "culinary-legend": "text-purple-400 bg-purple-400/10 border-purple-400/30",
  };
  return map[difficulty] ?? "text-cream-muted bg-elevated border-elevated";
}

export function getDifficultyLabel(difficulty: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    apprentice: "Apprentice",
    "home-cook": "Home Cook",
    "sous-chef": "Sous Chef",
    "head-chef": "Head Chef",
    "executive-chef": "Executive Chef",
    "culinary-legend": "Culinary Legend",
  };
  return map[difficulty] ?? difficulty;
}

export function getDifficultyStars(difficulty: DifficultyLevel): number {
  const map: Record<DifficultyLevel, number> = {
    apprentice: 1,
    "home-cook": 2,
    "sous-chef": 3,
    "head-chef": 4,
    "executive-chef": 5,
    "culinary-legend": 6,
  };
  return map[difficulty] ?? 1;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-gold";
  if (score >= 75) return "text-sage";
  if (score >= 60) return "text-sky-400";
  if (score >= 45) return "text-ember";
  return "text-crimson";
}

export function getScoreLabel(score: number): string {
  if (score >= 95) return "Extraordinary";
  if (score >= 88) return "Exceptional";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 50) return "Satisfactory";
  if (score >= 40) return "Needs Work";
  return "Keep Practicing";
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function getRarityColor(rarity: string): string {
  const map: Record<string, string> = {
    common: "text-cream-muted border-elevated",
    uncommon: "text-sage border-sage/30",
    rare: "text-sky-400 border-sky-400/30",
    epic: "text-purple-400 border-purple-400/30",
    legendary: "text-gold border-gold/50",
  };
  return map[rarity] ?? "text-cream-muted border-elevated";
}

export function getFlavorColor(flavor: string): string {
  const map: Record<string, string> = {
    sweet: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    salty: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    sour: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    acid: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    bitter: "bg-green-500/10 text-green-400 border-green-500/20",
    umami: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    spicy: "bg-red-500/10 text-red-400 border-red-500/20",
    smoky: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    earthy: "bg-stone-500/10 text-stone-400 border-stone-500/20",
    floral: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    citrus: "bg-lime-500/10 text-lime-400 border-lime-500/20",
    herbal: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const lower = flavor.toLowerCase();
  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val;
  }
  return "bg-elevated text-cream-muted border-elevated";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function formatXP(xp: number): string {
  if (xp >= 1_000_000) return `${(xp / 1_000_000).toFixed(1)}M XP`;
  if (xp >= 1_000) return `${(xp / 1_000).toFixed(1)}K XP`;
  return `${xp} XP`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseFlavorTags(tags: string[]): { label: string; color: string }[] {
  return tags.map((tag) => ({
    label: capitalize(tag),
    color: getFlavorColor(tag),
  }));
}
