"""
Anime Inference Prompt Templates
Food style detection for anime series — combining cultural knowledge with culinary expertise.
"""

from typing import Optional


def build_inference_prompt(
    title: str,
    additional_context: Optional[str],
    include_recreation_guides: bool,
) -> str:
    """
    Build a comprehensive anime food style inference prompt.

    This prompt instructs Claude to:
    1. Identify the food culture embedded in the series
    2. Classify the cuisine family
    3. Identify iconic dishes and their real-world analogs
    4. Generate recreation guides with authentic substitutions
    5. Provide immersion notes for atmospheric cooking
    """
    context_note = f"\nAdditional context: {additional_context}" if additional_context else ""
    recreation_instruction = (
        "Include detailed recreation guides for each dish." if include_recreation_guides
        else "Provide basic dish descriptions only."
    )

    return f"""
    Analyze the anime series "{title}" from a culinary perspective.{context_note}

    You are an expert in both anime/manga culture AND world culinary traditions.
    Your task is to identify the food culture authentically embedded in this series.

    ANALYSIS FRAMEWORK:
    1. FOOD STYLE: What type of cooking defines this series? (comfort food, competitive, survival, etc.)
    2. CUISINE FAMILY: What real-world cuisine tradition is this closest to?
    3. SETTING TYPE: What is the culinary setting? (school, restaurant, dungeon, home, etc.)
    4. FOOD PHILOSOPHY: What does food mean to the characters and story?
    5. RECURRING THEMES: What food themes repeat throughout the series?
    6. REAL-WORLD ANALOGS: What existing cuisines or cooking styles parallel the anime?
    7. KEY DISHES: What are the most iconic or memorable food moments? {recreation_instruction}

    RECREATION GUIDE REQUIREMENTS (for each dish):
    - Real ingredient substitutions for any fictional/fantasy ingredients
    - Technique guide faithful to the series' culinary spirit
    - Plating notes that capture the anime aesthetic
    - Difficulty level (apprentice/home-cook/sous-chef/head-chef)
    - Immersion notes: how to recreate the ambiance of eating this dish "in the world"

    AUTHENTICITY STANDARDS:
    - If the series is obscure or you have limited knowledge, be honest about confidence level
    - Don't invent details that contradict the source material
    - Distinguish between definite food appearances and inferred culinary culture
    - For fictional ingredients, find the CLOSEST real-world analog (not just any substitution)

    Return as JSON with this exact structure:
    {{
        "series_title": "{title}",
        "detected_style": "Description of culinary style and philosophy",
        "cuisine_family": "Primary real-world cuisine tradition",
        "setting_type": "Culinary and social setting of food scenes",
        "food_philosophy": "What food means to the story and characters",
        "key_dishes": [
            {{
                "name": "Dish name",
                "original_name": "Japanese/original name if applicable",
                "episode": "Episode reference if known",
                "ingredients": ["ingredient1", "ingredient2"],
                "technique": "Cooking technique description",
                "difficulty": "home-cook",
                "plating_notes": "How the dish is presented in the series and how to recreate it",
                "flavor_profile": ["flavor1", "flavor2"],
                "recreation_guide": "Detailed guide for recreating this dish faithfully",
                "cultural_context": "What this dish represents in the story",
                "immersion_notes": "How to eat this dish in the spirit of the series"
            }}
        ],
        "atmospheric_notes": "Description of the overall culinary ambiance of the series",
        "recommended_difficulty": "overall difficulty level for engaging with this cuisine",
        "confidence": 75,
        "real_world_analogs": ["cuisine1", "cuisine2"],
        "recurring_themes": ["theme1", "theme2"]
    }}

    If you have limited knowledge of this series, still provide your best inference
    based on the title, genre conventions, and any knowledge you have.
    Set confidence accordingly (40-60 for limited knowledge, 80-99 for well-known series).
    """


def build_dish_detail_prompt(
    dish_name: str,
    series_title: str,
    cuisine_family: str,
    difficulty: str,
) -> str:
    """
    Build a detailed dish recreation guide prompt for a specific anime dish.
    """
    return f"""
    Create a detailed, expert recreation guide for "{dish_name}" from "{series_title}".

    Known cuisine family: {cuisine_family}
    Target difficulty: {difficulty}

    GUIDE REQUIREMENTS:
    1. INGREDIENT ANALYSIS: For each ingredient in the dish (fictional or real):
       - Identify the real-world equivalent
       - Explain why this analog is the best match
       - Suggest quantities for 2-4 servings

    2. TECHNIQUE BREAKDOWN:
       - Step-by-step preparation
       - Critical technique moments with explanation
       - Equipment needed (and alternatives)
       - Timing and temperature specifics

    3. PLATING GUIDE:
       - How the dish appears in the anime
       - How to faithfully recreate the visual presentation
       - Garnish and finishing touches

    4. IMMERSION EXPERIENCE:
       - Ambiance recommendations (music, lighting, setting)
       - How to eat it authentically "in the world of the series"
       - Conversation topics or rituals that accompany the meal

    5. DIFFICULTY ADAPTATIONS:
       - Simplified version for beginners
       - Enhanced version for experts

    Write with warmth and enthusiasm for both the culinary craft and the source material.
    Balance accuracy to the anime with practical, achievable recreation.
    """


def build_series_comparison_prompt(
    series_a: str,
    series_b: str,
) -> str:
    """
    Compare food cultures of two anime series for contrast/pairing purposes.
    """
    return f"""
    Compare the food cultures of "{series_a}" and "{series_b}":

    1. Philosophy differences: How do the two series approach food differently?
    2. Cuisine contrasts: Different traditions or overlapping influences?
    3. Crossover dishes: What dishes could bridge both worlds?
    4. Fusion concept: Design one dish that blends both culinary worlds

    Format as a brief analysis with a creative fusion recipe at the end.
    """
