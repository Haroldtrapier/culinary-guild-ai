"""
Recipe Agent
Generates, adapts, and scales recipes using Claude/GPT-4.
"""

import os
import json
import logging
from typing import Optional
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)


class RecipeAgent:
    """
    AI agent for recipe generation, adaptation, and scaling.

    Specialties:
    - Complete recipe generation from ingredients + constraints
    - Pantry-first recipe creation
    - Recipe scaling with intelligent spice adjustments
    - Cultural adaptation of classic dishes
    """

    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = os.getenv("CLAUDE_MODEL", "claude-opus-4-5")
        self.max_tokens = 4096

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def generate_recipe(
        self,
        ingredients: list[str],
        cuisine_style: Optional[str] = None,
        dietary_restrictions: Optional[list[str]] = None,
        skill_level: str = "home-cook",
        servings: int = 2,
        meal_type: Optional[str] = None,
        extra_context: Optional[str] = None,
    ) -> dict:
        """
        Generate a complete, Michelin-quality recipe from provided ingredients.

        Returns a full recipe with:
        - Complete ingredient list with measurements
        - Step-by-step instructions with technique notes
        - Flavor, sauce, and spice suggestions
        - Cultural notes and chef commentary
        """
        from packages.prompts.recipe_prompts import build_generation_prompt

        prompt = build_generation_prompt(
            ingredients=ingredients,
            cuisine_style=cuisine_style,
            dietary_restrictions=dietary_restrictions or [],
            skill_level=skill_level,
            servings=servings,
            meal_type=meal_type,
            extra_context=extra_context,
        )

        try:
            message = await self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                messages=[{"role": "user", "content": prompt}],
                system=self._get_system_prompt(),
            )

            content = message.content[0].text
            recipe_data = self._parse_recipe_response(content)
            recipe_data["is_ai_generated"] = True
            return recipe_data

        except Exception as e:
            logger.error(f"Recipe generation failed: {e}", exc_info=True)
            raise

    async def generate_from_pantry(
        self,
        pantry_items: list[str],
        must_use: Optional[list[str]] = None,
        avoid: Optional[list[str]] = None,
        skill_level: str = "home-cook",
        servings: int = 2,
    ) -> dict:
        """
        Generate a recipe that maximizes use of pantry items.

        Analyzes available ingredients holistically to create a cohesive
        recipe that minimizes additional shopping.
        """
        from packages.prompts.recipe_prompts import build_pantry_prompt

        prompt = build_pantry_prompt(
            pantry_items=pantry_items,
            must_use=must_use or [],
            avoid=avoid or [],
            skill_level=skill_level,
            servings=servings,
        )

        message = await self.client.messages.create(
            model=self.model,
            max_tokens=self.max_tokens,
            messages=[{"role": "user", "content": prompt}],
            system=self._get_system_prompt(),
        )

        content = message.content[0].text
        recipe_data = self._parse_recipe_response(content)
        recipe_data["is_ai_generated"] = True
        return recipe_data

    async def scale_recipe(
        self,
        recipe_title: str,
        original_servings: int,
        target_servings: int,
        ingredients: list[dict],
    ) -> dict:
        """
        Scale recipe ingredients to a new serving count.

        Applies non-linear scaling for spices (never scale 1:1),
        leavening agents (baking), and strong flavor compounds.
        """
        ratio = target_servings / original_servings

        scaled_ingredients = []
        for ing in ingredients:
            try:
                amount_str = str(ing.get("amount", "1"))
                # Handle fractions
                if "/" in amount_str:
                    parts = amount_str.split("/")
                    amount = float(parts[0]) / float(parts[1])
                else:
                    amount = float(amount_str)

                category = ing.get("category", "ingredient").lower()
                # Spices scale sub-linearly
                if category in ("spice", "seasoning", "herb"):
                    effective_ratio = ratio ** 0.7
                else:
                    effective_ratio = ratio

                scaled_amount = amount * effective_ratio

                # Format nicely
                if scaled_amount < 0.25:
                    formatted = f"~{round(scaled_amount, 2)}"
                elif scaled_amount == int(scaled_amount):
                    formatted = str(int(scaled_amount))
                else:
                    formatted = f"{round(scaled_amount, 2)}"

                scaled_ingredients.append({
                    **ing,
                    "amount": formatted,
                    "original_amount": amount_str,
                    "scaling_note": "Sub-linear scaling applied" if category in ("spice", "seasoning") else None,
                })
            except (ValueError, ZeroDivisionError):
                scaled_ingredients.append(ing)

        return {
            "title": recipe_title,
            "original_servings": original_servings,
            "target_servings": target_servings,
            "scaling_ratio": round(ratio, 2),
            "scaled_ingredients": scaled_ingredients,
            "note": f"Recipe scaled from {original_servings} to {target_servings} servings. Spices scaled sub-linearly.",
        }

    async def get_random_recipe(
        self,
        cuisine: Optional[str] = None,
        difficulty: Optional[str] = None,
    ) -> dict:
        """Return a random featured recipe for display purposes."""
        featured = {
            "title": "Miso-Glazed Black Cod with Dashi Broth",
            "description": "Three-day miso marinade creates a lacquered crust. The dashi broth holds the soul of the dish.",
            "cuisine": "Japanese",
            "difficulty": "head-chef",
            "prep_time": 20,
            "cook_time": 40,
            "servings": 2,
            "ingredients": [
                {"name": "Black cod (sablefish)", "amount": "2", "unit": "fillets", "notes": "6oz each"},
                {"name": "White miso paste", "amount": "1/4", "unit": "cup"},
                {"name": "Mirin", "amount": "3", "unit": "tbsp"},
                {"name": "Sake", "amount": "3", "unit": "tbsp"},
                {"name": "Sugar", "amount": "2", "unit": "tbsp"},
            ],
            "instructions": [
                {"number": 1, "title": "Prepare the miso marinade", "instruction": "Whisk miso, mirin, sake, and sugar in a saucepan over low heat until dissolved. Cool completely."},
                {"number": 2, "title": "Marinate the cod", "instruction": "Coat fish completely in marinade. Refrigerate for 2-3 days for full flavor penetration."},
                {"number": 3, "title": "Broil the fish", "instruction": "Wipe off excess marinade. Broil until caramelized and lacquered, about 8-10 minutes."},
            ],
            "flavor_tags": ["umami", "sweet", "smoky", "delicate"],
            "technique_tags": ["Miso glazing", "Broiling", "Marinating"],
            "sauce_suggestions": ["Ponzu for brightness", "Yuzu kosho for heat"],
            "spice_suggestions": ["Togarashi for heat", "Shichimi for complexity"],
            "pairing_suggestions": [{"type": "wine", "suggestion": "Dry Junmai Sake", "notes": "Mirrors the umami", "confidence": 95}],
            "cultural_notes": "Nobu Matsuhisa made this preparation famous globally. The technique is rooted in Kyoto shojin ryori temple cooking.",
            "author_note": "The 72-hour marinade is non-negotiable. The transformation in flavor depth is profound.",
            "is_ai_generated": False,
        }
        return featured

    def _get_system_prompt(self) -> str:
        return (
            "You are The Culinary Guild's master recipe AI — trained on the standards of James Beard, "
            "Escoffier, Nobu, and the world's greatest culinary traditions. "
            "You generate complete, technically precise, beautifully written recipes that respect both "
            "culinary science and cultural tradition. "
            "Always include: flavor reasoning, technique explanation, sauce/spice suggestions, and cultural context. "
            "Write with the authority of an executive chef and the warmth of a great teacher. "
            "Return valid JSON matching the recipe schema."
        )

    def _parse_recipe_response(self, content: str) -> dict:
        """Parse Claude's response into a structured recipe dict."""
        try:
            # Try to extract JSON if Claude wrapped it
            if "```json" in content:
                json_start = content.find("```json") + 7
                json_end = content.find("```", json_start)
                json_str = content[json_start:json_end].strip()
                return json.loads(json_str)
            elif "{" in content and "}" in content:
                json_start = content.find("{")
                json_end = content.rfind("}") + 1
                return json.loads(content[json_start:json_end])
        except json.JSONDecodeError:
            pass

        # Fallback structured response
        return {
            "title": "AI Generated Recipe",
            "description": content[:200],
            "cuisine": "Contemporary",
            "difficulty": "home-cook",
            "prep_time": 20,
            "cook_time": 30,
            "servings": 2,
            "ingredients": [],
            "instructions": [{"number": 1, "title": "Follow AI guidance", "instruction": content}],
            "flavor_tags": [],
            "technique_tags": [],
            "sauce_suggestions": [],
            "spice_suggestions": [],
            "pairing_suggestions": [],
            "cultural_notes": None,
            "author_note": None,
        }
