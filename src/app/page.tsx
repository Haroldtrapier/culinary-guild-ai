import Link from "next/link";
import {
  ChefHat,
  Sparkles,
  BookOpen,
  Clock,
  Utensils,
  Heart,
  Leaf,
  ArrowRight,
  MessageSquare,
  Lightbulb,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recipes",
    description:
      "Get personalized recipe suggestions based on your ingredients, dietary preferences, and skill level.",
  },
  {
    icon: MessageSquare,
    title: "Cooking Assistant",
    description:
      "Ask questions about techniques, substitutions, and timing. Your personal chef mentor is always available.",
  },
  {
    icon: BookOpen,
    title: "Recipe Library",
    description:
      "Browse our curated collection of recipes from cuisines around the world, from quick meals to gourmet dishes.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description:
      "Reduce food waste with intelligent ingredient-based recipe matching and creative meal ideas.",
  },
  {
    icon: Globe,
    title: "World Cuisines",
    description:
      "Explore authentic dishes from Italian, Japanese, Mexican, Indian, and many more culinary traditions.",
  },
  {
    icon: Heart,
    title: "Dietary Friendly",
    description:
      "Filter for vegetarian, vegan, gluten-free, keto, and other dietary needs with ease.",
  },
];

const stats = [
  { value: "1000+", label: "Recipes" },
  { value: "50+", label: "Cuisines" },
  { value: "24/7", label: "AI Help" },
  { value: "Free", label: "To Use" },
];

const sampleRecipes = [
  {
    title: "Truffle Mushroom Risotto",
    time: "45 min",
    difficulty: "Intermediate",
    category: "Italian",
    image: "🍄",
  },
  {
    title: "Miso Glazed Salmon",
    time: "30 min",
    difficulty: "Easy",
    category: "Japanese",
    image: "🐟",
  },
  {
    title: "Thai Green Curry",
    time: "35 min",
    difficulty: "Easy",
    category: "Thai",
    image: "🍛",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-forest-50/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/60 text-brand-700 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Powered by Artificial Intelligence
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Your Intelligent{" "}
              <span className="text-gradient">Kitchen Companion</span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover recipes, master techniques, and transform your cooking
              with AI-powered guidance from the Culinary Guild.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/assistant"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-lg hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <ChefHat className="h-5 w-5" />
                Ask the AI Chef
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/recipes"
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-200 text-brand-700 font-semibold text-lg hover:bg-brand-50 hover:border-brand-300 transition-all"
              >
                <BookOpen className="h-5 w-5" />
                Browse Recipes
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything You Need in the{" "}
              <span className="text-gradient">Kitchen</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From recipe discovery to cooking guidance, the Culinary Guild AI
              has you covered at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-200 bg-white hover:bg-brand-50/30 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center mb-5 group-hover:from-brand-200 group-hover:to-brand-300 transition-all">
                  <feature.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Recipes Preview */}
      <section className="py-24 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Trending <span className="text-gradient">Recipes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A taste of what our community is cooking right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleRecipes.map((recipe) => (
              <Link
                key={recipe.title}
                href="/recipes"
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 transition-all hover:shadow-xl"
              >
                <div className="h-48 bg-gradient-to-br from-brand-100 to-forest-100 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    {recipe.image}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-brand-100 text-brand-700 rounded-full">
                      {recipe.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-forest-100 text-forest-700 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-brand-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {recipe.time}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-6 py-3 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
            >
              View All Recipes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-500 via-brand-600 to-forest-600 p-12 sm:p-16 text-center text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoMnptMC0zMHY2aC0yVjRoMnptMCAxNXY2aC0ydi02aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
            <div className="relative">
              <Utensils className="h-12 w-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Cooking?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Start a conversation with our AI assistant and unlock a world of
                culinary possibilities.
              </p>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-600 font-semibold text-lg hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              How It <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Ask Anything",
                desc: 'Tell the AI what ingredients you have, what cuisine you\'re craving, or ask "How do I make the perfect risotto?"',
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Get Guidance",
                desc: "Receive personalized recipes, step-by-step instructions, tips, and answers to all your culinary questions.",
              },
              {
                step: "03",
                icon: Leaf,
                title: "Cook & Enjoy",
                desc: "Follow along at your own pace. The AI adapts to your skill level and helps you build confidence in the kitchen.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 rotate-6" />
                  <div className="relative w-full h-full rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <item.icon className="h-7 w-7 text-brand-600" />
                  </div>
                </div>
                <div className="text-xs font-bold text-brand-400 mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
