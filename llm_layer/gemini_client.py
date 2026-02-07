import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

class GeminiClient:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not set")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        print("GeminiClient initialized with REAL implementation (using gemini-2.5-flash)")

    def generate(self, prompt: str) -> dict:
        try:
            response = self.model.generate_content(prompt)
            return {"text": response.text}
        except Exception as e:
            print(f"Error generating content: {e}")
            return {"text": "I'm sorry, I encountered an error processing your request."}
