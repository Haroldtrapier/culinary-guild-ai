"use client";

import Link from "next/link";
import {
  Flame, Star, Globe, Scroll, BookOpen, Beaker, ChefHat, UtensilsCrossed,
  ArrowRight, Trophy, Users, Zap, Shield, Award, Clock, Layers,
} from "lucide-react";

const GUILD_CARDS = [
  { id: "flavor", name: "Guild of Flavor", icon: "🌊", tagline: "Taste is the compass", color: "from-slate-700 to-slate-900", count: "4,821", link: "/guilds/flavor" },
  { id: "sauce", name: "Guild of Sauce", icon: "🫙", tagline: "The sauce is the soul", color: "from-red-900 to-red-950", count: "3,246", link: "/guilds/sauce" },
  { id: "fire", name: "Guild of Fire", icon: "🔥", tagline: "Control the flame", color: "from-orange-900 to-orange-950", count: "5,102", link: "/guilds/fire" },
  { id: "spice", name: "Guild of Spice", icon: "🌶️", tagline: "Spice is civilization", color: "from-yellow-900 to-yellow-950", count: "3,879", link: "/guilds/spice" },
  { id: "heritage", name: "Guild of Heritage", icon: "📿", tagline: "Every recipe is culture", color: "from-green-900 to-green-950", count: "2,651", link: "/guilds/heritage" },
  { id: "bake", name: "Guild of Bake", icon: "🍞", tagline: "Bread is civilization", color: "from-amber-900 to-amber-950", count: "4,190", link: "/guilds/bake" },
  { id: "broth", name: "Guild of Broth", icon: "🍲", tagline: "Great soup transcends", color: "from-stone-700 to-stone-900", count: "2,103", link: "/guilds/broth" },
  { id: "mixology", name: "Guild of Mixology", icon: "🍸", tagline: "Bar meets kitchen", color: "from-blue-900 to-blue-950", count: "3,308", link: "/guilds/mixology" },
  { id: "otaku", name: "Otaku Culinary Guild", icon: "⛩️", tagline: "Cook the story", color: "from-purple-900 to-purple-950", count: "7,840", link: "/otaku-guild" },
];

const FEATURE_CARDS = [
  {
    icon: Flame,
    title: "Kitchen Trials",
    description: "Chopped-style challenges with mystery baskets, AI judging, and a 100-point scoring system. From Apprentice to Culinary Legend — your skills will be tested.",
    link: "/kitchen-trials",
    badge: "Challenge",
    badgeColor: "bg-ember/20 text-ember border-ember/30",
  },
  {
    icon: Star,
    title: "Otaku Culinary Guild",
    description: "AI-powered anime food style detection for 25+ series. Recreate Naruto's ramen, Howl's breakfast, the spirit world feasts from Spirited Away — with expert recreation guides.",
    link: "/otaku-guild",
    badge: "Anime",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    icon: Globe,
    title: "Flavor Atlas",
    description: "Intelligent ingredient pairing with confidence scores. Discover what goes with what — across 500+ ingredients and flavor families — guided by flavor science.",
    link: "/flavor-atlas",
    badge: "Intelligence",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  },
  {
    icon: Scroll,
    title: "Spice Codex",
    description: "Encyclopedia of 60+ global spices with origin, flavor profiles, pairing guides, historical context, and preparation tips. The complete spice library.",
    link: "/spice-codex",
    badge: "Knowledge",
    badgeColor: "bg-gold/20 text-gold border-gold/30",
  },
  {
    icon: BookOpen,
    title: "Heritage Table",
    description: "Deep exploration of 20+ regional cuisines: Cajun, Gullah Geechee, West African, Levantine, Indian, SE Asian, and more — with cultural context and history.",
    link: "/heritage-table",
    badge: "Culture",
    badgeColor: "bg-sage/20 text-sage border-sage/30",
  },
  {
    icon: Beaker,
    title: "Mixology Chamber",
    description: "AI cocktail generation, classic library, food pairing intelligence, infusion techniques, and a full mocktail system. The bar as culinary discipline.",
    link: "/mixology-chamber",
    badge: "Craft",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  },
];

const ANIME_FEATURES = [
  { series: "Food Wars!", dish: "Yukihira's Transforming Furikake Rice", style: "Japanese competitive cuisine" },
  { series: "Spirited Away", dish: "Spirit World Feast Bowls", style: "Japanese spirit world banquet" },
  { series: "Delicious in Dungeon", dish: "Basilisk Egg Omelette with Dungeon Mushrooms", style: "Fantasy medieval cookery" },
  { series: "Howl's Moving Castle", dish: "Calcifer's Bacon and Eggs", style: "Central European hearth cooking" },
  { series: "Naruto", dish: "Ichiraku Miso Ramen", style: "Japanese village comfort food" },
];

const STATS = [
  { label: "Active Members", value: "37,140+", icon: Users },
  { label: "Trials Completed", value: "2.4M+", icon: Trophy },
  { label: "Spices Cataloged", value: "60+", icon: Scroll },
  { label: "Anime Series", value: "25+", icon: Star },
  { label: "Guild Quests", value: "180+", icon: Shield },
  { label: "AI Recipes Generated", value: "500K+", icon: Zap },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-void">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-noise opacity-50" />

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-crimson/5 blur-3xl animate-float animate-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-3xl" />

        {/* Gold border decorations */}
        <div className="absolute top-[80px] left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Pre-heading */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold-faint mb-8 animate-fade-in">
            <ChefHat className="w-4 h-4 text-gold" />
            <span className="font-cinzel text-xs tracking-widest text-gold uppercase">Welcome to The Culinary Guild</span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6 animate-fade-up">
            <span className="gradient-text-gold glow-gold">THE</span>
            <br />
            <span className="text-cream">CULINARY</span>
            <br />
            <span className="gradient-text-gold glow-gold">GUILD</span>
          </h1>

          {/* Tagline */}
          <p className="font-playfair italic text-2xl md:text-3xl text-cream-warm mb-4 animate-fade-up animate-delay-200">
            Where Flavor Meets Intelligence
          </p>

          {/* Subtagline */}
          <p className="font-inter text-cream-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-300">
            A premium AI culinary ecosystem. Kitchen Trials, Nine Guilds, Anime Food Detective,
            Flavor Atlas, Spice Codex, Heritage Table, and Mixology Chamber — all powered by advanced AI intelligence and Michelin-star culinary standards.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-400">
            <Link href="/dashboard" className="btn-gold text-sm px-8 py-4 shadow-gold">
              Enter the Guild
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/kitchen-trials" className="btn-outline-gold text-sm px-8 py-4">
              <Flame className="w-4 h-4" />
              Start a Trial
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-6 pt-10 border-t border-elevated animate-fade-up animate-delay-500">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1" />
                  <div className="font-cinzel font-bold text-lg text-gold">{stat.value}</div>
                  <div className="text-cream-faint text-xs">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-gold mb-4">Platform Modules</div>
          <h2 className="section-title mb-4">Every Dimension of Culinary Mastery</h2>
          <div className="divider-gold" />
          <p className="font-playfair italic text-cream-muted text-lg max-w-2xl mx-auto">
            Six interconnected systems, nine guilds, and infinite AI-powered culinary intelligence — all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.link}
                className="card-premium p-6 group hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-sm bg-elevated flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className={`badge-difficulty text-xs px-3 py-1 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-cream-muted text-sm leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-gold text-sm font-inter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== GUILD HALL ===== */}
      <section className="py-24 bg-deep border-y border-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="badge-gold mb-4">Guild Hall</div>
            <h2 className="section-title mb-4">Nine Guilds. One Culinary Universe.</h2>
            <div className="divider-gold" />
            <p className="font-playfair italic text-cream-muted text-lg max-w-2xl mx-auto">
              Each guild is a specialized academy with its own philosophy, ranks, quests, and culinary traditions.
              Join one. Master all.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUILD_CARDS.map((guild) => (
              <Link
                key={guild.id}
                href={guild.link}
                className={`relative overflow-hidden rounded-sm border border-elevated group hover:border-gold-muted transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${guild.color} opacity-60`} />
                <div className="absolute inset-0 bg-noise opacity-30" />
                <div className="relative p-6">
                  <div className="text-4xl mb-3">{guild.icon}</div>
                  <h3 className="font-cinzel font-bold text-lg text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                    {guild.name}
                  </h3>
                  <p className="text-cream-muted text-sm italic font-playfair mb-4">{guild.tagline}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-cream-faint">
                      <Users className="w-3 h-3" />
                      {guild.count} members
                    </div>
                    <div className="flex items-center gap-1 text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Enter <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KITCHEN TRIALS TEASER ===== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge-gold mb-6">Kitchen Trials</div>
            <h2 className="section-title mb-4">
              Think you can cook under pressure?
            </h2>
            <div className="w-16 h-px bg-gold mb-6" />
            <p className="font-playfair italic text-cream-warm text-lg mb-4 leading-relaxed">
              &ldquo;The mystery basket has been revealed. The clock is running. Your AI judge is watching. You have forty-five minutes.&rdquo;
            </p>
            <p className="text-cream-muted text-sm leading-relaxed mb-8">
              Kitchen Trials is a Chopped-inspired challenge engine with five modes: Trial, Campaign, Arena, Studio, and Daily.
              Six difficulty tiers from Apprentice to Culinary Legend. AI judging on a 100-point scale covering flavor,
              technique, creativity, presentation, and constraint adherence.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Scoring", value: "100-point scale", icon: Trophy },
                { label: "Modes", value: "5 challenge types", icon: Layers },
                { label: "Difficulty", value: "6 tiers", icon: Shield },
                { label: "Time Limits", value: "30 to 90 min", icon: Clock },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-charcoal border border-elevated rounded-sm p-4">
                    <Icon className="w-4 h-4 text-gold mb-2" />
                    <div className="text-cream text-sm font-semibold">{item.value}</div>
                    <div className="text-cream-faint text-xs">{item.label}</div>
                  </div>
                );
              })}
            </div>

            <Link href="/kitchen-trials" className="btn-gold">
              <Flame className="w-4 h-4" />
              Start a Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trial card preview */}
          <div className="card-gold-border p-6 animate-glow-pulse">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-cinzel text-xs text-gold tracking-widest uppercase mb-1">Daily Trial</div>
                <div className="font-playfair text-xl font-semibold text-cream">Root to Stem</div>
              </div>
              <div className="badge-difficulty px-3 py-1 text-xs rounded-full border bg-sage/10 text-sage border-sage/30">
                Home Cook
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-cream-muted uppercase tracking-widest mb-3 font-cinzel">Mystery Basket</div>
              <div className="grid grid-cols-2 gap-2">
                {["Beets", "Beet Greens", "Goat Cheese", "Walnuts"].map((ingredient) => (
                  <div key={ingredient} className="flex items-center gap-2 bg-elevated rounded-sm p-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-cream">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-cream-muted">
                <Clock className="w-4 h-4" />
                40 minutes
              </div>
              <div className="flex items-center gap-2 text-cream-muted">
                <Trophy className="w-4 h-4" />
                250 XP
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-elevated">
              <div className="text-xs text-cream-muted mb-1">Bonus Objective</div>
              <div className="text-sm text-gold font-playfair italic">Use the entire beet — root, stem, and greens — in one cohesive dish</div>
            </div>

            <div className="mt-6">
              <Link href="/kitchen-trials" className="btn-gold w-full justify-center text-sm py-3">
                Accept This Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OTAKU GUILD TEASER ===== */}
      <section className="py-24 bg-deep border-y border-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="font-cinzel text-xs tracking-widest text-purple-400 uppercase">Otaku Culinary Guild</span>
            </div>
            <h2 className="section-title mb-4">Cook the Meals That Made You Want to Live Inside the Story</h2>
            <div className="divider-gold" />
            <p className="font-playfair italic text-cream-muted text-lg max-w-2xl mx-auto">
              Tell us an anime. Our AI detects the food style, cuisine family, and culinary philosophy — then gives you expert recreation guides for the iconic dishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {ANIME_FEATURES.map((item) => (
              <div key={item.series} className="card-premium p-4 group hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300">
                <div className="text-2xl mb-3">⛩️</div>
                <div className="font-cinzel text-xs text-purple-400 tracking-wide mb-1">{item.series}</div>
                <div className="font-playfair text-sm font-semibold text-cream mb-2 leading-snug">{item.dish}</div>
                <div className="text-cream-faint text-xs italic">{item.style}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/otaku-guild" className="btn-outline-gold">
              <Star className="w-4 h-4" />
              Enter the Otaku Guild
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HERITAGE & SPICE ===== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Heritage Table */}
          <div className="card-premium p-8 group hover:border-sage/30 transition-all duration-300">
            <div className="text-4xl mb-4">📿</div>
            <div className="badge-gold mb-4">Heritage Table</div>
            <h3 className="font-playfair text-2xl font-bold text-cream mb-3">Every Recipe Is a Cultural Artifact</h3>
            <p className="text-cream-muted text-sm leading-relaxed mb-6">
              Explore 20+ regional cuisines with cultural context, historical notes, signature spice blends, and traditional technique guides.
              Cajun, Gullah Geechee, West African, Levantine, Indian, Thai, Japanese, Caribbean — and beyond.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Cajun", "Gullah Geechee", "West African", "Levantine", "Indian", "Thai", "Japanese", "Caribbean"].map((r) => (
                <span key={r} className="tag">{r}</span>
              ))}
            </div>
            <Link href="/heritage-table" className="btn-outline-gold text-sm py-2 px-5 inline-flex">
              <BookOpen className="w-4 h-4" />
              Explore Heritage Table
            </Link>
          </div>

          {/* Spice Codex */}
          <div className="card-premium p-8 group hover:border-gold/30 transition-all duration-300">
            <div className="text-4xl mb-4">🌶️</div>
            <div className="badge-gold mb-4">Spice Codex</div>
            <h3 className="font-playfair text-2xl font-bold text-cream mb-3">60+ Spices. Every Origin. Every Use.</h3>
            <p className="text-cream-muted text-sm leading-relaxed mb-6">
              The complete encyclopedia of global spices — with flavor profiles, pairing guides, preparation tips, and historical notes.
              From Sumac to Szechuan Pepper to Grains of Paradise.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Saffron", "Ras el Hanout", "Berbere", "Garam Masala", "Sumac", "Za'atar", "Mace", "Fenugreek"].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
            <Link href="/spice-codex" className="btn-outline-gold text-sm py-2 px-5 inline-flex">
              <Scroll className="w-4 h-4" />
              Open the Codex
            </Link>
          </div>
        </div>
      </section>

      {/* ===== RECIPE GENERATOR CTA ===== */}
      <section className="py-24 bg-deep border-t border-elevated">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="badge-gold mb-6">AI Recipe Generator</div>
          <h2 className="section-title mb-4">
            Tell Us What&apos;s in Your Kitchen.<br />We&apos;ll Tell You What to Cook.
          </h2>
          <div className="divider-gold" />
          <p className="font-playfair italic text-cream-warm text-xl mb-4">
            From pantry ingredients to Michelin-quality recipes in seconds.
          </p>
          <p className="text-cream-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            Input any combination of ingredients. Select your cuisine style, dietary restrictions, and skill level.
            Our AI generates complete recipes with full technique guidance, sauce suggestions, spice pairings, and plating notes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/recipe-generator" className="btn-gold text-sm px-8 py-4 shadow-gold">
              <UtensilsCrossed className="w-4 h-4" />
              Generate a Recipe
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/flavor-atlas" className="btn-outline-gold text-sm px-8 py-4">
              <Globe className="w-4 h-4" />
              Explore Flavor Atlas
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="font-cinzel font-black text-5xl md:text-6xl tracking-tight text-cream mb-6 glow-gold-sm">
            Your Culinary Journey
            <br />
            <span className="gradient-text-gold">Begins Now.</span>
          </div>
          <p className="font-playfair italic text-cream-warm text-xl mb-10">
            Join 37,000+ culinary practitioners in the world&apos;s first AI culinary guild system.
          </p>
          <Link href="/dashboard" className="btn-gold text-base px-10 py-5 shadow-gold-lg">
            <Award className="w-5 h-5" />
            Enter The Culinary Guild
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
