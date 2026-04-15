# prompt_template.py

def build_prompt(sentence: str, style: str) -> str:
    style = style.lower().strip()

    style_map = {
        "cinematic": "cinematic lighting, dramatic composition, ultra detailed, 4k",
        "anime": "anime style, vibrant colors, studio ghibli inspired, highly detailed",
        "realistic": "photorealistic, natural lighting, high detail, sharp focus",
        "sketch": "pencil sketch, hand-drawn, monochrome, detailed lines",
        "fantasy": "fantasy art, epic scene, magical lighting, highly detailed"
    }

    style_description = style_map.get(
        style,
        "cinematic lighting, ultra detailed"
    )

    prompt = f"{style_description}. Illustration of: {sentence}"

    return prompt