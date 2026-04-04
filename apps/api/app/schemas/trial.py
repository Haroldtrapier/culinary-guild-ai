from pydantic import BaseModel


class TrialBasket(BaseModel):
    anchor: str
    tension: str
    support: str
    wildcard: str


class TrialGenerateResponse(BaseModel):
    title: str
    basket: TrialBasket
    time_limit: int
    constraint: str


class TrialJudgeResponse(BaseModel):
    total_score: int
    notes: str
