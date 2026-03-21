"use client";

import { useState, useMemo } from "react";
import { Search, Clock, Users, Filter, ChefHat } from "lucide-react";
import { recipes, cuisines, difficulties, type Recipe } from "@/lib/recipes";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 transition-all hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <div className="h-44 bg-gradient-to-br from-brand-100 to-forest-100 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {recipe.emoji}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-medium bg-brand-100 text-brand-700 rounded-full">
              {recipe.cuisine}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : recipe.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
          <h3 className="text-lg font-semibold group-hover:text-brand-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prepTime} + {recipe.cookTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings} servings
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-600 mb-3">
                Ingredients
              </h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-600 mb-3">
                Instructions
              </h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCuisine =
        selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCuisine && matchesDifficulty;
    });
  }, [searchQuery, selectedCuisine, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Recipe <span className="text-gradient">Explorer</span>
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Browse, search, and discover recipes from around the world
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all text-gray-700"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                showFilters
                  ? "bg-brand-100 text-brand-600"
                  : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Cuisine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisines.map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => setSelectedCuisine(cuisine)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          selectedCuisine === cuisine
                            ? "bg-brand-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-brand-100 hover:text-brand-700"
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          selectedDifficulty === diff
                            ? "bg-brand-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-brand-100 hover:text-brand-700"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredRecipes.length}
            </span>{" "}
            recipe{filteredRecipes.length !== 1 ? "s" : ""}
          </p>
          {(selectedCuisine !== "All" || selectedDifficulty !== "All") && (
            <button
              onClick={() => {
                setSelectedCuisine("All");
                setSelectedDifficulty("All");
              }}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
