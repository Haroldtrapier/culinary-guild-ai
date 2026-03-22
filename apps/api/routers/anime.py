"""
Anime Router — /api/anime
Endpoints: infer (food style detection), series list
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
import logging

from agents.anime_agent import AnimeAgent

logger = logging.getLogger(__name__)
router = APIRouter()


# ==========================================
# Models
# ==========================================

class AnimeInferenceRequest(BaseModel):
    title: str = Field(..., min_length=1, description="Anime series title")
    additional_context: Optional[str] = Field(None, description="Optional context (specific episode, arc, etc.)")
    include_recreation_guides: bool = Field(True, description="Include dish recreation guides")


class DishResult(BaseModel):
    name: str
    original_name: Optional[str]
    episode: Optional[str]
    ingredients: list[str]
    technique: str
    difficulty: str
    plating_notes: str
    flavor_profile: list[str]
    recreation_guide: str
    cultural_context: Optional[str]
    immersion_notes: Optional[str]


class AnimeInferenceResult(BaseModel):
    series_title: str
    detected_style: str
    cuisine_family: str
    setting_type: str
    food_philosophy: str
    key_dishes: list[DishResult]
    atmospheric_notes: str
    recommended_difficulty: str
    confidence: int
    real_world_analogs: list[str]
    recurring_themes: list[str]


# ==========================================
# Dependency
# ==========================================

def get_anime_agent():
    return AnimeAgent()


# ==========================================
# Endpoints
# ==========================================

@router.post("/infer", response_model=AnimeInferenceResult)
async def infer_anime_food_style(
    request: AnimeInferenceRequest,
    agent: AnimeAgent = Depends(get_anime_agent),
):
    """
    Detect the food style and cuisine family of an anime series.

    Uses AI inference to identify:
    - Food style and culinary philosophy of the series
    - Cuisine family (Japanese, fantasy medieval, etc.)
    - Setting type (school, restaurant, dungeon, etc.)
    - Key iconic dishes with recreation guides
    - Atmospheric notes for immersion cooking

    Works on any anime — either from our curated database of 25+ series
    or via AI inference for any title you provide.
    """
    try:
        result = await agent.infer_food_style(
            title=request.title,
            additional_context=request.additional_context,
            include_recreation_guides=request.include_recreation_guides,
        )
        return result
    except Exception as e:
        logger.error(f"Anime inference failed for '{request.title}': {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Anime food style inference failed: {str(e)}"
        )


@router.get("/series")
async def get_all_series(
    cuisine_family: Optional[str] = None,
    setting_type: Optional[str] = None,
    limit: int = 25,
    offset: int = 0,
):
    """
    Get all anime series in the Culinary Guild database.

    Returns our curated collection of 25+ anime series with food profiles.
    """
    series = [
        {"id": "food-wars", "title": "Food Wars! Shokugeki no Soma", "food_style": "Elite culinary competition", "cuisine_family": "Japanese fusion", "member_count": 8420},
        {"id": "naruto", "title": "Naruto / Boruto", "food_style": "Village comfort food", "cuisine_family": "Japanese home cooking", "member_count": 11200},
        {"id": "one-piece", "title": "One Piece", "food_style": "Maritime adventure cuisine", "cuisine_family": "Multi-regional seafood", "member_count": 7830},
        {"id": "spirited-away", "title": "Spirited Away", "food_style": "Spirit world banquet", "cuisine_family": "Japanese traditional", "member_count": 5890},
        {"id": "howls-castle", "title": "Howl's Moving Castle", "food_style": "European hearth cooking", "cuisine_family": "Central European", "member_count": 4320},
        {"id": "delicious-dungeon", "title": "Delicious in Dungeon", "food_style": "Monster ingredient cookery", "cuisine_family": "Fantasy medieval", "member_count": 6103},
        {"id": "restaurant-another-world", "title": "Restaurant to Another World", "food_style": "Japanese-Western yoshoku", "cuisine_family": "Japanese-style Western", "member_count": 3540},
        {"id": "sweetness-lightning", "title": "Sweetness & Lightning", "food_style": "Japanese home cooking", "cuisine_family": "Japanese home", "member_count": 2890},
        {"id": "toriko", "title": "Toriko", "food_style": "Hyperbolic gourmet hunting", "cuisine_family": "Fantasy gourmet", "member_count": 2140},
        {"id": "yakitate-japan", "title": "Yakitate!! Japan", "food_style": "Competitive bread baking", "cuisine_family": "Artisan baking", "member_count": 1980},
        {"id": "yumeiro-patissiere", "title": "Yumeiro Pâtissière", "food_style": "French pastry school", "cuisine_family": "French pastry", "member_count": 1740},
        {"id": "isekai-izakaya", "title": "Isekai Izakaya", "food_style": "Japanese izakaya classics", "cuisine_family": "Japanese izakaya", "member_count": 2310},
        {"id": "laid-back-camp", "title": "Laid-Back Camp", "food_style": "Campfire outdoor cooking", "cuisine_family": "Japanese camping", "member_count": 3210},
        {"id": "kiki-delivery", "title": "Kiki's Delivery Service", "food_style": "Southern European bakery", "cuisine_family": "Mediterranean baking", "member_count": 4190},
    ]

    if cuisine_family:
        series = [s for s in series if cuisine_family.lower() in s["cuisine_family"].lower()]
    if setting_type:
        series = [s for s in series if setting_type.lower() in s["food_style"].lower()]

    return {
        "series": series[offset:offset + limit],
        "total": len(series),
        "limit": limit,
        "offset": offset,
    }


@router.get("/series/{series_id}")
async def get_series_detail(
    series_id: str,
    agent: AnimeAgent = Depends(get_anime_agent),
):
    """
    Get full detail for a specific anime series, including all dishes.
    """
    try:
        detail = await agent.get_series_dishes(series_id=series_id)
        return detail
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Series '{series_id}' not found")
