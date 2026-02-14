import requests


class OllamaClient:
    def __init__(self, model: str = "phi3"):

        self.model = model
        self.url = "http://localhost:11434/api/chat"

    def generate(self, prompt: str) -> str:
        try:
            response = requests.post(
                self.url,
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ],
                    "stream": False,
                },
                timeout=180,
            )

            response.raise_for_status()
            data = response.json()

            # correct parsing for /api/chat
            return data["message"]["content"]

        except Exception as e:
            return f"Ollama error: {str(e)}"
