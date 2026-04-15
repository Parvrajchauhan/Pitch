from fastapi import APIRouter, HTTPException
from api.schemas import GenerateRequest, GenerateResponse, Panel
from api.core.generator import generate_panels

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
def generate_endpoint(req: GenerateRequest):
    try:
        panels = generate_panels(req.text, req.style)
        return GenerateResponse(panels=panels)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))