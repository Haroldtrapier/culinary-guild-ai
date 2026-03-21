import { ChefHat } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-7 w-7 text-brand-400" />
              <span className="text-xl font-bold text-white">
                Culinary Guild AI
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Your intelligent kitchen companion. Discover recipes, get
              personalized cooking advice, and elevate your culinary skills with
              AI-powered assistance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-brand-400 transition-colors"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/assistant"
                  className="hover:text-brand-400 transition-colors"
                >
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Haroldtrapier/culinary-guild-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Culinary Guild AI. Built with Next.js &amp; Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
