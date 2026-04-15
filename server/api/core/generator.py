import nltk
from typing import List, Dict

from src.services.promt.gemini_client import generate_image_prompt
from src.services.image.huggingface_client import HuggingFaceClient


def build_prompt(sentence: str, style: str) -> str:
    """
    Uses Gemini to convert sentence → vivid image prompt,
    then injects style on top.
    """

    # Step 1: Generate base cinematic prompt via Gemini
    base_prompt = generate_image_prompt(sentence)

    # 🔥 IMPORTANT: trim prompt (SDXL providers fail on long prompts)
    base_prompt = base_prompt[:400]

    # Step 2: Add style control
    final_prompt = f"{style} style, {base_prompt}"

    return final_prompt


def generate_panels(text: str, style: str, hf_api_key: str) -> List[Dict]:
    """
    Splits text into sentences, generates prompts, calls HF API,
    and returns structured panel data.
    """

    # Ensure tokenizer exists
    try:
        nltk.data.find("tokenizers/punkt")
    except LookupError:
        nltk.download("punkt")

    sentences = nltk.sent_tokenize(text)

    client = HuggingFaceClient(api_key=hf_api_key)

    panels = []

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        # 🔹 Step 1: Prompt generation
        try:
            prompt = build_prompt(sentence, style)
        except Exception as e:
            print(f"[ERROR] Prompt generation failed: {e}")
            prompt = sentence  # fallback

        # 🔹 Step 2: Image generation
        try:
            image_b64 = client.generate_image(prompt)
        except Exception as e:
            print(f"[ERROR] Image generation failed: {e}")
            image_b64 = None  # don't crash entire pipeline

        panels.append({
            "segment": sentence,
            "prompt": prompt,
            "image_url": image_b64
        })

    return panels