def generate_recipe(ingredient: str | None = None) -> dict:
    return {
        "title": "Tomato Basil Skillet",
        "mode": "weeknight",
        "notes": "Starter placeholder response.",
    }


def recipes_from_ingredient(ingredient: str) -> dict:
    return {
        "ingredient": ingredient,
        "recipes": [
            "Rustic tomato salad",
            "Tomato basil pasta",
            "Roasted tomato soup",
        ],
    }
