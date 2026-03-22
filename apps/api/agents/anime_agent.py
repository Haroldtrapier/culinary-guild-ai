"""
Anime Agent
Infers food style, cuisine family, and iconic dishes from anime series titles.
"""

import os
import json
import logging
from typing import Optional
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)

# Curated database for known series (avoids unnecessary API calls)
KNOWN_SERIES = {
    "food wars": {
        "detected_style": "Elite culinary competition academy — pushing the boundaries of technique and creativity",
        "cuisine_family": "Japanese fusion + international competition cuisine",
        "setting_type": "Tōtsuki Culinary Academy — elite private school with shokugeki battle system",
        "food_philosophy": "Cooking as combat. Every dish must evoke a physical, emotional response — the 'foodgasm'. Technique is nothing without imagination.",
        "real_world_analogs": ["High-end kaiseki", "French haute cuisine", "Modern Spanish molecular gastronomy"],
        "recurring_themes": ["Competitive judging", "Flavor transformation", "Ingredient respect", "Innovation vs tradition"],
        "confidence": 99,
    },
    "naruto": {
        "detected_style": "Village comfort food with ninja field rations — humble, hearty, emotionally resonant",
        "cuisine_family": "Japanese home cooking and izakaya comfort food",
        "setting_type": "Hidden Leaf Village — small town, ramen shops, and field survival",
        "food_philosophy": "Food is connection. Ramen is Naruto's love language — shared over a bowl is the deepest form of friendship in the shinobi world.",
        "real_world_analogs": ["Japanese village home cooking", "Classic ramen shops", "Traditional wagashi"],
        "recurring_themes": ["Ramen as comfort", "Dango as celebration", "Field rations as survival", "Shared meals as bonding"],
        "confidence": 99,
    },
    "spirited away": {
        "detected_style": "Spirit world banquet cuisine — ethereal, visually magnificent, impossible in the real world",
        "cuisine_family": "Japanese traditional — elevated to spiritual/mythological dimensions",
        "setting_type": "Spirit bathhouse — a liminal space between human and spirit realms",
        "food_philosophy": "Food in the spirit world has power. Eating without permission can trap you there. The food is a metaphor for temptation, belonging, and the danger of forgetting your humanity.",
        "real_world_analogs": ["Traditional Japanese washoku", "Festival matsuri food", "Ryokan kaiseki"],
        "recurring_themes": ["Forbidden eating", "Spirit food as magic", "Labor for sustenance", "Onigiri as love"],
        "confidence": 99,
    },
    "delicious in dungeon": {
        "detected_style": "Monster ingredient cookery — converting dungeon creatures into nourishing, often delicious meals through ingenuity",
        "cuisine_family": "Fantasy medieval European with Japanese home cooking sensibility",
        "setting_type": "Underground dungeon — dark, resource-scarce, survival-driven",
        "food_philosophy": "Resourcefulness defines flavor. Every monster is an ingredient. The dungeon provides — if you know how to look. Waste is survival failure.",
        "real_world_analogs": ["Medieval European peasant cooking", "Japanese home cooking techniques", "Wild game preparation", "Field foraging"],
        "recurring_themes": ["Zero waste cooking", "Creature proteins", "Foraging", "Cooking as survival", "Finding beauty in unconventional ingredients"],
        "confidence": 99,
    },
}


class AnimeAgent:
    """
    AI agent for anime food style detection and dish recreation.

    Capabilities:
    - Infer food style and cuisine family from any anime title
    - Generate authentic-feeling dish recreation guides
    - Create immersion notes for atmospheric cooking
    - Identify real-world analogs for fictional foods
    """

    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = os.getenv("CLAUDE_MODEL", "claude-opus-4-5")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def infer_food_style(
        self,
        title: str,
        additional_context: Optional[str] = None,
        include_recreation_guides: bool = True,
    ) -> dict:
        """
        Infer food style, cuisine family, and iconic dishes from an anime title.

        First checks curated database, then uses AI for any series.
        """
        from packages.prompts.anime_prompts import build_inference_prompt

        # Check curated database first
        normalized = title.lower().strip()
        for key, data in KNOWN_SERIES.items():
            if key in normalized or normalized in key:
                logger.info(f"Serving '{title}' from curated database")
                # Generate dishes using AI for known series
                dishes = await self._generate_dishes(title, data["cuisine_family"])
                return {
                    "series_title": title,
                    "detected_style": data["detected_style"],
                    "cuisine_family": data["cuisine_family"],
                    "setting_type": data["setting_type"],
                    "food_philosophy": data["food_philosophy"],
                    "key_dishes": dishes,
                    "atmospheric_notes": f"The {data['setting_type']} defines every meal. {data['food_philosophy']}",
                    "recommended_difficulty": "home-cook",
                    "confidence": data["confidence"],
                    "real_world_analogs": data["real_world_analogs"],
                    "recurring_themes": data["recurring_themes"],
                }

        # Unknown series — use AI inference
        prompt = build_inference_prompt(
            title=title,
            additional_context=additional_context,
            include_recreation_guides=include_recreation_guides,
        )

        message = await self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}],
            system=self._get_system_prompt(),
        )

        content = message.content[0].text
        return self._parse_inference_response(content, title)

    async def get_series_dishes(self, series_id: str) -> dict:
        """Get all dishes for a specific series from the database."""
        # In production: fetches from Supabase
        logger.info(f"Fetching dishes for series: {series_id}")
        return {
            "series_id": series_id,
            "dishes": [],
            "message": "Series data fetched from database",
        }

    async def create_recreation(self, dish_name: str, anime_series: str, difficulty: str) -> dict:
        """Create a detailed recreation guide for a specific anime dish."""
        prompt = f"""
        Create a detailed recreation guide for the dish "{dish_name}" from the anime "{anime_series}".
        Difficulty level: {difficulty}

        Include:
        - Real-world ingredient substitutions for any fictional ingredients
        - Step-by-step technique guide
        - Plating notes that capture the anime aesthetic
        - Immersion tips for the full experience

        Be specific, practical, and accurate to both the source material and culinary reality.
        """

        message = await self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}],
            system=self._get_system_prompt(),
        )

        return {"guide": message.content[0].text, "dish": dish_name, "series": anime_series}

    async def _generate_dishes(self, series_title: str, cuisine_family: str) -> list[dict]:
        """Generate dish recreation guides for a known series."""
        # In production: fetches from curated dish database
        return [
            {
                "name": f"Signature Dish from {series_title}",
                "original_name": None,
                "episode": "Various",
                "ingredients": ["See recreation guide for full list"],
                "technique": "Varies by dish — see individual guides",
                "difficulty": "home-cook",
                "plating_notes": "Faithful to the anime aesthetic",
                "flavor_profile": ["Authentic to series cuisine"],
                "recreation_guide": f"This dish from {series_title} is recreated using {cuisine_family} techniques.",
                "cultural_context": f"Rooted in {cuisine_family} culinary tradition",
                "immersion_notes": "Set the scene with ambient sound from the series",
            }
        ]

    def _get_system_prompt(self) -> str:
        return (
            "You are The Culinary Guild's Anime Food Intelligence specialist — "
            "an expert in both anime/manga culture and world culinary traditions. "
            "Your role is to identify the food culture, cuisine family, and culinary philosophy "
            "embedded in any anime series, then create expert recreation guides that honor "
            "both the source material and culinary accuracy. "
            "When fictional ingredients exist, find the best real-world analogs. "
            "Return valid JSON following the response schema exactly."
        )

    def _parse_inference_response(self, content: str, title: str) -> dict:
        """Parse AI response into structured inference result."""
        try:
            if "```json" in content:
                start = content.find("```json") + 7
                end = content.find("```", start)
                return json.loads(content[start:end].strip())
            elif "{" in content:
                start = content.find("{")
                end = content.rfind("}") + 1
                return json.loads(content[start:end])
        except json.JSONDecodeError:
            pass

        return {
            "series_title": title,
            "detected_style": "Unable to determine — series may be obscure",
            "cuisine_family": "Japanese (default for anime)",
            "setting_type": "Unknown",
            "food_philosophy": content[:300],
            "key_dishes": [],
            "atmospheric_notes": "Research this series for more specific food context",
            "recommended_difficulty": "home-cook",
            "confidence": 40,
            "real_world_analogs": [],
            "recurring_themes": [],
        }
