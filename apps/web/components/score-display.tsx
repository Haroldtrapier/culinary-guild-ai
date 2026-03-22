"use client";

import { useEffect, useState } from "react";
import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";
import type { ScoreCategory } from "@/lib/types";

interface ScoreDisplayProps {
  totalScore: number;
  maxScore?: number;
  categories?: ScoreCategory[];
  showLabel?: boolean;
  showCategories?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ScoreDisplay({
  totalScore,
  maxScore = 100,
  categories = [],
  showLabel = true,
  showCategories = false,
  animated = true,
  size = "md",
  className,
}: ScoreDisplayProps) {
  const [displayed, setDisplayed] = useState(animated ? 0 : totalScore);
  const [barsVisible, setBarsVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) return;
    const timeout = setTimeout(() => {
      setBarsVisible(true);
      const start = Date.now();
      const duration = 1200;
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(Math.round(eased * totalScore));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 300);
    return () => clearTimeout(timeout);
  }, [totalScore, animated]);

  const percentage = (totalScore / maxScore) * 100;
  const scoreColorClass = getScoreColor(totalScore);
  const label = getScoreLabel(totalScore);

  const ringSize = { sm: 80, md: 120, lg: 160 }[size];
  const strokeWidth = { sm: 6, md: 8, lg: 10 }[size];
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const fontSize = { sm: "text-2xl", md: "text-4xl", lg: "text-6xl" }[size];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Circular Score */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative" style={{ width: ringSize, height: ringSize }}>
          <svg width={ringSize} height={ringSize} className="-rotate-90">
            {/* Background ring */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#2A2A2A"
              strokeWidth={strokeWidth}
            />
            {/* Score ring */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={barsVisible ? strokeDashoffset : circumference}
              className="transition-all duration-1200 ease-out"
              style={{ transition: animated ? "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("font-cinzel font-black tabular-nums", fontSize, scoreColorClass)}>
              {displayed}
            </div>
            <div className="text-xs text-cream-faint font-cinzel">/ {maxScore}</div>
          </div>
        </div>

        {showLabel && (
          <div className={cn("font-playfair italic text-lg", scoreColorClass)}>
            {label}
          </div>
        )}
      </div>

      {/* Category Bars */}
      {showCategories && categories.length > 0 && (
        <div className="space-y-3">
          {categories.map((cat, i) => {
            const catPct = (cat.score / cat.maxScore) * 100;
            return (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-xs font-cinzel text-cream">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("font-cinzel text-sm font-bold", getScoreColor(catPct))}>
                      {cat.score}
                    </span>
                    <span className="text-xs text-cream-faint">/ {cat.maxScore}</span>
                  </div>
                </div>
                <div className="w-full bg-elevated rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gold-gradient transition-all duration-700 ease-out"
                    style={{
                      width: barsVisible ? `${catPct}%` : "0%",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
