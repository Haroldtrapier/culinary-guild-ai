from pydantic import BaseModel


class AnimeInferRequest(BaseModel):
    title: str


class AnimeInferResponse(BaseModel):
    anime: str
    dominant_style: str
    likely_dishes: list[str]
