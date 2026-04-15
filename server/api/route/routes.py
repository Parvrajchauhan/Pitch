from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
import os
import traceback

from api.schemas import GenerateRequest, GenerateResponse
from api.core.generator import generate_panels

load_dotenv()

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
def generate_endpoint(req: GenerateRequest):
    try:
        hf_api_key = os.getenv("HF_API_KEY")

        if not hf_api_key:
            raise ValueError("HF_API_KEY not found in environment")

        panels = generate_panels(req.text, req.style, hf_api_key)

        return GenerateResponse(panels=panels)

    except Exception as e:
        traceback.print_exc() 
        raise HTTPException(status_code=500, detail=str(e))