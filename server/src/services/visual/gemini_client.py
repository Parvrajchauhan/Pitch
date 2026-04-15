from .prompt_templates import build_visual_thread_prompt

# src/llm/gemini_client.py

import os
import logging
from dotenv import load_dotenv

from google import genai
from google.genai import types

# Load env
load_dotenv()

# Client setup
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite-preview")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def _call_gemini(prompt: str) -> str:
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        output = response.text.strip() if response.text else ""

        logging.info(f"[GEMINI OUTPUT] {output}")

        return output

    except Exception as e:
        logging.error(f"[GEMINI ERROR] {str(e)}")
        return ""

def generate_visual_thread(text: str, style: str) -> str:
    

    vt_prompt = build_visual_thread_prompt(text, style)
    visual_thread = _call_gemini(vt_prompt)


    return visual_thread