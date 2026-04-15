import nltk
from typing import List, Dict
from concurrent.futures import ThreadPoolExecutor, as_completed

from src.services.promt.gemini_client import generate_image_prompt
from src.services.image.huggingface_client import HuggingFaceClient
from src.services.visual.gemini_client import generate_visual_thread


def build_prompt(
    sentence: str,
    style: str,
    panel_index: int,
    panel_total: int,
    visual_thread: dict | None = None
) -> str:

    base_prompt = generate_image_prompt(
        sentence=sentence,
        panel_index=panel_index,
        panel_total=panel_total,
        visual_thread=visual_thread
    )

    return f"{style} style, {base_prompt}"


def process_single(
    idx: int,
    sentence: str,
    style: str,
    total: int,
    client: HuggingFaceClient,
    visual_thread: dict | None
) -> tuple[int, Dict | None]:

    sentence = sentence.strip()
    if not sentence:
        return idx, None

    try:
        prompt = build_prompt(
            sentence=sentence,
            style=style,
            panel_index=idx + 1,
            panel_total=total,
            visual_thread=visual_thread
        )
        print(f"[PROMPT] {prompt}")
    except Exception as e:
        print(f"[ERROR] Prompt failed: {e}")
        prompt = sentence
        
    try:
        image_b64 = client.generate_image(prompt)
    except Exception as e:
        print(f"[ERROR] Image failed: {e}")
        image_b64 = None

    return idx, {
        "segment": sentence,
        "prompt": prompt,
        "image_url": image_b64
    }


def generate_panels1(
    text: str,
    style: str,
    hf_api_key: str,
    visual_thread: dict | None = None
) -> List[Dict]:

    try:
        nltk.data.find("tokenizers/punkt")
    except LookupError:
        nltk.download("punkt")

    sentences = nltk.sent_tokenize(text)
    total = len(sentences)

    client = HuggingFaceClient(api_key=hf_api_key)

    results = [None] * total

    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [
            executor.submit(
                process_single,
                idx,
                sentence,
                style,
                total,
                client,
                visual_thread
            )
            for idx, sentence in enumerate(sentences)
        ]

        for future in as_completed(futures):
            idx, result = future.result()
            if result:
                results[idx] = result

    panels = [r for r in results if r is not None]

    return panels

def generate_panels(text: str, style: str, hf_api_key: str):
    visual_thread_data= generate_visual_thread(text, style)

    panels = generate_panels1(
        text=text,
        style=style,
        hf_api_key=hf_api_key,
        visual_thread=visual_thread_data
    )

    return panels