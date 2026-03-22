import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Guild } from "@/lib/types";

interface GuildCardProps {
  guild: Guild;
  variant?: "default" | "compact" | "featured";
  showRanks?: boolean;
  className?: string;
}

export default function GuildCard({ guild, variant = "default", showRanks = false, className }: GuildCardProps) {
  const href = guild.id === "otaku" ? "/otaku-guild" : `/guilds/${guild.id}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn("card-premium p-4 flex items-center gap-3 group hover:border-gold/20 transition-all duration-300", className)}
      >
        <div className="text-3xl flex-shrink-0">{guild.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-cinzel text-sm font-bold text-cream group-hover:text-gold transition-colors truncate">{guild.name}</div>
          <div className="text-xs text-cream-faint flex items-center gap-1">
            <Users className="w-3 h-3" />
            {guild.memberCount.toLocaleString()} members
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-cream-faint group-hover:text-gold transition-colors flex-shrink-0" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className={cn("card-gold-border p-6 block group hover:shadow-gold transition-all duration-300", className)}
      >
        <div className="text-5xl mb-4">{guild.icon}</div>
        <div className="badge-gold mb-3">{guild.fullName}</div>
        <h3 className="font-playfair text-2xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">{guild.tagline}</h3>
        <p className="text-cream-muted text-sm leading-relaxed mb-4">{guild.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {guild.signatureTechniques.slice(0, 3).map((t) => (
            <span key={t} className="tag text-xs">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-elevated">
          <div className="flex items-center gap-2 text-cream-muted text-sm">
            <Users className="w-4 h-4 text-gold" />
            {guild.memberCount.toLocaleString()} members
          </div>
          <div className="flex items-center gap-2 text-gold text-sm group-hover:gap-3 transition-all duration-300">
            Enter Guild <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("card-premium p-6 group hover:border-gold/30 hover:shadow-gold-sm transition-all duration-300 block", className)}
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
      <p className="text-cream-muted text-xs leading-relaxed mb-4 line-clamp-2">{guild.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {guild.signatureTechniques.slice(0, 3).map((tech) => (
          <span key={tech} className="tag text-xs">{tech}</span>
        ))}
      </div>

      {showRanks && guild.ranks.length > 0 && (
        <div className="border-t border-elevated pt-4 mb-3">
          <div className="text-xs text-cream-faint mb-2 font-cinzel tracking-widest uppercase">Ranks</div>
          <div className="flex gap-2">
            {guild.ranks.map((rank) => (
              <div key={rank.id} title={rank.name} className="text-lg">{rank.icon}</div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Enter Guild <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}
