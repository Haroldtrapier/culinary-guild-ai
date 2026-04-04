export default function CulinaryGuildSiteMVP() {
  const nav = [
    "Home",
    "Guild Path",
    "Kitchen Trials",
    "Otaku Culinary Guild",
    "Guilds",
    "Schema",
    "Prompts",
    "Wireframes",
    "Repo",
  ];

  const guilds = [
    {
      name: "Flavor Guild",
      desc: "Pairing logic, taste balance, ingredient synergy, and dish cohesion.",
      icon: "🌿",
    },
    {
      name: "Sauce Guild",
      desc: "Mother sauces, derivatives, emulsions, reductions, and finishing logic.",
      icon: "🥣",
    },
    {
      name: "Fire Guild",
      desc: "Searing, roasting, grilling, smoking, braising, and live-heat execution.",
      icon: "🔥",
    },
    {
      name: "Spice Guild",
      desc: "Global spice origins, blends, authenticity, and flavor architecture.",
      icon: "🌶️",
    },
    {
      name: "Heritage Guild",
      desc: "Cajun, Creole, Gullah Geechee, Indigenous, and regional culinary intelligence.",
      icon: "🗺️",
    },
    {
      name: "Otaku Culinary Guild",
      desc: "Anime-inspired dish recreation, fandom immersion, and style-aware culinary inference.",
      icon: "🍱",
    },
  ];

  const schema = [
    {
      table: "users",
      fields: ["id", "email", "display_name", "created_at"],
    },
    {
      table: "user_profiles",
      fields: [
        "user_id",
        "rank_id",
        "xp",
        "streak_days",
        "favorite_cuisines",
        "dietary_preferences",
      ],
    },
    {
      table: "ingredients",
      fields: [
        "id",
        "name",
        "category",
        "aliases",
        "seasonality",
        "is_anime_friendly",
      ],
    },
    {
      table: "ingredient_scans",
      fields: [
        "id",
        "user_id",
        "image_url",
        "top_match",
        "confidence_score",
        "detected_at",
        "saved_to_pantry",
      ],
    },
    {
      table: "safety_flags",
      fields: [
        "id",
        "scan_id",
        "risk_level",
        "warning_type",
        "recommended_action",
        "notes",
      ],
    },
    {
      table: "spices",
      fields: ["id", "name", "origin_region", "heat_level", "pairings", "notes"],
    },
    {
      table: "recipes",
      fields: [
        "id",
        "title",
        "slug",
        "difficulty",
        "guild",
        "story_note",
        "plating_note",
      ],
    },
    {
      table: "recipe_steps",
      fields: [
        "id",
        "recipe_id",
        "step_order",
        "instruction",
        "technique_tag",
        "time_minutes",
      ],
    },
    {
      table: "anime_series",
      fields: [
        "id",
        "title",
        "dominant_food_style",
        "setting_type",
        "food_presence_score",
        "notes",
      ],
    },
    {
      table: "anime_food_profiles",
      fields: [
        "id",
        "anime_series_id",
        "cuisine_family",
        "recurring_food_themes",
        "real_world_analogs",
        "comfort_food_score",
      ],
    },
    {
      table: "anime_dish_inferences",
      fields: [
        "id",
        "anime_series_id",
        "dish_name",
        "confidence_score",
        "real_world_mapping",
        "style_notes",
      ],
    },
    {
      table: "challenges",
      fields: [
        "id",
        "title",
        "mode",
        "difficulty",
        "time_limit",
        "theme",
        "guild_id",
      ],
    },
    {
      table: "challenge_baskets",
      fields: [
        "id",
        "challenge_id",
        "anchor_ingredient",
        "tension_ingredient",
        "support_ingredient",
        "wildcard_ingredient",
      ],
    },
    {
      table: "challenge_scores",
      fields: [
        "id",
        "submission_id",
        "flavor_balance",
        "technique",
        "creativity",
        "cohesion",
        "presentation",
        "authenticity",
        "total_score",
      ],
    },
  ];

  const prompts = [
    {
      title: "Anime Culinary Inference Agent",
      goal: "Infer the dominant cooking style, likely dish families, and real-world culinary analogs from a named anime.",
      snippet:
        "Given an anime title, identify whether the food style is rooted in school lunches, ramen culture, tavern cooking, festival street food, survival cuisine, desserts, bento culture, or fantasy analogs. Return likely dishes, real-world mappings, flavor notes, and an IP-safe inspired recreation path.",
    },
    {
      title: "Kitchen Trials Judge Agent",
      goal: "Score a user submission like a demanding but constructive chef.",
      snippet:
        "Evaluate against challenge rules. Score flavor balance, technique, creativity, cohesion, presentation, authenticity, and constraint completion. Give precise improvement notes, not generic praise.",
    },
    {
      title: "Recipe Composer Agent",
      goal: "Generate recipe outputs with technique, story, and adaptation paths.",
      snippet:
        "Compose a recipe with ingredients, method, chef notes, substitutions, plating guidance, and cultural context. Offer weeknight, elevated, and challenge-mode variants when relevant.",
    },
    {
      title: "James Beard Editorial Agent",
      goal: "Write with culinary depth, elegance, and editorial quality.",
      snippet:
        "Explain season, ingredient choice, technique, and story with authority. Avoid generic AI tone. Prioritize clarity, culinary rigor, and memorable food writing.",
    },
  ];

  const wireframes = [
    {
      name: "Home / Guild Hall",
      blocks: [
        "Hero: search + featured guilds",
        "Guild Path callout",
        "Kitchen Trials callout",
        "Otaku Culinary Guild carousel",
        "Daily Trial",
        "Progress + ranks",
        "Editorial collection spotlight",
      ],
    },
    {
      name: "Guild Path Scan",
      blocks: [
        "Camera / upload",
        "Detected item card",
        "Confidence score",
        "Toxicity / safety banner",
        "Pairings",
        "Recipe options",
        "Save to Pantry / Start Trial",
      ],
    },
    {
      name: "Kitchen Trials",
      blocks: [
        "Difficulty selector",
        "Basket reveal",
        "Timer",
        "Plan / Hint / Guided mode",
        "Submit dish",
        "Judge results panel",
      ],
    },
    {
      name: "Anime Series Style Page",
      blocks: [
        "Anime title + style summary",
        "Likely food categories",
        "Dish recreation cards",
        "Immersion mode",
        "Series-inspired trial button",
      ],
    },
    {
      name: "Schema + Build Docs",
      blocks: [
        "Database cards",
        "Agent prompt library",
        "Repo tree",
        "API endpoint list",
      ],
    },
  ];

  const repo = [
    "apps/web                # Next.js frontend",
    "apps/api                # FastAPI backend",
    "packages/ui             # shared components",
    "packages/prompts        # agent prompts and templates",
    "packages/schema         # DB models and migrations",
    "packages/content        # editorial collections, trials, anime guides",
    "packages/agents         # orchestrator + specialist agents",
    "supabase/               # policies, SQL, seeds",
    "docs/                   # product, wireframes, editorial standards",
  ];

  const endpoints = [
    "POST /api/vision/identify",
    "POST /api/vision/safety-check",
    "POST /api/ingredient/profile",
    "POST /api/recipes/from-ingredient",
    "POST /api/recipes/generate",
    "POST /api/anime/infer-style",
    "POST /api/anime/recreate-dish",
    "POST /api/trials/generate",
    "POST /api/trials/judge",
    "GET /api/guilds",
    "GET /api/collections/featured",
    "POST /api/editorial/compose",
  ];

  const features = [
    "Style-aware anime dish recreation",
    "Mystery-basket challenge engine",
    "Guild progression and ranks",
    "Prestige editorial layer",
    "Cultural cuisine intelligence",
    "Recipe + plating + pairing guidance",
    "Guild Path image-to-ingredient discovery",
    "Poisonous plant and mushroom safety alerts",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              The Culinary Guild
            </div>
            <div className="text-xl font-semibold">
              Agentic Culinary Ecosystem
            </div>
          </div>
          <nav className="hidden gap-5 text-sm text-zinc-300 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section id="home" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Full build package + site MVP
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Build a culinary world: part school, part challenge arena, part
              fandom kitchen, part prestige food platform.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              The Culinary Guild combines Kitchen Trials, anime-inspired dish
              recreation, cultural cuisine intelligence, and chef-level editorial
              storytelling into one agentic system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kitchen-trials"
                className="rounded-2xl bg-white px-5 py-3 font-medium text-zinc-950 transition hover:opacity-90"
              >
                Explore Kitchen Trials
              </a>
              <a
                href="#otaku-culinary-guild"
                className="rounded-2xl border border-zinc-700 px-5 py-3 font-medium text-white transition hover:border-zinc-500"
              >
                Open Otaku Culinary Guild
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-sm font-medium text-zinc-400">
                North Star
              </div>
              <div className="mt-3 text-2xl font-semibold">
                James Beard&ndash;caliber culinary experience
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Build for rigor, originality, cultural depth, technical clarity,
                and strong editorial voice.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-sm font-medium text-zinc-400">
                Challenge Engine
              </div>
              <div className="mt-3 text-2xl font-semibold">Kitchen Trials</div>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Mystery baskets, constraints, AI judging, rankings, and guild
                progression.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-sm font-medium text-zinc-400">
                Fandom Layer
              </div>
              <div className="mt-3 text-2xl font-semibold">
                Otaku Culinary Guild
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Enter an anime title and infer its food style, likely dishes,
                and inspired recreations.
              </p>
            </div>
          </div>
        </section>

        <section id="guilds" className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                Guild structure
              </div>
              <h2 className="mt-2 text-3xl font-semibold">The Guild Hall</h2>
            </div>
            <div className="text-sm text-zinc-400">
              Skill paths, culture, technique, and creative progression
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guilds.map((guild) => (
              <div
                key={guild.name}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
              >
                <div className="text-3xl">{guild.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{guild.name}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {guild.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="guild-path"
          className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Living culinary journey
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Guild Path</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Users can scan ingredients in the real world on a hike, at a
              farmer&apos;s market, in a garden, or at a grocery store. The
              system identifies the item, explains what it is, warns about
              possible risks, and suggests recipes, pairings, and cuisine paths.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Scan ingredient from photo",
                "Identify produce, herbs, mushrooms, flowers, and pantry items",
                "Flag potentially toxic or poisonous finds",
                "Suggest recipes and pairings",
                "Save discoveries to Pantry",
                "Launch a trial from discovered items",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Scan flow
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>1. Upload or capture photo</li>
                  <li>2. AI identifies likely ingredient</li>
                  <li>3. Safety system checks toxicity risk</li>
                  <li>4. Flavor and cuisine engine suggests uses</li>
                  <li>5. Save to Pantry or Cook Now</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Safety layer
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>
                    High-risk mushrooms flagged for non-consumption
                  </li>
                  <li>
                    Toxic flowers and ornamental plants warned clearly
                  </li>
                  <li>Confidence-based identification display</li>
                  <li>Do not eat guidance when certainty is low</li>
                  <li>
                    Escalate to expert verification recommendation
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
              Safety rule: when an image may depict a poisonous or toxic
              mushroom, flower, or plant, the system must prioritize a warning
              over recipe suggestions and instruct the user not to consume it
              without expert confirmation.
            </div>
          </div>
        </section>

        <section
          id="kitchen-trials"
          className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Challenge engine
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Kitchen Trials</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Users receive a mystery basket, time limit, and creative
              constraint. The system can guide, coach, or judge the dish like a
              serious but constructive chef.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Mystery Basket Trial",
                "Constraint Trial",
                "Technique Trial",
                "Regional Trial",
                "Pairing Trial",
                "Anime Guild Trial",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Example basket
                </div>
                <div className="mt-3 text-lg font-semibold">
                  Sous Chef Trial
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>Anchor: chicken thighs</li>
                  <li>Tension: blueberries</li>
                  <li>Support: thyme</li>
                  <li>Wildcard: chickpeas</li>
                  <li>Constraint: include a pan sauce</li>
                  <li>Time: 35 minutes</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Judge categories
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  <li>Flavor balance &mdash; 25</li>
                  <li>Technique &mdash; 20</li>
                  <li>Creativity &mdash; 15</li>
                  <li>Cohesion &mdash; 15</li>
                  <li>Presentation &mdash; 10</li>
                  <li>Authenticity &mdash; 10</li>
                  <li>Constraint success &mdash; 5</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="otaku-culinary-guild"
          className="mt-20 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                Fandom culinary intelligence
              </div>
              <h2 className="mt-2 text-3xl font-semibold">
                Otaku Culinary Guild
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Enter an anime by name and the agent infers its culinary style:
                ramen culture, tavern food, school lunches, bento, festival
                snacks, sweets, comfort meals, or fantasy analogs. Then it maps
                those themes to real-world dishes and shows the user how to
                recreate them.
              </p>
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 text-sm text-zinc-300">
                <div className="font-medium text-white">
                  Anime title &rarr; culinary reasoning
                </div>
                <p className="mt-3 leading-6">
                  Example: a title with ramen-shop identity triggers noodle
                  broth profiles, topping logic, shoyu or tonkotsu style
                  mapping, and weeknight vs elevated recreation paths.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Iconic Dishes Archive",
                "Series Style Detection",
                "Real-World Cuisine Mapping",
                "Scene-to-Plate Recipes",
                "Immersion Mode",
                "Anime Trials",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schema" className="mt-20">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Build package
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Database schema</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {schema.map((item) => (
              <div
                key={item.table}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="text-lg font-semibold">{item.table}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.fields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="prompts" className="mt-20">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Agent library
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Prompt system</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {prompts.map((prompt) => (
              <div
                key={prompt.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="text-xl font-semibold">{prompt.title}</div>
                <div className="mt-2 text-sm font-medium text-zinc-400">
                  {prompt.goal}
                </div>
                <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-300">
                  {prompt.snippet}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="wireframes" className="mt-20 grid gap-4 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              UX architecture
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Screen wireframes</h2>
          </div>
          <div className="text-sm leading-6 text-zinc-400">
            These screen groups define the initial MVP information architecture
            for the web app.
          </div>
          {wireframes.map((wf) => (
            <div
              key={wf.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="text-xl font-semibold">{wf.name}</div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {wf.blocks.map((block) => (
                  <li key={block}>&bull; {block}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section
          id="repo"
          className="mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Monorepo plan
            </div>
            <h2 className="mt-2 text-3xl font-semibold">MVP repo structure</h2>
            <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
              {repo.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              API surface
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Core endpoints</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-300"
                >
                  {endpoint}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
