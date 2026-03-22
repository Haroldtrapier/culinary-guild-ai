"""
Recipe Generation Prompt Templates
James Beard-level culinary writing standards applied to AI recipe generation.
"""

from typing import Optional


def build_generation_prompt(
    ingredients: list[str],
    cuisine_style: Optional[str],
    dietary_restrictions: list[str],
    skill_level: str,
    servings: int,
    meal_type: Optional[str],
    extra_context: Optional[str],
) -> str:
    """
    Build a complete recipe generation prompt with culinary standards baked in.
    """
    ingredient_list = "\n".join(f"  - {ing}" for ing in ingredients)
    restrictions = ", ".join(dietary_restrictions) if dietary_restrictions else "None"
    cuisine_note = f"Cuisine style: {cuisine_style}" if cuisine_style else "Cuisine style: Best match for the ingredients"
    meal_note = f"Meal type: {meal_type}" if meal_type else ""
    context_note = f"\nAdditional context: {extra_context}" if extra_context else ""

    skill_descriptions = {
        "apprentice": "simple techniques, common equipment, clear step-by-step guidance",
        "home-cook": "standard home kitchen techniques, intermediate skill",
        "sous-chef": "professional techniques, mise en place discipline, some specialty equipment",
        "head-chef": "advanced restaurant techniques, high precision required",
        "executive-chef": "elite culinary techniques, deep expertise assumed",
        "culinary-legend": "masterclass level, pushing creative and technical limits",
    }
    skill_desc = skill_descriptions.get(skill_level, "intermediate cooking skill")

    return f"""
    Create a complete, restaurant-quality recipe using these primary ingredients:

    AVAILABLE INGREDIENTS:
{ingredient_list}

    SPECIFICATIONS:
    {cuisine_note}
    {meal_note}
    Skill level: {skill_level} ({skill_desc})
    Servings: {servings}
    Dietary restrictions: {restrictions}
    {context_note}

    RECIPE REQUIREMENTS:
    1. The recipe must be cohesive, with all ingredients working in harmony
    2. Include precise measurements for all ingredients
    3. Step-by-step instructions must explain not just WHAT to do, but WHY
    4. Include technique notes — Maillard, emulsification, reduction, etc. where relevant
    5. Suggest 2-3 sauce variations or finishing options
    6. Suggest 2-3 spice additions that would elevate the dish
    7. Include 1-2 drink pairing suggestions
    8. Write with James Beard-level culinary authority and warmth
    9. Cultural notes if the dish has regional heritage
    10. A brief "chef's note" with the most critical success factor

    QUALITY STANDARDS:
    - Every technique must be justified
    - Every seasoning moment must be specified
    - Plating should be described as an intentional composition
    - The dish should be something a professional chef would be proud to serve

    Return as JSON with this exact schema:
    {{
        "title": "Recipe name",
        "description": "2-3 sentence evocative description",
        "cuisine": "Cuisine family",
        "difficulty": "{skill_level}",
        "prep_time": 15,
        "cook_time": 30,
        "servings": {servings},
        "ingredients": [
            {{"name": "ingredient", "amount": "2", "unit": "tbsp", "notes": "optional note", "category": "type"}}
        ],
        "instructions": [
            {{"number": 1, "title": "Step title", "instruction": "Detailed instruction", "technique": "technique name", "tips": ["tip1", "tip2"]}}
        ],
        "flavor_tags": ["tag1", "tag2"],
        "technique_tags": ["technique1", "technique2"],
        "sauce_suggestions": ["suggestion1", "suggestion2"],
        "spice_suggestions": ["suggestion1", "suggestion2"],
        "pairing_suggestions": [
            {{"type": "wine|beer|cocktail|tea|non-alcoholic", "suggestion": "name", "notes": "why it works", "confidence": 90}}
        ],
        "cultural_notes": "Optional cultural context",
        "author_note": "Critical success factor or chef's insight"
    }}
    """


def build_pantry_prompt(
    pantry_items: list[str],
    must_use: list[str],
    avoid: list[str],
    skill_level: str,
    servings: int,
) -> str:
    """
    Build a pantry-first recipe generation prompt.
    """
    pantry_list = "\n".join(f"  - {item}" for item in pantry_items)
    must_use_list = ", ".join(must_use) if must_use else "None specified"
    avoid_list = ", ".join(avoid) if avoid else "None"

    return f"""
    Create a delicious recipe using primarily what's available in this pantry.
    Minimize the need for additional ingredients.

    PANTRY INVENTORY:
{pantry_list}

    MUST USE: {must_use_list}
    AVOID: {avoid_list}
    SKILL LEVEL: {skill_level}
    SERVINGS: {servings}

    CONSTRAINTS:
    1. Use at least 80% pantry items — minimize shopping
    2. If additional ingredients are needed, list them clearly as "shopping needed"
    3. The dish must be cohesive and genuinely delicious, not just resourceful
    4. Highlight the culinary creativity of working with what's available

    Return the same JSON schema as the standard recipe format, plus add:
    "shopping_needed": ["item1", "item2"] (empty array if nothing needed)
    "pantry_items_used": ["item1", "item2"] (from the provided list)
    """


def build_adaptation_prompt(
    original_recipe: dict,
    adaptation_type: str,
    parameters: dict,
) -> str:
    """
    Build a recipe adaptation prompt.

    adaptation_type: "dietary", "cultural", "technique", "seasonal"
    """
    return f"""
    Adapt this recipe with the following changes:

    ORIGINAL RECIPE: {original_recipe.get('title')}
    ADAPTATION TYPE: {adaptation_type}
    PARAMETERS: {parameters}

    Maintain the soul and flavor profile of the original while honoring the adaptation requirements.
    Explain any substitutions and how they affect the final dish.

    Return the adapted recipe in the same JSON format as the original.
    Include a "adaptation_notes" field explaining all changes made and their culinary reasoning.
    """


def build_scaling_context_prompt(
    recipe_title: str,
    original_servings: int,
    target_servings: int,
    special_considerations: Optional[str] = None,
) -> str:
    """
    Build a context prompt for intelligent recipe scaling.
    """
    ratio = target_servings / original_servings
    direction = "up" if ratio > 1 else "down"

    return f"""
    Provide scaling notes for adjusting "{recipe_title}" from {original_servings} to {target_servings} servings (scaling {direction} by {ratio:.1f}x).

    KEY CONSIDERATIONS:
    1. Spices and aromatics: Scale sub-linearly (ratio^0.7) — never do 1:1 on strong spices
    2. Leavening (baking powder, baking soda): Scale sub-linearly
    3. Salt: Taste-based, start with 70% and adjust
    4. Cooking time: May need adjustment for larger quantities
    5. Equipment: Will larger batches require different vessels?
    6. {'Larger batches may lose quality — address this' if ratio > 3 else ''}
    {'7. Scaling down below 1 serving has unique challenges' if target_servings < 1 else ''}

    Provide brief notes on any ingredients that need special attention when scaling.
    """
