import requests


class OllamaClient:
    def __init__(self, model: str = "gemma3:1b"):

        self.model = model
        self.url = "http://localhost:11434/api/generate"

    def generate(self, prompt: str) -> str:
        try:
            print(f"DEBUG: Prompt length: {len(prompt)}")
            response = requests.post(
                self.url,
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                },
                timeout=180,
            )

            response.raise_for_status()
            data = response.json()

            # correct parsing for /api/generate
            return data["response"]

        except requests.exceptions.HTTPError as e:
            return f"Ollama HTTP error: {e.response.status_code} - {e.response.text}"
        except Exception as e:
            return f"Ollama error: {str(e)}"
