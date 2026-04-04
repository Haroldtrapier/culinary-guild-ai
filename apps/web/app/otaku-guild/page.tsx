export default function OtakuGuildPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Otaku Culinary Guild</p>
        <h1 className="mt-3 text-4xl font-semibold">Anime-inspired cooking, grounded in real culinary logic.</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Enter an anime title and the system infers likely food styles, recurring dishes, and real-world culinary mappings.
        </p>
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
          Example input: Naruto &rarr; ramen culture, grilled skewers, rice balls, festival foods.
        </div>
      </div>
    </main>
  );
}
