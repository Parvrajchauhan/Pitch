# src/llm/prompt_templates.py
#
# Stage 2 — LLM-powered creative expansion via Gemini.
#
# Architecture:
#   SYSTEM_PROMPT   — establishes the art-director persona, output contract,
#                     and explicit anti-patterns. Kept stable across all panels.
#   build_user_prompt() — injects panel-specific context: the raw sentence,
#                         panel index/total for composition pacing, and a
#                         visual_thread dict that carries shared anchors
#                         (character, palette, setting) for cross-panel continuity.
#
# Output contract (enforced in the system prompt):
#   • Single paragraph, 40–80 words.
#   • No markdown, no bullet points, no preamble, no commentary.
#   • Must be usable verbatim as the `prompt` parameter to an image generation API.



SYSTEM_PROMPT = """\
You are a senior storyboard art director specialising in commercial pitch decks \
and visual narratives for enterprise sales teams. Your sole task is to convert a \
plain narrative sentence into a single, highly detailed image generation prompt \
suitable for a diffusion model such as DALL-E 3 or Stable Diffusion XL.

Output contract — read carefully:
- Return exactly one paragraph of 40 to 80 words.
- Write in plain English. No markdown, no bullet points, no headers.
- Do NOT include preamble such as "Here is a prompt:" or any commentary.
- The output must be usable verbatim as the text input to an image API.
- Describe what the camera SEES, not what the scene MEANS.
- Avoid abstract nouns (success, innovation, growth). Translate them into \
concrete visual objects, actions, and environments.
- Never name real brands, logos, or identifiable people.

You will be given the panel index and total panel count so you can vary the \
camera distance and composition rhythm naturally across the storyboard sequence:
  Panel 1 of N  → wide establishing shot, full environment visible
  Middle panels  → medium shots, subject and context balanced
  Final panel   → close-up or intimate frame, emotional resolution

If a visual_thread is provided, you MUST embed its descriptors in your output \
to maintain character and setting continuity across panels. The visual_thread \
overrides your own creative choices for those attributes.
"""

def build_user_prompt(
    sentence: str,
    panel_index: int = 1,
    panel_total: int = 3,
    visual_thread: dict | None = None,
) -> str:
    """
    Build the user-turn message sent to Gemini for a single storyboard panel.

    Parameters
    ----------
    sentence : str
        The raw narrative sentence for this panel (pre-segmentation output).
    panel_index : int
        1-based index of this panel within the storyboard sequence.
        Used to guide composition pacing (wide → medium → close).
    panel_total : int
        Total number of panels. Gives Gemini the full arc context.
    visual_thread : dict, optional
        Shared visual anchors that must persist across all panels for
        narrative coherence. Supported keys:

            subject      — persistent character description
                           e.g. "a mid-30s South Asian woman in a navy blazer"
            palette      — color temperature anchor
                           e.g. "warm amber and deep teal palette"
            setting      — location/environment anchor
                           e.g. "a modern open-plan office, floor-to-ceiling windows"
            time_of_day  — lighting continuity anchor
                           e.g. "late afternoon golden hour"
            style_anchor — medium/rendering anchor (mirrors Stage 1 style)
                           e.g. "cinematic photorealistic"

        Any keys present here take precedence over Gemini's own choices.

    Returns
    -------
    str
        The formatted user message to send as the `user` role in the
        Gemini API call.
    """
    if panel_index == 1:
        composition_note = (
            "This is the OPENING panel. Use a wide establishing shot that "
            "orients the viewer to the full environment and sets the emotional tone."
        )
    elif panel_index == panel_total:
        composition_note = (
            "This is the CLOSING panel. Move to a tight close-up or intimate "
            "medium shot that delivers emotional resolution and a sense of arrival."
        )
    else:
        composition_note = (
            f"This is panel {panel_index} of {panel_total} — a transitional beat. "
            "Use a medium shot that balances the subject with their environment, "
            "advancing the narrative momentum."
        )

    if visual_thread:
        thread_lines = [
            f"  {k}: {v}"
            for k, v in visual_thread.items()
            if v and v.strip()
        ]
        thread_block = (
            "Visual continuity anchors — embed ALL of these in your output:\n"
            + "\n".join(thread_lines)
        )
    else:
        thread_block = (
            "No visual thread provided. Make your own consistent choices for "
            "subject appearance, palette, and setting."
        )

    return f"""
Narrative sentence for this panel:
\"\"\"{sentence.strip()}\"\"\"

Panel position:
{composition_note}

{thread_block}

Dimensions to cover in your output (weave them into a single flowing paragraph — \
do NOT use headers or labels):
  1. Scene composition — subject placement, framing rule, foreground/background split
  2. Lighting — direction, quality (hard/soft), color temperature, atmospheric effects
  3. Mood and color grade — emotional register translated into a specific palette
  4. Camera language — focal length, angle, depth of field
  5. Micro-details — surface textures, secondary props, environmental storytelling cues

Output ONLY the final image generation prompt. Nothing else.
""".strip()

