from pydantic import BaseModel
from typing import List


# Request Schema
class GenerateRequest(BaseModel):
    text: str
    style: str


# Each panel output

class Panel(BaseModel):
    segment: str
    prompt: str
    image_url: str | None

# Response Schema
class GenerateResponse(BaseModel):
    panels: List[Panel]