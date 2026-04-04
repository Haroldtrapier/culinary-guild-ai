HIGH_RISK_TERMS = {
    "unknown wild mushroom",
    "poisonous mushroom",
    "ornamental flower",
    "unknown wild plant",
}


def build_safety_message(match_name: str, confidence_score: float) -> tuple[str, str]:
    normalized = match_name.strip().lower()

    if normalized in HIGH_RISK_TERMS:
        return (
            "high",
            "Do not consume this item. Seek expert confirmation before handling or eating it."
        )

    if confidence_score < 0.75:
        return (
            "medium",
            "Identification confidence is limited. Do not consume this item until verified."
        )

    return (
        "low",
        "No immediate risk flag triggered, but use standard food safety judgment."
    )
