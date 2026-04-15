def build_visual_thread_prompt(text: str, style: str) -> str:
    return f"""
You are a visual director.

Given the following story and style, generate a SINGLE concise visual thread description.

This should include:
- character appearance (consistent traits)
- environment / setting
- mood / lighting
- art style details

Output strictly as ONE paragraph.

STYLE: {style}
STORY: {text}
""".strip()
