import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  centered?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Hero({
  badge,
  title,
  titleHighlight,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  centered = true,
  size = "md",
  className,
}: HeroProps) {
  const titleSizes = { sm: "text-3xl md:text-4xl", md: "text-4xl md:text-5xl", lg: "text-5xl md:text-7xl" };

  return (
    <section className={cn("relative py-16 md:py-24 px-6 overflow-hidden border-b border-elevated", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-void to-void pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className={cn("max-w-5xl mx-auto relative z-10", centered && "text-center")}>
        {badge && (
          <div className={cn("badge-gold mb-6 inline-flex", centered && "mx-auto")}>
            {badge}
          </div>
        )}

        <h1 className={cn("font-cinzel font-black tracking-tight leading-none mb-4", titleSizes[size])}>
          <span className="text-cream">{title}</span>
          {titleHighlight && (
            <>
              {" "}
              <span className="gradient-text-gold glow-gold-sm">{titleHighlight}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className={cn("font-playfair italic text-cream-warm mb-4", size === "lg" ? "text-2xl md:text-3xl" : "text-xl")}>
            {subtitle}
          </p>
        )}

        {description && (
          <p className={cn("text-cream-muted leading-relaxed mb-8", centered && "max-w-2xl mx-auto")}>
            {description}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className={cn("flex flex-col sm:flex-row gap-4", centered && "items-center justify-center")}>
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-gold px-8 py-4">
                {primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-outline-gold px-8 py-4">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
