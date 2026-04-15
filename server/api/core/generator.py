import base64
import nltk

try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")


def fake_image_base64(text: str) -> str:
    """
    Returns a dummy base64 string (not a real image, but frontend-safe)
    """
    dummy_bytes = f"IMAGE_FOR: {text}".encode("utf-8")
    return base64.b64encode(dummy_bytes).decode("utf-8")


def build_prompt(sentence: str, style: str) -> str:
    """
    Fake 'Gemini-style' prompt engineering
    """
    return f"{style} illustration of: {sentence}. cinematic lighting, ultra detailed"


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