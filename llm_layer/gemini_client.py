from dotenv import load_dotenv
import os

load_dotenv()

class GeminiClient:
    """Minimal Gemini client stub. Replace with real API integration."""
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")

    def generate(self, prompt: str) -> dict:
        """Return a simple echo response. Replace this with real inference call."""
        return {"text": f"[gemini_stub] {prompt}"}
