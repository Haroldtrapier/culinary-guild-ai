from pydantic import BaseModel


class RecipeGenerateRequest(BaseModel):
    ingredient: str | None = None
    cuisine: str | None = None
    difficulty: str = "weeknight"


class RecipeGenerateResponse(BaseModel):
    title: str
    mode: str
    notes: str
