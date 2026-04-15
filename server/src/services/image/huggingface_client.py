# huggingface_client.py

import base64
from huggingface_hub import InferenceClient
from io import BytesIO


class HuggingFaceClient:
    def __init__(self, api_key: str):
        self.client = InferenceClient(
            provider="nscale",   # since you're using SDXL
            api_key=api_key
        )

    def generate_image(self, prompt: str) -> str:
        result = self.client.text_to_image(
            prompt,
            model="stabilityai/stable-diffusion-xl-base-1.0"
        )

        print("TYPE:", type(result))
        print("VALUE:", result)

        if hasattr(result, "save"):  # PIL Image
            buffer = BytesIO()
            result.save(buffer, format="PNG")
            image_bytes = buffer.getvalue()

        elif isinstance(result, bytes):  # raw bytes
            image_bytes = result

        else:
            raise Exception(f"Unexpected response type: {type(result)}")

        base64_str = base64.b64encode(image_bytes).decode("utf-8")
        return f"data:image/png;base64,{base64_str}"