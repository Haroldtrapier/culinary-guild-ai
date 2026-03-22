"""
Challenge Judging Prompt Templates
Scoring rubrics and judge personality frameworks for Kitchen Trial evaluation.
"""

from typing import Optional


def build_judging_prompt(
    dish_name: str,
    description: str,
    techniques_used: list[str],
    plating_notes: Optional[str],
    completion_time: Optional[int],
    ingredients_used: list[str],
    bonus_met: bool,
    judge_personality: dict,
    rubric: dict,
) -> str:
    """
    Build a comprehensive judging prompt for Kitchen Trial evaluation.

    The judge evaluates across five categories with specific rubrics
    and provides commentary in their distinctive voice.
    """
    techniques_str = ", ".join(techniques_used) if techniques_used else "Not specified"
    ingredients_str = ", ".join(ingredients_used) if ingredients_used else "Not confirmed"
    plating_str = plating_notes or "Not described"
    time_str = f"{completion_time} minutes" if completion_time else "Not recorded"
    bonus_str = "Yes — competitor fulfilled the bonus challenge" if bonus_met else "No — bonus challenge not met or not attempted"

    rubric_text = "\n".join([
        f"  - {category.replace('_', ' ').title()} ({info['max_points']} pts): {', '.join(info['criteria'][:2])}"
        for category, info in rubric.items()
    ])

    return f"""
    You are judging a Kitchen Trial submission for The Culinary Guild.

    JUDGE IDENTITY:
    Name: {judge_personality['name']}
    Background: {judge_personality['background']}
    Judging philosophy: {judge_personality['tone']}

    SUBMISSION DETAILS:
    Dish Name: {dish_name}
    Description: {description}
    Techniques Used: {techniques_str}
    Plating: {plating_str}
    Completion Time: {time_str}
    Basket Ingredients Confirmed Used: {ingredients_str}
    Bonus Objective Met: {bonus_str}

    SCORING RUBRIC (100 points total):
{rubric_text}

    JUDGING INSTRUCTIONS:
    1. Evaluate each category based solely on the description provided
    2. Give specific, actionable feedback — not vague encouragement
    3. Acknowledge what genuinely works before critiquing
    4. The highest scores (90+) should be rare — most competent submissions score 70-85
    5. A score below 50 requires an explanation of fundamental failures
    6. Write your overall commentary in your distinctive voice — not generic food writing
    7. Include at least 3 specific suggestions for improvement
    8. Include at least 2 specific highlights of what worked

    SCORING INTEGRITY:
    - Never inflate scores to make contestants feel good
    - Never penalize for things that cannot be evaluated from a written description
    - Bonus points for genuinely creative use of constraints
    - Deduct points for obvious technique errors mentioned in the description

    Return as JSON:
    {{
        "total_score": 78,
        "categories": [
            {{
                "name": "Flavor",
                "score": 23,
                "max_score": 30,
                "weight": 0.30,
                "commentary": "Specific, character-voice commentary on this category",
                "icon": "🌊"
            }},
            {{
                "name": "Technique",
                "score": 19,
                "max_score": 25,
                "weight": 0.25,
                "commentary": "...",
                "icon": "🔪"
            }},
            {{
                "name": "Creativity",
                "score": 16,
                "max_score": 20,
                "weight": 0.20,
                "commentary": "...",
                "icon": "✨"
            }},
            {{
                "name": "Presentation",
                "score": 12,
                "max_score": 15,
                "weight": 0.15,
                "commentary": "...",
                "icon": "🍽️"
            }},
            {{
                "name": "Constraint Use",
                "score": 8,
                "max_score": 10,
                "weight": 0.10,
                "commentary": "...",
                "icon": "🎯"
            }}
        ],
        "judge_commentary": "Extended 3-4 sentence commentary in the judge's distinctive voice — honest, specific, and memorable",
        "suggestions": [
            "Specific actionable improvement 1",
            "Specific actionable improvement 2",
            "Specific actionable improvement 3"
        ],
        "highlights": [
            "Specific thing that genuinely worked 1",
            "Specific thing that genuinely worked 2"
        ]
    }}
    """


def build_comparative_judging_prompt(
    submissions: list[dict],
    trial_name: str,
    judge_personality: dict,
) -> str:
    """
    Build a prompt for comparing multiple submissions in an Arena trial.
    """
    submissions_text = "\n\n".join([
        f"Submission {i+1}:\n"
        f"  Dish: {s['dish_name']}\n"
        f"  Description: {s['description'][:200]}\n"
        f"  Techniques: {', '.join(s.get('techniques_used', []))}"
        for i, s in enumerate(submissions)
    ])

    return f"""
    You are judging an Arena Trial — {trial_name} — comparing multiple submissions head-to-head.

    JUDGE: {judge_personality['name']}

    SUBMISSIONS:
{submissions_text}

    COMPARATIVE JUDGING:
    1. Score each submission individually (same 100-point rubric)
    2. Provide comparative commentary — what distinguishes the winner?
    3. Rank all submissions
    4. Explain the decisive factors

    Return as JSON with a "comparative_ranking" field and individual scores for each submission.
    """


def build_redemption_prompt(
    original_submission: dict,
    original_score: int,
    new_submission: dict,
    judge_personality: dict,
) -> str:
    """
    Build a prompt for judging a redemption attempt (retried trial).
    """
    improvement = new_submission.get("improvement_notes", "No specific improvements noted")

    return f"""
    This is a REDEMPTION attempt. The competitor previously scored {original_score}/100 on this trial.

    PREVIOUS DISH: {original_submission.get('dish_name')}
    NEW DISH: {new_submission.get('dish_name')}
    Stated Improvements: {improvement}

    JUDGE: {judge_personality['name']}

    Judge this redemption attempt with specific reference to:
    1. Has the competitor addressed previous weaknesses?
    2. Is this meaningfully different or just the same dish renamed?
    3. What progress has been made?

    Apply the standard scoring rubric but acknowledge the redemption context in your commentary.
    Note specifically whether each previously weak area has improved.
    """
