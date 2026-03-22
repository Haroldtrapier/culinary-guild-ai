"""
Orchestrator Agent
Routes incoming requests to appropriate specialist agents based on intent classification.
"""

import logging
from typing import Any, Optional
from enum import Enum

from agents.recipe_agent import RecipeAgent
from agents.anime_agent import AnimeAgent
from agents.judge_agent import JudgeAgent
from agents.flavor_agent import FlavorAgent

logger = logging.getLogger(__name__)


class AgentType(str, Enum):
    RECIPE = "recipe"
    ANIME = "anime"
    JUDGE = "judge"
    FLAVOR = "flavor"
    EDITORIAL = "editorial"
    UNKNOWN = "unknown"


class OrchestrationRequest:
    """Structured request for the orchestrator."""

    def __init__(
        self,
        intent: str,
        payload: dict,
        context: Optional[dict] = None,
        user_id: Optional[str] = None,
    ):
        self.intent = intent
        self.payload = payload
        self.context = context or {}
        self.user_id = user_id


class Orchestrator:
    """
    Central routing agent for The Culinary Guild AI system.

    Routes requests to specialist agents:
    - Recipe Agent: Recipe generation, adaptation, scaling
    - Anime Agent: Food style detection, dish recreation
    - Judge Agent: Kitchen Trial scoring and commentary
    - Flavor Agent: Ingredient pairing and balance analysis
    - Editorial Agent: James Beard-level culinary writing
    """

    def __init__(self):
        self._recipe_agent: Optional[RecipeAgent] = None
        self._anime_agent: Optional[AnimeAgent] = None
        self._judge_agent: Optional[JudgeAgent] = None
        self._flavor_agent: Optional[FlavorAgent] = None

    @property
    def recipe_agent(self) -> RecipeAgent:
        if not self._recipe_agent:
            self._recipe_agent = RecipeAgent()
        return self._recipe_agent

    @property
    def anime_agent(self) -> AnimeAgent:
        if not self._anime_agent:
            self._anime_agent = AnimeAgent()
        return self._anime_agent

    @property
    def judge_agent(self) -> JudgeAgent:
        if not self._judge_agent:
            self._judge_agent = JudgeAgent()
        return self._judge_agent

    @property
    def flavor_agent(self) -> FlavorAgent:
        if not self._flavor_agent:
            self._flavor_agent = FlavorAgent()
        return self._flavor_agent

    def classify_intent(self, raw_request: str) -> AgentType:
        """
        Classify the intent of a natural language request.

        Keyword-based classification for fast routing before LLM call.
        In production, this would use a lightweight classifier model.
        """
        text = raw_request.lower()

        recipe_keywords = ["recipe", "cook", "make", "ingredients", "pantry", "dish", "meal", "how do i"]
        anime_keywords = ["anime", "manga", "series", "episode", "character", "food from", "cooking anime"]
        judge_keywords = ["score", "judge", "evaluate", "review", "critique", "feedback", "rate"]
        flavor_keywords = ["pair", "pairing", "goes with", "balance", "spice", "flavor", "taste"]

        scores = {
            AgentType.RECIPE: sum(1 for kw in recipe_keywords if kw in text),
            AgentType.ANIME: sum(1 for kw in anime_keywords if kw in text),
            AgentType.JUDGE: sum(1 for kw in judge_keywords if kw in text),
            AgentType.FLAVOR: sum(1 for kw in flavor_keywords if kw in text),
        }

        best = max(scores, key=scores.get)  # type: ignore
        return best if scores[best] > 0 else AgentType.UNKNOWN

    async def route(self, request: OrchestrationRequest) -> dict[str, Any]:
        """
        Route a request to the appropriate specialist agent.

        Args:
            request: Structured orchestration request with intent and payload

        Returns:
            Agent response with result and metadata
        """
        intent_map = {
            "generate_recipe": AgentType.RECIPE,
            "from_pantry": AgentType.RECIPE,
            "scale_recipe": AgentType.RECIPE,
            "infer_anime": AgentType.ANIME,
            "get_anime_dishes": AgentType.ANIME,
            "score_trial": AgentType.JUDGE,
            "get_pairings": AgentType.FLAVOR,
            "check_balance": AgentType.FLAVOR,
        }

        agent_type = intent_map.get(request.intent, AgentType.UNKNOWN)
        logger.info(f"Routing request intent='{request.intent}' to agent='{agent_type}'")

        try:
            if agent_type == AgentType.RECIPE:
                return await self._handle_recipe(request)
            elif agent_type == AgentType.ANIME:
                return await self._handle_anime(request)
            elif agent_type == AgentType.JUDGE:
                return await self._handle_judge(request)
            elif agent_type == AgentType.FLAVOR:
                return await self._handle_flavor(request)
            else:
                logger.warning(f"Unknown intent: {request.intent}")
                return {"error": "Unknown intent", "intent": request.intent}
        except Exception as e:
            logger.error(f"Orchestration failed for intent='{request.intent}': {e}", exc_info=True)
            raise

    async def _handle_recipe(self, request: OrchestrationRequest) -> dict:
        payload = request.payload
        if request.intent == "generate_recipe":
            result = await self.recipe_agent.generate_recipe(**payload)
        elif request.intent == "from_pantry":
            result = await self.recipe_agent.generate_from_pantry(**payload)
        elif request.intent == "scale_recipe":
            result = await self.recipe_agent.scale_recipe(**payload)
        else:
            result = await self.recipe_agent.generate_recipe(**payload)
        return {"agent": "recipe", "result": result}

    async def _handle_anime(self, request: OrchestrationRequest) -> dict:
        payload = request.payload
        if request.intent == "infer_anime":
            result = await self.anime_agent.infer_food_style(**payload)
        elif request.intent == "get_anime_dishes":
            result = await self.anime_agent.get_series_dishes(**payload)
        else:
            result = await self.anime_agent.infer_food_style(**payload)
        return {"agent": "anime", "result": result}

    async def _handle_judge(self, request: OrchestrationRequest) -> dict:
        result = await self.judge_agent.score_submission(**request.payload)
        return {"agent": "judge", "result": result}

    async def _handle_flavor(self, request: OrchestrationRequest) -> dict:
        payload = request.payload
        if request.intent == "get_pairings":
            result = await self.flavor_agent.get_pairings(**payload)
        elif request.intent == "check_balance":
            result = await self.flavor_agent.check_balance(**payload)
        else:
            result = await self.flavor_agent.get_pairings(**payload)
        return {"agent": "flavor", "result": result}
