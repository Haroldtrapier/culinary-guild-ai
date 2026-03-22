"""
Flavor Router — /api/flavor
Endpoints: pair, balance-check, spices
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
import logging

from agents.flavor_agent import FlavorAgent

logger = logging.getLogger(__name__)
router = APIRouter()


# ==========================================
# Models
# ==========================================

class FlavorPairRequest(BaseModel):
    ingredient: str = Field(..., description="Main ingredient to find pairings for")
    context: Optional[str] = Field(None, description="Culinary context (cuisine, dish type, etc.)")
    limit: int = Field(8, ge=1, le=20, description="Number of pairings to return")
    include_reasoning: bool = Field(True, description="Include scientific reasoning for each pairing")


class BalanceCheckRequest(BaseModel):
    dish_description: str = Field(..., description="Description of the dish and its components")
    ingredients: list[str] = Field(..., description="List of ingredients in the dish")
    current_seasonings: list[str] = Field(default=[], description="Current seasonings applied")


class SpiceSearchRequest(BaseModel):
    query: str = Field(..., description="Search query (spice name, flavor, region, etc.)")
    region: Optional[str] = Field(None, description="Filter by region")
    flavor_profile: Optional[str] = Field(None, description="Filter by flavor note")
    limit: int = Field(10, ge=1, le=50)


class PairingResult(BaseModel):
    ingredient: str
    confidence: int
    reason: str
    category: str
    cuisine_contexts: list[str]


class FlavorPairingResponse(BaseModel):
    ingredient: str
    pairings: list[PairingResult]
    flavor_family: str
    dominant_notes: list[str]
    balance_role: str


class FlavorBalance(BaseModel):
    dish: str
    overall_balance: str
    suggestions: list[str]
    score: int
    components: list[dict]


# ==========================================
# Dependency
# ==========================================

def get_flavor_agent():
    return FlavorAgent()


# ==========================================
# Endpoints
# ==========================================

@router.post("/pair", response_model=FlavorPairingResponse)
async def get_flavor_pairings(
    request: FlavorPairRequest,
    agent: FlavorAgent = Depends(get_flavor_agent),
):
    """
    Get intelligent ingredient pairings with confidence scores.

    Returns top pairings based on:
    - Flavor compound compatibility
    - Classical culinary tradition
    - Cultural context appropriateness
    - Textural and temperature considerations

    Each pairing includes a confidence score and scientific reasoning.
    """
    try:
        result = await agent.get_pairings(
            ingredient=request.ingredient,
            context=request.context,
            limit=request.limit,
            include_reasoning=request.include_reasoning,
        )
        return result
    except Exception as e:
        logger.error(f"Flavor pairing failed for '{request.ingredient}': {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Flavor pairing failed: {str(e)}")


@router.post("/balance-check", response_model=FlavorBalance)
async def check_flavor_balance(
    request: BalanceCheckRequest,
    agent: FlavorAgent = Depends(get_flavor_agent),
):
    """
    Check the flavor balance of a dish or recipe.

    Analyzes the six flavor elements (salt, acid, fat, heat, sweet, bitter)
    and provides specific suggestions to improve overall harmony.
    """
    try:
        result = await agent.check_balance(
            dish_description=request.dish_description,
            ingredients=request.ingredients,
            current_seasonings=request.current_seasonings,
        )
        return result
    except Exception as e:
        logger.error(f"Balance check failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Balance check failed: {str(e)}")


@router.get("/spices")
async def get_spices(
    region: Optional[str] = None,
    flavor_note: Optional[str] = None,
    intensity_min: Optional[int] = None,
    limit: int = 20,
    offset: int = 0,
):
    """
    Browse the Spice Codex encyclopedia.

    Returns spices with optional filtering by region, flavor profile, and intensity.
    """
    # In production: fetches from Supabase
    sample_spices = [
        {"id": "sumac", "name": "Sumac", "origin": "Middle East", "region": "Levant", "flavor_profile": ["tangy", "citrus", "tart"], "intensity": 3},
        {"id": "ras-el-hanout", "name": "Ras el Hanout", "origin": "Morocco", "region": "North Africa", "flavor_profile": ["complex", "warm", "floral"], "intensity": 4},
        {"id": "berbere", "name": "Berbere", "origin": "Ethiopia", "region": "East Africa", "flavor_profile": ["fiery", "earthy", "aromatic"], "intensity": 5},
        {"id": "garam-masala", "name": "Garam Masala", "origin": "Northern India", "region": "South Asia", "flavor_profile": ["warm", "complex", "earthy"], "intensity": 3},
        {"id": "szechuan-pepper", "name": "Szechuan Pepper", "origin": "Sichuan, China", "region": "East Asia", "flavor_profile": ["numbing", "citrus", "floral"], "intensity": 4},
        {"id": "saffron", "name": "Saffron", "origin": "Iran / Kashmir", "region": "Middle East", "flavor_profile": ["floral", "honey", "metallic"], "intensity": 3},
    ]

    filtered = sample_spices
    if region:
        filtered = [s for s in filtered if region.lower() in s["region"].lower()]
    if flavor_note:
        filtered = [s for s in filtered if any(flavor_note.lower() in f for f in s["flavor_profile"])]
    if intensity_min:
        filtered = [s for s in filtered if s["intensity"] >= intensity_min]

    return {
        "spices": filtered[offset:offset + limit],
        "total": len(filtered),
        "limit": limit,
        "offset": offset,
    }


@router.get("/spices/{spice_id}")
async def get_spice_detail(spice_id: str):
    """Get full detail for a specific spice including pairings and history."""
    # In production: fetch from Supabase
    return {
        "id": spice_id,
        "name": "Sumac",
        "origin": "Middle East",
        "region": "Levant",
        "flavor_profile": ["tangy", "citrus", "tart"],
        "intensity": 3,
        "best_uses": ["Sprinkled on salads", "Za'atar blend", "Meat rub", "Hummus"],
        "cuisine_families": ["Levantine", "Turkish", "Persian"],
        "historical_notes": "Used since ancient times in the Fertile Crescent as a souring agent before lemons arrived.",
        "preparation_tips": "Best added at the end of cooking or as a finishing touch.",
        "pairing_suggestions": ["Chicken", "Lamb", "Yogurt", "Pomegranate", "Walnuts"],
    }


@router.get("/flavor-families")
async def get_flavor_families():
    """Get the complete flavor family taxonomy."""
    return {
        "families": [
            {"id": "sweet", "label": "Sweet", "sources": ["Sugar", "Honey", "Mirin", "Dates"], "role": "Balances acid and heat"},
            {"id": "acid", "label": "Acid", "sources": ["Lemon", "Vinegar", "Tamarind", "Wine"], "role": "Brightens and lifts all flavors"},
            {"id": "salt", "label": "Salt", "sources": ["Salt", "Soy sauce", "Fish sauce", "Miso"], "role": "Enhances all other flavors"},
            {"id": "bitter", "label": "Bitter", "sources": ["Coffee", "Dark greens", "Char", "Radicchio"], "role": "Adds complexity and grounds"},
            {"id": "umami", "label": "Umami", "sources": ["Parmesan", "Mushrooms", "Soy", "Miso", "Anchovy"], "role": "Savory depth and finish"},
            {"id": "fat", "label": "Fat", "sources": ["Butter", "Olive oil", "Cream", "Avocado"], "role": "Carries flavor, adds richness"},
            {"id": "heat", "label": "Heat", "sources": ["Chili", "Pepper", "Ginger", "Horseradish"], "role": "Activates palate, adds energy"},
        ]
    }
