from fastapi import APIRouter

router = APIRouter()

@router.post("/infer-style")
def infer_anime_style() -> dict:
    return {
        "anime": "Naruto",
        "dominant_style": "ramen culture",
        "likely_dishes": ["miso ramen", "rice balls", "yakitori"]
    }

@router.post("/recreate-dish")
def recreate_anime_dish() -> dict:
    return {
        "dish": "ramen-inspired bowl",
        "approach": "inspired recreation",
        "difficulty": "intermediate"
    }
