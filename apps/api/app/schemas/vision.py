from pydantic import BaseModel, Field

class VisionIdentifyRequest(BaseModel):
    image_url: str = Field(..., description="Public or signed URL to image")

class VisionIdentifyResponse(BaseModel):
    top_match: str
    confidence_score: float
    is_edible_candidate: bool
    safety_risk: str
    warning: str | None = None
    suggested_next_step: str
