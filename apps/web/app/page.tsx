import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">The Culinary Guild</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight">
          A culinary world built around discovery, mastery, challenge, and story.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Explore Guild Path to identify ingredients, Kitchen Trials to test your skill,
          and Otaku Culinary Guild to recreate anime-inspired food experiences.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guild-path" className="rounded-2xl bg-white px-5 py-3 font-medium text-zinc-950">
            Open Guild Path
          </Link>
          <Link href="/kitchen-trials" className="rounded-2xl border border-zinc-700 px-5 py-3 font-medium">
            View Kitchen Trials
          </Link>
          <Link href="/otaku-guild" className="rounded-2xl border border-zinc-700 px-5 py-3 font-medium">
            Enter Otaku Culinary Guild
          </Link>
        </div>
      </div>
    </main>
  );
}
