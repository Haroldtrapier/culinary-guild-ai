"""
Trials Router — /api/trials
Endpoints: generate, submit, daily, leaderboard
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Optional
import logging
from datetime import datetime, date

from agents.judge_agent import JudgeAgent

logger = logging.getLogger(__name__)
router = APIRouter()


# ==========================================
# Models
# ==========================================

class TrialGenerationRequest(BaseModel):
    difficulty: str = Field("home-cook", description="Difficulty level")
    cuisine_style: Optional[str] = Field(None, description="Preferred cuisine context")
    mode: str = Field("trial", description="Trial mode: trial, campaign, arena, studio, daily")
    basket_size: int = Field(4, ge=2, le=8, description="Number of basket ingredients")
    time_limit: Optional[int] = Field(None, description="Override time limit in minutes")
    theme: Optional[str] = Field(None, description="Optional thematic direction")


class TrialSubmissionRequest(BaseModel):
    trial_id: str
    user_id: Optional[str] = None
    dish_name: str = Field(..., min_length=2, description="Name of the submitted dish")
    description: str = Field(..., min_length=20, description="Description of the dish and approach")
    techniques_used: list[str] = Field(..., description="List of cooking techniques employed")
    plating_notes: Optional[str] = Field(None, description="How the dish was plated")
    completion_time: Optional[int] = Field(None, description="Time taken in minutes")
    ingredients_used_checklist: list[str] = Field(default=[], description="Confirmed basket items used")
    bonus_objective_met: bool = Field(False)


class TrialResult(BaseModel):
    submission_id: str
    trial_id: str
    total_score: int
    categories: list[dict]
    judge_commentary: str
    xp_earned: int
    badges_earned: list[dict]
    suggestions: list[str]
    highlights: list[str]
    percentile: Optional[float] = None


# ==========================================
# Dependency
# ==========================================

def get_judge_agent():
    return JudgeAgent()


# ==========================================
# Endpoints
# ==========================================

@router.post("/generate")
async def generate_trial(request: TrialGenerationRequest):
    """
    Generate a custom Kitchen Trial with mystery basket.

    Creates a complete trial configuration with:
    - Mystery basket ingredients appropriate to difficulty
    - Constraints and scoring focus
    - Bonus objectives
    - Time limit and mode settings
    """
    try:
        # In production: calls AI to generate contextual basket
        trial_templates = {
            "apprentice": {
                "basket": [
                    {"name": "Chicken thighs", "category": "protein", "required": True},
                    {"name": "Cherry tomatoes", "category": "vegetable", "required": True},
                    {"name": "Fresh basil", "category": "misc", "required": True},
                    {"name": "Garlic", "category": "misc", "required": True},
                ],
                "time_limit": 45,
                "scoring_focus": ["Flavor", "Technique", "Constraint Use"],
                "constraints": ["Must use all basket items"],
            },
            "sous-chef": {
                "basket": [
                    {"name": "Duck breast", "category": "protein", "required": True},
                    {"name": "Orange (whole)", "category": "misc", "required": True},
                    {"name": "Fennel", "category": "vegetable", "required": True},
                    {"name": "Green peppercorns", "category": "spice", "required": True},
                ],
                "time_limit": 60,
                "scoring_focus": ["Flavor", "Technique", "Creativity", "Presentation"],
                "constraints": ["Must use entire orange — juice, zest, supremes", "No pre-made sauces"],
            },
        }

        difficulty = request.difficulty
        template = trial_templates.get(difficulty, trial_templates["sous-chef"])

        return {
            "id": f"trial_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "name": f"Generated {difficulty.replace('-', ' ').title()} Trial",
            "type": request.mode,
            "difficulty": difficulty,
            "basket": template["basket"],
            "constraints": template["constraints"],
            "bonus_objective": "Demonstrate a plating technique that enhances the visual story of the dish",
            "scoring_focus": template["scoring_focus"],
            "time_limit_minutes": request.time_limit or template["time_limit"],
            "cuisine_style": request.cuisine_style or "Contemporary",
            "judge_personality": "classical",
        }
    except Exception as e:
        logger.error(f"Trial generation failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Trial generation failed: {str(e)}")


@router.post("/submit", response_model=TrialResult)
async def submit_trial(
    request: TrialSubmissionRequest,
    background_tasks: BackgroundTasks,
    agent: JudgeAgent = Depends(get_judge_agent),
):
    """
    Submit a completed trial for AI judging.

    Evaluates the submission across five scoring categories:
    - Flavor (30 pts): Taste, balance, seasoning
    - Technique (25 pts): Method mastery, precision
    - Creativity (20 pts): Originality, innovation
    - Presentation (15 pts): Visual appeal, plating
    - Constraint Use (10 pts): All basket items used effectively

    Returns full judge commentary and XP calculation.
    """
    try:
        result = await agent.score_submission(
            trial_id=request.trial_id,
            dish_name=request.dish_name,
            description=request.description,
            techniques_used=request.techniques_used,
            plating_notes=request.plating_notes,
            completion_time=request.completion_time,
            ingredients_used=request.ingredients_used_checklist,
            bonus_met=request.bonus_objective_met,
        )

        # Background: save to Supabase, update leaderboard
        if request.user_id:
            background_tasks.add_task(
                save_trial_result,
                user_id=request.user_id,
                result=result,
            )

        return result
    except Exception as e:
        logger.error(f"Trial submission failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Judging failed: {str(e)}")


@router.get("/daily")
async def get_daily_trial():
    """
    Get today's Daily Trial.

    Returns a consistently available trial that resets every 24 hours.
    All users compete on the same basket for global leaderboard ranking.
    """
    today = date.today().isoformat()
    return {
        "id": f"daily_{today}",
        "name": "Root to Stem",
        "type": "daily",
        "difficulty": "home-cook",
        "basket": [
            {"name": "Beets (whole)", "category": "vegetable", "required": True, "notes": "Must use root, stems, and greens"},
            {"name": "Beet Greens", "category": "vegetable", "required": True},
            {"name": "Goat Cheese", "category": "dairy", "required": True},
            {"name": "Walnuts", "category": "misc", "required": True},
        ],
        "constraints": ["Use all basket items", "Zero-waste approach encouraged"],
        "bonus_objective": "Use the entire beet — root, stem, and greens — in one cohesive dish",
        "scoring_focus": ["Flavor", "Technique", "Creativity", "Constraint Use"],
        "time_limit_minutes": 40,
        "cuisine_style": "Contemporary",
        "resets_at": f"{today}T23:59:59Z",
        "participants": 1847,
        "xp_reward": 250,
    }


@router.get("/leaderboard")
async def get_leaderboard(
    trial_id: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
):
    """
    Global or trial-specific leaderboard.

    Returns ranked submissions with scores and user information.
    """
    # In production: fetches from Supabase
    return {
        "trial_id": trial_id or "global",
        "total_entries": 14829,
        "leaderboard": [
            {"rank": 1, "username": "MirepoixMaster", "score": 98, "trial": "Umami Protocol", "completed_at": "2026-03-20T14:22:00Z"},
            {"rank": 2, "username": "FermentedSoul", "score": 96, "trial": "Coastal Memory", "completed_at": "2026-03-20T16:05:00Z"},
            {"rank": 3, "username": "UmamiAlchemist", "score": 94, "trial": "Wok This Way", "completed_at": "2026-03-20T11:48:00Z"},
            {"rank": 4, "username": "SaffronDreams", "score": 92, "trial": "Mystery Pantry", "completed_at": "2026-03-20T19:22:00Z"},
            {"rank": 5, "username": "BrothKeeper", "score": 91, "trial": "Root to Stem", "completed_at": "2026-03-21T08:13:00Z"},
        ],
        "limit": limit,
        "offset": offset,
    }


async def save_trial_result(user_id: str, result: dict):
    """Background task to persist trial result."""
    logger.info(f"Saving trial result for user {user_id}")
    # In production: upsert to Supabase
    pass
