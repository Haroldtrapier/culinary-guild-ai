import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "The Culinary Guild",
  description: "Agentic culinary ecosystem with Guild Path, Kitchen Trials, and Otaku Culinary Guild."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
