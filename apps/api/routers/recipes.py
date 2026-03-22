"""
Recipe Router — /api/recipes
Endpoints: generate, random, from-pantry
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
import logging

from agents.recipe_agent import RecipeAgent
from agents.orchestrator import Orchestrator

logger = logging.getLogger(__name__)
router = APIRouter()


# ==========================================
# Request / Response Models
# ==========================================

class RecipeGenerationRequest(BaseModel):
    ingredients: list[str] = Field(..., min_length=1, description="List of available ingredients")
    cuisine_style: Optional[str] = Field(None, description="Desired cuisine style (e.g., 'Japanese', 'Italian')")
    dietary_restrictions: list[str] = Field(default=[], description="Dietary restrictions to observe")
    skill_level: str = Field("home-cook", description="Difficulty level")
    servings: int = Field(2, ge=1, le=20, description="Number of servings")
    meal_type: Optional[str] = Field(None, description="Meal type (breakfast, lunch, dinner, etc.)")
    extra_context: Optional[str] = Field(None, description="Any additional instructions or context")


class PantryRecipeRequest(BaseModel):
    pantry_items: list[str] = Field(..., description="Items available in pantry/fridge")
    must_use: list[str] = Field(default=[], description="Ingredients that must be used")
    avoid: list[str] = Field(default=[], description="Ingredients to avoid")
    skill_level: str = Field("home-cook")
    servings: int = Field(2, ge=1, le=20)


class RecipeScaleRequest(BaseModel):
    recipe_title: str
    original_servings: int
    target_servings: int
    ingredients: list[dict]


class RecipeResponse(BaseModel):
    title: str
    description: str
    cuisine: str
    difficulty: str
    prep_time: int
    cook_time: int
    servings: int
    ingredients: list[dict]
    instructions: list[dict]
    flavor_tags: list[str]
    technique_tags: list[str]
    sauce_suggestions: list[str]
    spice_suggestions: list[str]
    pairing_suggestions: list[dict]
    cultural_notes: Optional[str]
    author_note: Optional[str]
    is_ai_generated: bool = True


# ==========================================
# Dependency
# ==========================================

def get_recipe_agent():
    return RecipeAgent()


# ==========================================
# Endpoints
# ==========================================

@router.post("/generate", response_model=RecipeResponse)
async def generate_recipe(
    request: RecipeGenerationRequest,
    agent: RecipeAgent = Depends(get_recipe_agent),
):
    """
    Generate a complete recipe from provided ingredients and constraints.

    Uses the Recipe Agent to create a full recipe with:
    - Complete ingredient list with measurements
    - Step-by-step instructions with technique guidance
    - Sauce, spice, and drink pairing suggestions
    - Cultural notes and chef commentary
    """
    try:
        recipe = await agent.generate_recipe(
            ingredients=request.ingredients,
            cuisine_style=request.cuisine_style,
            dietary_restrictions=request.dietary_restrictions,
            skill_level=request.skill_level,
            servings=request.servings,
            meal_type=request.meal_type,
            extra_context=request.extra_context,
        )
        return recipe
    except Exception as e:
        logger.error(f"Recipe generation failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Recipe generation failed: {str(e)}")


@router.post("/from-pantry", response_model=RecipeResponse)
async def recipe_from_pantry(
    request: PantryRecipeRequest,
    agent: RecipeAgent = Depends(get_recipe_agent),
):
    """
    Generate a recipe using pantry items, minimizing additional shopping.

    Analyzes available ingredients and creates a cohesive recipe that
    uses what you have, suggesting minimal additions.
    """
    try:
        recipe = await agent.generate_from_pantry(
            pantry_items=request.pantry_items,
            must_use=request.must_use,
            avoid=request.avoid,
            skill_level=request.skill_level,
            servings=request.servings,
        )
        return recipe
    except Exception as e:
        logger.error(f"Pantry recipe generation failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Pantry recipe generation failed: {str(e)}")


@router.get("/random")
async def get_random_recipe(
    cuisine: Optional[str] = None,
    difficulty: Optional[str] = None,
    agent: RecipeAgent = Depends(get_recipe_agent),
):
    """
    Get a random featured recipe, optionally filtered by cuisine or difficulty.

    Returns a complete recipe showcasing a seasonal or staff-featured dish.
    """
    try:
        recipe = await agent.get_random_recipe(cuisine=cuisine, difficulty=difficulty)
        return recipe
    except Exception as e:
        logger.error(f"Random recipe failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to get random recipe: {str(e)}")


@router.post("/scale")
async def scale_recipe(
    request: RecipeScaleRequest,
    agent: RecipeAgent = Depends(get_recipe_agent),
):
    """
    Scale a recipe's ingredient quantities to a different serving count.

    Handles non-linear scaling for spices and seasonings intelligently.
    """
    try:
        scaled = await agent.scale_recipe(
            recipe_title=request.recipe_title,
            original_servings=request.original_servings,
            target_servings=request.target_servings,
            ingredients=request.ingredients,
        )
        return scaled
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recipe scaling failed: {str(e)}")


@router.get("/featured")
async def get_featured_recipes(limit: int = 6):
    """
    Get featured recipes for the homepage and dashboard.

    Returns editor-curated and AI-highlighted recipes.
    """
    # In production, fetches from Supabase
    featured = [
        {
            "id": "miso-glazed-cod",
            "title": "Miso-Glazed Black Cod with Dashi Broth",
            "cuisine": "Japanese",
            "difficulty": "head-chef",
            "prep_time": 20,
            "cook_time": 40,
            "flavor_tags": ["umami", "sweet", "smoky", "delicate"],
            "description": "Three-day miso marinade, lacquered under the broiler, served over a dashi broth that holds the soul of the dish.",
        },
        {
            "id": "lamb-tagine",
            "title": "Slow-Braised Lamb Tagine with Ras el Hanout",
            "cuisine": "Moroccan",
            "difficulty": "sous-chef",
            "prep_time": 30,
            "cook_time": 180,
            "flavor_tags": ["warm", "complex", "fragrant", "rich"],
            "description": "A 3-hour braise transforms lamb shoulder into something that falls apart with intention. Twenty-seven spices in the ras el hanout do the heavy lifting.",
        },
        {
            "id": "gullah-red-rice",
            "title": "Gullah Red Rice with Andouille and Herbs",
            "cuisine": "Gullah Geechee",
            "difficulty": "home-cook",
            "prep_time": 15,
            "cook_time": 45,
            "flavor_tags": ["smoky", "savory", "herbal", "warm"],
            "description": "The Lowcountry's most beloved one-pot — tomatoes, andouille, and Carolina Gold rice cooked until each grain is deeply flavored.",
        },
    ]
    return {"recipes": featured[:limit]}
