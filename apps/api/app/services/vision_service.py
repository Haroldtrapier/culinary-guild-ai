from app.core.safety import build_safety_message
from app.schemas.vision import VisionIdentifyResponse


def identify_ingredient(image_url: str) -> VisionIdentifyResponse:
    # Placeholder. Replace with vision model call later.
    top_match = "heirloom tomato"
    confidence_score = 0.91
    safety_risk, warning = build_safety_message(top_match, confidence_score)

    return VisionIdentifyResponse(
        top_match=top_match,
        confidence_score=confidence_score,
        is_edible_candidate=True,
        safety_risk=safety_risk,
        warning=warning if safety_risk != "low" else None,
        suggested_next_step="Generate ingredient profile and recipe options."
    )
