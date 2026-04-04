from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
def generate_recipe() -> dict:
    return {
        "title": "Tomato Basil Skillet",
        "mode": "weeknight",
        "notes": "Starter placeholder response."
    }

@router.post("/from-ingredient")
def recipe_from_ingredient() -> dict:
    return {
        "ingredient": "heirloom tomato",
        "recipes": [
            "Rustic tomato salad",
            "Tomato basil pasta",
            "Roasted tomato soup"
        ]
    }
