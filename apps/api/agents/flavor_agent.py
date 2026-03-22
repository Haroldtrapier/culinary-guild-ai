"""
Flavor Agent
Ingredient pairing intelligence and flavor balance analysis.
"""

import os
import json
import logging
from typing import Optional
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)

# Pre-computed high-confidence pairings for common ingredients
CURATED_PAIRINGS = {
    "beets": [
        {"ingredient": "Goat cheese", "confidence": 97, "reason": "Earthy sweetness meets acid fat in a timeless combination", "category": "dairy", "cuisine_contexts": ["French", "Contemporary", "Levantine"]},
        {"ingredient": "Orange", "confidence": 94, "reason": "Citrus acid brightens beet's earthiness and complements its sweetness", "category": "fruit", "cuisine_contexts": ["Contemporary", "Scandinavian"]},
        {"ingredient": "Walnuts", "confidence": 92, "reason": "Bitter notes contrast beet sweetness; textural contrast", "category": "nuts", "cuisine_contexts": ["French", "Middle Eastern", "Contemporary"]},
        {"ingredient": "Dill", "confidence": 89, "reason": "Fresh herbal quality lifts the heavy earthiness of roasted beet", "category": "herb", "cuisine_contexts": ["Eastern European", "Scandinavian"]},
        {"ingredient": "Balsamic vinegar", "confidence": 88, "reason": "Sweet-acid complexity mirrors and amplifies beet's own profile", "category": "acid", "cuisine_contexts": ["Italian", "Contemporary"]},
        {"ingredient": "Horseradish", "confidence": 85, "reason": "Sharp heat cuts through sweetness and richness", "category": "spice", "cuisine_contexts": ["Eastern European", "Jewish deli tradition"]},
    ],
    "chocolate": [
        {"ingredient": "Coffee", "confidence": 98, "reason": "Shared roasted bitter compounds create harmonic resonance", "category": "beverage", "cuisine_contexts": ["Universal"]},
        {"ingredient": "Raspberry", "confidence": 95, "reason": "Bright acid and fruit notes contrast heavy richness", "category": "fruit", "cuisine_contexts": ["French pastry", "Contemporary"]},
        {"ingredient": "Sea salt", "confidence": 96, "reason": "Salt enhances sweetness perception and adds textural contrast", "category": "mineral", "cuisine_contexts": ["Universal"]},
        {"ingredient": "Orange", "confidence": 93, "reason": "Classic: citrus oil and cocoa butter are complementary fats", "category": "fruit", "cuisine_contexts": ["European", "Contemporary"]},
        {"ingredient": "Chili", "confidence": 91, "reason": "Heat activates same receptors as theobromine in chocolate", "category": "spice", "cuisine_contexts": ["Mexican", "Contemporary"]},
        {"ingredient": "Cardamom", "confidence": 88, "reason": "Floral, citrus notes elevate chocolate's aromatic complexity", "category": "spice", "cuisine_contexts": ["Middle Eastern", "Indian", "Scandinavian"]},
    ],
    "lamb": [
        {"ingredient": "Rosemary", "confidence": 96, "reason": "Pine-resin compounds mirror lamb's own aromatics — classical marriage", "category": "herb", "cuisine_contexts": ["Mediterranean", "French", "British"]},
        {"ingredient": "Mint", "confidence": 94, "reason": "Fresh brightness cuts through rich fat — British tradition with good reason", "category": "herb", "cuisine_contexts": ["British", "Middle Eastern"]},
        {"ingredient": "Pomegranate", "confidence": 92, "reason": "Middle Eastern tradition — acid and fruit tames gaminess", "category": "fruit", "cuisine_contexts": ["Persian", "Levantine", "Moroccan"]},
        {"ingredient": "Anchovy", "confidence": 82, "reason": "Umami amplifier — invisible but intensifies savory depth", "category": "protein", "cuisine_contexts": ["Mediterranean", "French"]},
    ],
    "miso": [
        {"ingredient": "Butter", "confidence": 97, "reason": "Fat carries miso's complex fermented flavors; richness meets umami", "category": "dairy", "cuisine_contexts": ["Japanese-French fusion", "Contemporary"]},
        {"ingredient": "Honey", "confidence": 93, "reason": "Sweet notes balance fermented saltiness — miso-honey glaze is magical", "category": "sweet", "cuisine_contexts": ["Japanese", "Contemporary"]},
        {"ingredient": "Sesame", "confidence": 91, "reason": "Nutty, slightly bitter notes complement miso's fermented complexity", "category": "seed", "cuisine_contexts": ["Japanese", "Korean"]},
        {"ingredient": "Ginger", "confidence": 89, "reason": "Fresh heat and brightness cut through miso's heavy umami", "category": "spice", "cuisine_contexts": ["Japanese", "Pan-Asian"]},
    ],
}

FLAVOR_FAMILY_MAP = {
    "chocolate": "bitter-sweet",
    "beets": "earthy-sweet",
    "lamb": "fatty-savory",
    "miso": "umami-fermented",
    "lemon": "acid-citrus",
    "garlic": "pungent-savory",
}


class FlavorAgent:
    """
    Flavor pairing intelligence and balance analysis agent.

    Uses a combination of curated pairing databases and AI inference
    to provide confident, reasoned pairing recommendations.
    """

    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = os.getenv("CLAUDE_MODEL", "claude-opus-4-5")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def get_pairings(
        self,
        ingredient: str,
        context: Optional[str] = None,
        limit: int = 8,
        include_reasoning: bool = True,
    ) -> dict:
        """
        Get ingredient pairings with confidence scores and reasoning.

        Checks curated database first, then uses AI for unlisted ingredients.
        """
        normalized = ingredient.lower().strip()

        # Check curated database
        if normalized in CURATED_PAIRINGS:
            pairings = CURATED_PAIRINGS[normalized][:limit]
            return {
                "ingredient": ingredient,
                "pairings": pairings,
                "flavor_family": FLAVOR_FAMILY_MAP.get(normalized, "complex"),
                "dominant_notes": self._infer_dominant_notes(normalized),
                "balance_role": self._infer_balance_role(normalized),
            }

        # AI inference for unlisted ingredient
        prompt = f"""
        You are a flavor science expert. Analyze the ingredient "{ingredient}" and provide:
        1. Its flavor family and dominant notes
        2. Top {limit} pairing ingredients with confidence scores (1-100) and scientific reasoning
        3. Its role in flavor balance (what element does it contribute?)
        {'4. Context: ' + context if context else ''}

        Return as JSON with this structure:
        {{
            "ingredient": "{ingredient}",
            "pairings": [
                {{"ingredient": "name", "confidence": 85, "reason": "...", "category": "type", "cuisine_contexts": ["..."]}},
            ],
            "flavor_family": "category",
            "dominant_notes": ["note1", "note2"],
            "balance_role": "description of what this ingredient contributes"
        }}
        """

        message = await self.client.messages.create(
            model=self.model,
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}],
            system="You are a culinary scientist specializing in flavor pairing theory and food chemistry. Return valid JSON only.",
        )

        content = message.content[0].text
        return self._parse_pairing_response(content, ingredient)

    async def check_balance(
        self,
        dish_description: str,
        ingredients: list[str],
        current_seasonings: Optional[list[str]] = None,
    ) -> dict:
        """
        Analyze flavor balance across the six elements and provide specific suggestions.
        """
        prompt = f"""
        Analyze the flavor balance of this dish:

        Description: {dish_description}
        Ingredients: {', '.join(ingredients)}
        Current seasonings: {', '.join(current_seasonings or ['none specified'])}

        Evaluate each of the six flavor elements:
        - Salt (0-5 scale)
        - Acid (0-5)
        - Fat (0-5)
        - Heat (0-5)
        - Sweet (0-5)
        - Bitter (0-5)

        Provide:
        1. Current balance assessment
        2. What is missing or overdone
        3. Specific ingredient suggestions to correct imbalances
        4. Overall balance score (0-100)

        Return as JSON:
        {{
            "dish": "{dish_description[:50]}",
            "overall_balance": "description",
            "suggestions": ["suggestion1", "suggestion2"],
            "score": 75,
            "components": [
                {{"element": "salt", "level": 3, "sources": ["ingredient"], "notes": "..."}},
            ]
        }}
        """

        message = await self.client.messages.create(
            model=self.model,
            max_tokens=1200,
            messages=[{"role": "user", "content": prompt}],
            system="You are a culinary educator specializing in flavor balance. Return valid JSON only.",
        )

        content = message.content[0].text
        return self._parse_balance_response(content, dish_description)

    def _infer_dominant_notes(self, ingredient: str) -> list[str]:
        notes_map = {
            "beets": ["earthy", "sweet", "mineral"],
            "chocolate": ["bitter", "sweet", "roasted"],
            "lamb": ["gamey", "fatty", "savory"],
            "miso": ["umami", "fermented", "salty", "complex"],
        }
        return notes_map.get(ingredient, ["complex"])

    def _infer_balance_role(self, ingredient: str) -> str:
        role_map = {
            "beets": "Primary flavor — provides earthy sweetness and deep color",
            "chocolate": "Flavor anchor — bitter sweetness that grounds the dish",
            "lamb": "Protein base — rich fat and umami carrier",
            "miso": "Umami amplifier — fermented depth that elevates all surrounding flavors",
        }
        return role_map.get(ingredient, "Contributes complexity to the flavor profile")

    def _parse_pairing_response(self, content: str, ingredient: str) -> dict:
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
            "ingredient": ingredient,
            "pairings": [],
            "flavor_family": "unknown",
            "dominant_notes": [],
            "balance_role": "Unable to determine",
        }

    def _parse_balance_response(self, content: str, dish: str) -> dict:
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
            "dish": dish[:50],
            "overall_balance": "Analysis unavailable",
            "suggestions": ["Taste and adjust seasoning at each stage"],
            "score": 70,
            "components": [],
        }
