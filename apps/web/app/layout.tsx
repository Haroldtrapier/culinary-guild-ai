import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: {
    default: "The Culinary Guild — Where Flavor Meets Intelligence",
    template: "%s | The Culinary Guild",
  },
  description:
    "A premium AI culinary ecosystem. Kitchen Trials, Flavor Atlas, Spice Codex, Heritage Table, Otaku Guild, and nine specialized guilds — all powered by AI intelligence.",
  keywords: [
    "culinary AI",
    "cooking platform",
    "kitchen trials",
    "anime cooking",
    "flavor pairing",
    "spice encyclopedia",
    "culinary guild",
    "AI recipes",
  ],
  authors: [{ name: "The Culinary Guild" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "The Culinary Guild",
    description: "Where Flavor Meets Intelligence",
    siteName: "The Culinary Guild",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-void text-cream antialiased min-h-screen">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-deep border-t border-elevated py-12 mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div className="md:col-span-2">
                <div className="font-cinzel text-xl font-bold tracking-widest text-gold mb-3">
                  THE CULINARY GUILD
                </div>
                <p className="font-playfair italic text-cream-muted text-sm leading-relaxed max-w-xs">
                  Where Flavor Meets Intelligence. A premium AI culinary ecosystem for masters, students, and dreamers of the craft.
                </p>
              </div>
              <div>
                <div className="font-cinzel text-xs font-semibold tracking-widest text-gold mb-4 uppercase">
                  Explore
                </div>
                <ul className="space-y-2 text-sm text-cream-muted">
                  <li><a href="/kitchen-trials" className="hover:text-gold transition-colors">Kitchen Trials</a></li>
                  <li><a href="/guilds" className="hover:text-gold transition-colors">Guild Hall</a></li>
                  <li><a href="/flavor-atlas" className="hover:text-gold transition-colors">Flavor Atlas</a></li>
                  <li><a href="/spice-codex" className="hover:text-gold transition-colors">Spice Codex</a></li>
                </ul>
              </div>
              <div>
                <div className="font-cinzel text-xs font-semibold tracking-widest text-gold mb-4 uppercase">
                  Discover
                </div>
                <ul className="space-y-2 text-sm text-cream-muted">
                  <li><a href="/otaku-guild" className="hover:text-gold transition-colors">Otaku Culinary Guild</a></li>
                  <li><a href="/heritage-table" className="hover:text-gold transition-colors">Heritage Table</a></li>
                  <li><a href="/mixology-chamber" className="hover:text-gold transition-colors">Mixology Chamber</a></li>
                  <li><a href="/recipe-generator" className="hover:text-gold transition-colors">Recipe Generator</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-elevated pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-cream-faint text-xs font-inter tracking-wide">
                © 2026 The Culinary Guild. All rights reserved.
              </p>
              <p className="text-cream-faint text-xs font-playfair italic">
                Built with reverence for the craft. Powered by intelligence. Seasoned with soul.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
