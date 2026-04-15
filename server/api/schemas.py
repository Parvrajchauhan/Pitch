from pydantic import BaseModel
from typing import List


# Request Schema
class GenerateRequest(BaseModel):
    text: str
    style: str


# Each panel output
class Panel(BaseModel):
    index: int
    original_sentence: str
    engineered_prompt: str
    image_b64: str


# Response Schema
class GenerateResponse(BaseModel):
    panels: List[Panel]