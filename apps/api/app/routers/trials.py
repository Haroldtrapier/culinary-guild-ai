from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
def generate_trial() -> dict:
    return {
        "title": "Sous Chef Trial",
        "basket": {
            "anchor": "chicken thighs",
            "tension": "blueberries",
            "support": "thyme",
            "wildcard": "chickpeas"
        },
        "time_limit": 35,
        "constraint": "Include a pan sauce"
    }

@router.post("/judge")
def judge_trial() -> dict:
    return {
        "total_score": 84,
        "notes": "Strong flavor balance. Improve starch integration and plating cohesion."
    }
