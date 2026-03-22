"""
Editorial Writing Prompt Templates
James Beard-level culinary writing for The Culinary Guild editorial content.
"""


def build_recipe_editorial_prompt(
    recipe: dict,
    style: str = "feature",
    word_count: int = 400,
) -> str:
    """
    Build a prompt for James Beard-level recipe editorial writing.

    Styles: feature, profile, technique, cultural, seasonal
    """
    style_descriptions = {
        "feature": "A longform feature with full narrative arc — the dish's story, technique, and place in culinary history",
        "profile": "A focused profile of the dish — origin, meaning, and why it matters today",
        "technique": "A technique-forward exploration — explaining the science and craft behind the dish",
        "cultural": "A cultural deep-dive — exploring the human history and community behind this cuisine",
        "seasonal": "A seasonal meditation — why this dish belongs to this moment in the calendar",
    }

    style_desc = style_descriptions.get(style, style_descriptions["feature"])

    return f"""
    Write culinary editorial content for The Culinary Guild at a James Beard Award-winning standard.

    RECIPE SUBJECT: {recipe.get('title', 'Unknown dish')}
    CUISINE: {recipe.get('cuisine', 'Unknown')}
    STYLE: {style} — {style_desc}
    TARGET WORD COUNT: ~{word_count} words

    CULINARY WRITING STANDARDS:
    1. Lead with a specific, evocative sensory detail — not a generic statement
    2. Place the dish in its cultural and historical context immediately
    3. Honor the people who created this dish — never write about "ethnic food" without naming the culture
    4. Technical accuracy is non-negotiable — don't oversimplify technique
    5. Find the human story inside the recipe
    6. Never use clichés: "burst of flavor," "melt in your mouth," "takes me back"
    7. The best food writing makes the reader hungry AND educated
    8. End with something that lingers — a thought, a question, an invitation

    VOICE:
    - Authority without condescension
    - Warmth without sentimentality
    - Precision without sterility
    - Cultural respect without exoticism

    Write the piece now. No preamble, no explanation — just the writing.
    """


def build_spice_editorial_prompt(spice_name: str, region: str, historical_context: str) -> str:
    """
    Build editorial prompt for Spice Codex entries.
    """
    return f"""
    Write a Spice Codex entry for "{spice_name}" from {region}.

    HISTORICAL CONTEXT PROVIDED: {historical_context}

    FORMAT:
    1. Opening paragraph (2-3 sentences): What this spice IS — its essential character
    2. Origin and history (3-4 sentences): Where it comes from and why it matters historically
    3. Flavor anatomy (2-3 sentences): A precise flavor description — technical but evocative
    4. Cultural significance (2-3 sentences): What communities rely on this spice and why
    5. Kitchen guidance (2-3 sentences): How to use it well — specific and actionable

    STANDARDS:
    - Never describe a spice as "exotic" or "mysterious"
    - Name specific cultures, communities, and traditions
    - Distinguish between fresh, dried, ground, and whole forms
    - Include a specific culinary moment where this spice transforms a dish

    Write with the authority of a culinary historian and the clarity of a cooking teacher.
    """


def build_guild_lesson_prompt(
    guild_name: str,
    lesson_title: str,
    technique: str,
    difficulty: str,
) -> str:
    """
    Build prompt for Guild lesson content.
    """
    return f"""
    Write a culinary lesson for the {guild_name} in The Culinary Guild platform.

    LESSON: {lesson_title}
    TECHNIQUE FOCUS: {technique}
    DIFFICULTY: {difficulty}

    LESSON STRUCTURE:
    1. The Why (100 words): Why this technique matters — the culinary science and tradition behind it
    2. The How (200 words): Step-by-step technique with precise language
    3. The When (100 words): When to use this technique and when NOT to
    4. The Mastery Markers (50 words): How to know when you've truly mastered this
    5. The Practice Exercise (100 words): A specific exercise to build the skill

    Write as a master chef teaching a motivated student.
    Technical precision is essential. Enthusiasm is welcome. Condescension is forbidden.
    """


def build_heritage_editorial_prompt(
    cuisine_name: str,
    region: str,
    cultural_context: str,
    key_ingredients: list[str],
) -> str:
    """
    Build editorial prompt for Heritage Table entries.
    """
    ingredients_str = ", ".join(key_ingredients[:5])

    return f"""
    Write a Heritage Table entry for {cuisine_name} cuisine from {region}.

    CULTURAL CONTEXT: {cultural_context}
    KEY INGREDIENTS: {ingredients_str}

    THIS ENTRY MUST:
    1. Open with a specific, concrete moment — a specific meal, a specific person, a specific place
    2. Name the community with specificity and respect — not generalizations about "a people"
    3. Trace at least one ingredient or technique through history
    4. Acknowledge the impact of colonization, migration, or diaspora on this cuisine honestly
    5. Celebrate innovation within tradition — this is a living cuisine, not a museum exhibit
    6. Close with an invitation — a reason for readers from outside this tradition to engage respectfully

    WHAT TO AVOID:
    - "Ancient recipe passed down for generations" (cliché and often inaccurate)
    - Describing poverty as "resourcefulness" without acknowledging the actual history
    - "Authentic" without qualifying what that means and who defines it
    - Treating the cuisine as monolithic rather than regionally diverse

    LENGTH: 350-450 words
    TONE: Academic warmth — knowledgeable, respectful, inviting
    """


def build_trial_narrative_prompt(
    trial_name: str,
    basket_ingredients: list[str],
    difficulty: str,
    backstory: str,
) -> str:
    """
    Build prompt for Kitchen Trial narrative introductions.
    """
    basket_str = ", ".join(basket_ingredients)

    return f"""
    Write the dramatic introduction narrative for Kitchen Trial: {trial_name}

    BASKET: {basket_str}
    DIFFICULTY: {difficulty}
    BACKSTORY: {backstory}

    FORMAT:
    1. Scene-setting (2 sentences): The kitchen, the atmosphere, the stakes
    2. The Reveal (1-2 sentences): The basket ingredients are revealed — make it dramatic
    3. The Challenge (2-3 sentences): What makes this trial specifically difficult and interesting
    4. The Invitation (1 sentence): The call to action that makes the competitor want to cook

    TONE: Iron Chef meets Chopped meets Michelin Guide.
    Dramatic, respectful of the craft, exciting but not campy.
    Every word must make the reader want to immediately start cooking.

    Length: 150-200 words maximum.
    """
