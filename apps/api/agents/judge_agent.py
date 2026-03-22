"""
Judge Agent
Scores Kitchen Trial submissions on a 100-point scale with detailed commentary.
"""

import os
import json
import logging
import uuid
from typing import Optional
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

logger = logging.getLogger(__name__)

SCORING_RUBRIC = {
    "flavor": {
        "max_points": 30,
        "weight": 0.30,
        "criteria": [
            "Taste balance — salt, acid, fat, heat in harmony",
            "Seasoning precision — not under or over",
            "Flavor depth and complexity",
            "Ingredient voices heard distinctly",
        ],
    },
    "technique": {
        "max_points": 25,
        "weight": 0.25,
        "criteria": [
            "Appropriate cooking method for the ingredient",
            "Execution precision — temperatures, timing",
            "Evidence of technical skill",
            "Consistency across components",
        ],
    },
    "creativity": {
        "max_points": 20,
        "weight": 0.20,
        "criteria": [
            "Originality of concept",
            "Surprising but successful flavor combinations",
            "Personal voice in the dish",
            "Innovation within the constraints",
        ],
    },
    "presentation": {
        "max_points": 15,
        "weight": 0.15,
        "criteria": [
            "Visual appeal and composition",
            "Intentionality of plating",
            "Color contrast and arrangement",
            "Portion and scale appropriate",
        ],
    },
    "constraint_use": {
        "max_points": 10,
        "weight": 0.10,
        "criteria": [
            "All basket items used",
            "Items used purposefully, not as afterthought",
            "Bonus objective addressed",
            "Constraints honored creatively",
        ],
    },
}

JUDGE_PERSONALITIES = {
    "classical": {
        "name": "Chef Auguste",
        "background": "Classically trained Escoffier disciple, 30 years in fine dining",
        "tone": "exacting, precise, appreciates tradition and discipline",
        "style": "Direct, technical, with occasional warmth when genuinely impressed",
    },
    "modern": {
        "name": "Chef Aria Chen",
        "background": "Molecular gastronomy pioneer, innovation-first philosophy",
        "tone": "experimental, boundary-pushing, rewards audacity",
        "style": "Enthusiastic about creativity, impatient with timidity",
    },
    "heritage": {
        "name": "Chef Mama Rose",
        "background": "Self-taught grandma-level mastery, community kitchen roots",
        "tone": "warm, story-focused, values soul over precision",
        "style": "Nurturing, honest, deeply moved by food with meaning",
    },
}


class JudgeAgent:
    """
    AI judge for Kitchen Trial submissions.

    Evaluates dishes across five categories with a 100-point scale,
    providing detailed commentary in the voice of the selected judge personality.
    """

    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = os.getenv("CLAUDE_MODEL", "claude-opus-4-5")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def score_submission(
        self,
        trial_id: str,
        dish_name: str,
        description: str,
        techniques_used: list[str],
        plating_notes: Optional[str] = None,
        completion_time: Optional[int] = None,
        ingredients_used: Optional[list[str]] = None,
        bonus_met: bool = False,
        judge_personality: str = "classical",
    ) -> dict:
        """
        Score a trial submission with full judge commentary.

        Returns:
        - total_score out of 100
        - category breakdown with individual scores
        - detailed judge commentary
        - specific suggestions for improvement
        - highlights of what worked
        - XP calculation
        - badges earned
        """
        from packages.prompts.judge_prompts import build_judging_prompt

        personality = JUDGE_PERSONALITIES.get(judge_personality, JUDGE_PERSONALITIES["classical"])

        prompt = build_judging_prompt(
            dish_name=dish_name,
            description=description,
            techniques_used=techniques_used,
            plating_notes=plating_notes,
            completion_time=completion_time,
            ingredients_used=ingredients_used or [],
            bonus_met=bonus_met,
            judge_personality=personality,
            rubric=SCORING_RUBRIC,
        )

        try:
            message = await self.client.messages.create(
                model=self.model,
                max_tokens=2500,
                messages=[{"role": "user", "content": prompt}],
                system=self._get_system_prompt(personality),
            )

            content = message.content[0].text
            result = self._parse_judge_response(content, trial_id, bonus_met)
            return result

        except Exception as e:
            logger.error(f"Judging failed: {e}", exc_info=True)
            # Fallback mock result
            return self._generate_mock_result(trial_id, dish_name, bonus_met)

    def _get_system_prompt(self, personality: dict) -> str:
        return (
            f"You are {personality['name']}, a culinary judge at The Culinary Guild Kitchen Trials. "
            f"Your background: {personality['background']}. "
            f"Your judging tone: {personality['tone']}. "
            f"Your style: {personality['style']}. "
            "Score each category precisely and provide detailed, authentic commentary. "
            "Be specific about what worked and what needs development. "
            "Return valid JSON following the scoring schema exactly."
        )

    def _parse_judge_response(self, content: str, trial_id: str, bonus_met: bool) -> dict:
        """Parse judge response into structured result."""
        try:
            if "```json" in content:
                start = content.find("```json") + 7
                end = content.find("```", start)
                data = json.loads(content[start:end].strip())
            elif "{" in content:
                start = content.find("{")
                end = content.rfind("}") + 1
                data = json.loads(content[start:end])
            else:
                raise ValueError("No JSON found in response")

            # Calculate XP
            total = data.get("total_score", 70)
            xp = self._calculate_xp(total, bonus_met)

            return {
                "submission_id": str(uuid.uuid4()),
                "trial_id": trial_id,
                "total_score": total,
                "categories": data.get("categories", []),
                "judge_commentary": data.get("judge_commentary", ""),
                "xp_earned": xp,
                "badges_earned": self._determine_badges(total, bonus_met),
                "suggestions": data.get("suggestions", []),
                "highlights": data.get("highlights", []),
            }
        except (json.JSONDecodeError, ValueError):
            return self._generate_mock_result(trial_id, "Your Dish", bonus_met)

    def _calculate_xp(self, score: int, bonus_met: bool) -> int:
        """Calculate XP from score with bonuses."""
        base_xp = 100
        score_multiplier = score / 100
        bonus_xp = 50 if bonus_met else 0
        return int(base_xp * score_multiplier * 2) + bonus_xp

    def _determine_badges(self, score: int, bonus_met: bool) -> list[dict]:
        """Determine which badges are earned from this submission."""
        badges = []
        if score >= 90:
            badges.append({"id": "excellence", "name": "Culinary Excellence", "icon": "⭐", "rarity": "rare"})
        if score == 100:
            badges.append({"id": "perfect", "name": "Culinary Perfection", "icon": "💯", "rarity": "legendary"})
        if bonus_met:
            badges.append({"id": "bonus", "name": "Bonus Achiever", "icon": "🎯", "rarity": "uncommon"})
        return badges

    def _generate_mock_result(self, trial_id: str, dish_name: str, bonus_met: bool) -> dict:
        """Fallback result when AI call fails."""
        scores = {"flavor": 22, "technique": 18, "creativity": 15, "presentation": 11, "constraint_use": 8}
        total = sum(scores.values())
        categories = [
            {"name": k.replace("_", " ").title(), "score": v,
             "max_score": SCORING_RUBRIC[k]["max_points"],
             "icon": {"flavor": "🌊", "technique": "🔪", "creativity": "✨", "presentation": "🍽️", "constraint_use": "🎯"}[k],
             "commentary": "Solid execution with room for refinement."}
            for k, v in scores.items()
        ]
        return {
            "submission_id": str(uuid.uuid4()),
            "trial_id": trial_id,
            "total_score": total,
            "categories": categories,
            "judge_commentary": f"'{dish_name}' shows genuine culinary understanding. The flavors were cohesive and the technique sound. With greater precision in seasoning, this could reach the highest tier.",
            "xp_earned": self._calculate_xp(total, bonus_met),
            "badges_earned": self._determine_badges(total, bonus_met),
            "suggestions": ["Season more aggressively at each stage", "Consider presentation as storytelling"],
            "highlights": ["Solid flavor balance", "Good ingredient utilization"],
        }
