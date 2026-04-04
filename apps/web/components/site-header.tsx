import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/guild-path", label: "Guild Path" },
  { href: "/kitchen-trials", label: "Kitchen Trials" },
  { href: "/otaku-guild", label: "Otaku Culinary Guild" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          The Culinary Guild
        </Link>
        <nav className="hidden gap-5 text-sm text-zinc-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
