export default function KitchenTrialsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Kitchen Trials</p>
        <h1 className="mt-3 text-4xl font-semibold">Mystery baskets. Real constraints. Creative cooking.</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Mystery Basket Trial",
            "Technique Trial",
            "Regional Trial",
            "Anime Guild Trial",
            "Pairing Trial",
            "Survival Trial"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
