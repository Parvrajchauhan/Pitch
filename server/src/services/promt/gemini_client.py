# src/llm/gemini_client.py
import os
import logging
from dotenv import load_dotenv
from google import genai
from google.genai import types

from .prompt_templates import System_prompt, build_user_prompt

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
Model = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite-preview")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def _call_gemini(prompt: str) -> str:
    try:
        response = client.models.generate_content(
            model=Model,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=System_prompt
            ),
        )

        output = response.text.strip() if response.text else ""

        logging.info(f"[GEMINI OUTPUT] {output}")

        return output

    except Exception as e:
        error_msg = f"Error: {str(e)}"
        logging.error(error_msg)
        return error_msg


def generate_image_prompt(sentence: str) -> str:
   
    user_prompt = build_user_prompt(sentence)

    logging.info(f"[INPUT SENTENCE] {sentence}")

    return _call_gemini(user_prompt)


def generate_prompts_for_segments(segments: list[str]) -> list[str]:
    outputs = []

    for idx, segment in enumerate(segments):
        logging.info(f"\n--- Segment {idx+1} ---")
        result = generate_image_prompt(segment)
        outputs.append(result)

    return outputs