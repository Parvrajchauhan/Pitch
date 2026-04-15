import base64
import nltk
from src.services.promt.gemini_client import generate_image_prompt


def fake_image_base64(text: str) -> str:
    """
    Returns a dummy base64 string (not a real image, but frontend-safe)
    """
    dummy_bytes = f"IMAGE_FOR: {text}".encode("utf-8")
    return base64.b64encode(dummy_bytes).decode("utf-8")


def build_prompt(sentence: str, style: str) -> str:
    """
    Uses Gemini to convert sentence → vivid image prompt,
    then injects style on top.
    """

    # Step 1: Generate base cinematic prompt via Gemini
    base_prompt = generate_image_prompt(sentence)

    # Step 2: Add style control (your layer)
    final_prompt = f"{style} style, {base_prompt}"

    return final_prompt


def generate_panels(text: str, style: str):
    sentences = nltk.sent_tokenize(text)

    panels = []

    for i, sentence in enumerate(sentences):
        prompt = build_prompt(sentence, style)
        image_b64 = fake_image_base64(prompt)

        panels.append({
            "index": i,
            "original_sentence": sentence,
            "engineered_prompt": prompt,
            "image_b64": image_b64
        })

    return panels