from fastapi import APIRouter
from app.schemas.vision import VisionIdentifyRequest, VisionIdentifyResponse
from app.services.vision_service import identify_ingredient

router = APIRouter()

@router.post("/identify", response_model=VisionIdentifyResponse)
def identify(payload: VisionIdentifyRequest) -> VisionIdentifyResponse:
    return identify_ingredient(payload.image_url)

@router.post("/safety-check", response_model=VisionIdentifyResponse)
def safety_check(payload: VisionIdentifyRequest) -> VisionIdentifyResponse:
    return identify_ingredient(payload.image_url)
