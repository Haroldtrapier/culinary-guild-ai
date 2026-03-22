import { cn, getFlavorColor } from "@/lib/utils";
import type { Spice } from "@/lib/types";

interface SpiceCardProps {
  spice: Spice;
  variant?: "default" | "compact" | "expanded";
  className?: string;
}

export default function SpiceCard({ spice, variant = "default", className }: SpiceCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("card-premium p-3 flex items-center gap-3", className)}>
        <div className="text-2xl flex-shrink-0">🌶️</div>
        <div className="flex-1 min-w-0">
          <div className="font-playfair font-semibold text-cream text-sm truncate">{spice.name}</div>
          <div className="text-xs text-cream-faint truncate">{spice.origin}</div>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i < spice.intensity ? "bg-gold" : "bg-elevated")} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={cn("card-premium p-6", className)}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="badge-gold mb-2">{spice.region}</div>
            <h3 className="font-playfair text-2xl font-bold text-cream mb-1">{spice.name}</h3>
            {spice.alternateName && (
              <div className="text-sm text-cream-muted italic">{spice.alternateName}</div>
            )}
            <div className="text-sm text-cream-faint">{spice.origin}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-cream-muted mb-1">Intensity</div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={cn("w-3 h-3 rounded-full", i < spice.intensity ? "bg-gold" : "bg-elevated")} />
              ))}
            </div>
          </div>
        </div>

        {/* Flavor Profile */}
        <div className="mb-4">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Flavor Profile</div>
          <div className="flex flex-wrap gap-1.5">
            {spice.flavorProfile.map((flavor) => (
              <span key={flavor} className={cn("text-xs px-2 py-0.5 rounded-full border", getFlavorColor(flavor))}>
                {flavor}
              </span>
            ))}
          </div>
        </div>

        {/* Best Uses */}
        <div className="mb-4">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Best Uses</div>
          <div className="flex flex-wrap gap-1.5">
            {spice.bestUses.map((use) => (
              <span key={use} className="tag text-xs">{use}</span>
            ))}
          </div>
        </div>

        {/* Cuisine Families */}
        <div className="mb-4">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Cuisine Families</div>
          <div className="flex flex-wrap gap-1.5">
            {spice.cuisineFamilies.map((c) => (
              <span key={c} className="text-xs px-2 py-0.5 rounded-full border border-gold/20 bg-gold-faint text-gold">{c}</span>
            ))}
          </div>
        </div>

        {/* Historical Notes */}
        <div className="bg-elevated rounded-sm p-3 mb-4">
          <div className="font-cinzel text-xs text-cream-muted tracking-widest uppercase mb-2">History</div>
          <p className="text-xs text-cream-muted leading-relaxed font-playfair italic">{spice.historicalNotes}</p>
        </div>

        {/* Preparation */}
        <div className="bg-gold-faint border border-gold/20 rounded-sm p-3">
          <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2">Preparation Tips</div>
          <p className="text-xs text-cream-warm leading-relaxed">{spice.preparationTips}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("card-premium p-5", className)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="badge-gold text-xs mb-2">{spice.region}</div>
          <h3 className="font-playfair font-bold text-cream">{spice.name}</h3>
          <div className="text-xs text-cream-faint">{spice.origin}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={cn("w-2 h-2 rounded-full", i < spice.intensity ? "bg-gold" : "bg-elevated")} />
            ))}
          </div>
          <div className="text-xs text-cream-faint">Intensity</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {spice.flavorProfile.slice(0, 4).map((flavor) => (
          <span key={flavor} className={cn("text-xs px-2 py-0.5 rounded-full border", getFlavorColor(flavor))}>
            {flavor}
          </span>
        ))}
      </div>

      <div className="text-xs text-cream-faint">
        Uses: {spice.bestUses.slice(0, 2).join(", ")}
        {spice.bestUses.length > 2 && ` +${spice.bestUses.length - 2}`}
      </div>

      {spice.pairingSuggestions && spice.pairingSuggestions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-elevated">
          <div className="text-xs text-cream-faint">
            Pairs with: {spice.pairingSuggestions.slice(0, 3).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
