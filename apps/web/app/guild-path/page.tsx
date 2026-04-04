const safetyRules = [
  "If confidence is low, do not recommend consumption.",
  "If the item may be poisonous, warn first.",
  "Wild mushrooms require expert confirmation.",
  "Ornamental flowers should not be treated as edible by default."
];

export default function GuildPathPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Guild Path</p>
          <h1 className="mt-3 text-4xl font-semibold">Scan ingredients in the real world.</h1>
          <p className="mt-4 text-zinc-300">
            Upload a photo from a hike, farmer&apos;s market, garden, or pantry. The system identifies the item,
            checks safety, and suggests pairings and recipes.
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 p-8 text-center text-zinc-400">
            Image upload area
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-2xl font-semibold">Safety layer</h2>
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
            Warning-first design for toxic flowers, poisonous mushrooms, and unknown wild plants.
          </div>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {safetyRules.map((rule) => (
              <li key={rule}>&bull; {rule}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
