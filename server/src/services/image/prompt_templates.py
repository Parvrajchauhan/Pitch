# prompt_template.py
#
# Stage 1 — Deterministic style injection.
# Encodes each visual style as four structured layers:
#   1. color_grade  — palette + grading language the model maps to a visual temperature
#   2. composition  — spatial grammar: framing rule, depth cue, negative space intent
#   3. lighting     — direction, quality, atmospheric descriptor
#   4. render_hint  — rendering engine / medium signal (highest-weight style anchor)
#

from dataclasses import dataclass
from typing import Optional


@dataclass
class StyleConfig:
    color_grade: str
    composition: str
    lighting: str
    render_hint: str


STYLE_CONFIGS: dict[str, StyleConfig] = {
    "cinematic": StyleConfig(
        color_grade="desaturated teal-orange color grade, deep shadow tones, "
                    "filmic grain, anamorphic lens flare",
        composition="wide establishing shot, rule of thirds, strong foreground "
                    "element, layered depth of field",
        lighting="dramatic side lighting, single hard key light, long shadows, "
                 "volumetric atmospheric haze",
        render_hint="ultra-high-definition cinematic still, 35mm film, "
                    "IMAX aspect ratio, photorealistic",
    ),
    "anime": StyleConfig(
        color_grade="vibrant saturated palette, complementary color harmony, "
                    "cel-shaded gradients, punchy highlights",
        composition="dynamic Dutch angle, expressive character framing, "
                    "detailed environmental background, speed-line accents",
        lighting="soft diffused rim lighting, golden-hour warmth, "
                 "glowing magical particle effects",
        render_hint="Studio Ghibli inspired hand-painted animation cel, "
                    "highly detailed line art, 2D illustration",

    ),
    "realistic": StyleConfig(
        color_grade="natural color accuracy, subtle warm highlights, "
                    "true-to-life skin tones, minimal post-processing",
        composition="documentary-style medium shot, eye-level perspective, "
                    "authentic environmental context, shallow depth of field",
        lighting="soft natural window light, overcast diffusion, "
                 "true shadow softness, no artificial fill",
        render_hint="DSLR photography, 85mm portrait lens, f/1.8 aperture, "
                    "RAW capture quality, sharp focus",

    ),
    "sketch": StyleConfig(
        color_grade="monochrome graphite palette, high-contrast black and white, "
                    "subtle cross-hatching texture",
        composition="gestural loose framing, implied movement through line weight, "
                    "negative white-space emphasis",
        lighting="stark chiaroscuro, defined shadow masses, "
                 "light implied through paper tone",
        render_hint="detailed pencil sketch, architect's drafting style, "
                    "hand-drawn illustration, ink wash accents",

    ),
    "fantasy": StyleConfig(
        color_grade="rich jewel-tone palette, deep midnight blues and ember golds, "
                    "iridescent magical shimmer",
        composition="epic wide-angle hero shot, dramatic foreground silhouette, "
                    "vast atmospheric background scale",
        lighting="magical bioluminescent practical lights, god rays through clouds, "
                 "multiple colored light sources",
        render_hint="epic fantasy concept art, oil painting texture, "
                    "ArtStation trending, highly detailed matte painting",

    ),
    "corporate": StyleConfig(
        color_grade="clean neutral palette, brand-safe blues and whites, "
                    "high-key bright tones, minimal saturation",
        composition="symmetrical balanced layout, clean negative space, "
                    "professional subject placement, editorial framing",
        lighting="soft even studio lighting, no harsh shadows, "
                 "clean white or gradient background",
        render_hint="professional commercial photography, editorial stock style, "
                    "sharp clean render, business context",
    ),
}

_FALLBACK_STYLE = "cinematic"


def build_prompt(
    sentence: str,
    style: str,
) -> tuple[str, str]:
    key = style.lower().strip()
    if key not in STYLE_CONFIGS:
        import warnings
        warnings.warn(
            f"Unknown style '{style}'; falling back to '{_FALLBACK_STYLE}'.",
            stacklevel=2,
        )
        key = _FALLBACK_STYLE

    cfg = STYLE_CONFIGS[key]

    positive_prompt = (
        f"{sentence.strip().rstrip('.')}. "
        f"{cfg.composition}. "
        f"{cfg.lighting}. "
        f"{cfg.color_grade}. "
        f"{cfg.render_hint}."
    )

    return positive_prompt


def get_available_styles() -> list[str]:
    """Return all registered style keys — use to populate a UI dropdown."""
    return list(STYLE_CONFIGS.keys())