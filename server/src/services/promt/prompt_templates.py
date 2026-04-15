# src/llm/prompt_templates.py

# System instruction for Gemini
System_prompt = "Turn this sentence into a vivid image generation prompt."

# Optional: stylistic wrapper 
def build_user_prompt(sentence: str) -> str:
    return f"""
Sentence:
{sentence}

Convert this into a highly descriptive, cinematic, visually rich image generation prompt.
Focus on:
- scene composition
- lighting
- mood
- camera style
- details

Output ONLY the final prompt.
"""