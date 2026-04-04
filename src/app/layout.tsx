import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Culinary Guild — Agentic Culinary Ecosystem",
  description:
    "Build a culinary world: Kitchen Trials, anime-inspired dish recreation, cultural cuisine intelligence, and chef-level editorial storytelling — all in one agentic system.",
  keywords: [
    "culinary guild",
    "kitchen trials",
    "anime cooking",
    "otaku culinary guild",
    "recipes",
    "AI culinary",
    "food",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
