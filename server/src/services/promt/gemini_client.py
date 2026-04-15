# src/llm/gemini_client.py

import os
import logging
from dotenv import load_dotenv

from google import genai
from google.genai import types

from .prompt_templates import SYSTEM_PROMPT, build_user_prompt

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
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            ),
        )

        output = response.text.strip() if response.text else ""

        logging.info(f"[GEMINI OUTPUT] {output}")

        return output

    except Exception as e:
        logging.error(f"[GEMINI ERROR] {str(e)}")
        return ""


def generate_image_prompt(
    sentence: str,
    panel_index: int,
    panel_total: int,
    visual_thread: dict | None = None
) -> str:
    logging.info(f"[INPUT SENTENCE] {sentence}")

    user_prompt = build_user_prompt(
        sentence=sentence,
        panel_index=panel_index,
        panel_total=panel_total,
        visual_thread=visual_thread
    )

    return _call_gemini(user_prompt)

