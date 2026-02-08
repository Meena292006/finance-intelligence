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
        # Using 'gemini-2.5-flash' which is available in your environment
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        print(f"GeminiClient initialized with model: gemini-2.5-flash")

    def generate(self, prompt: str) -> dict:
        try:
            if not prompt.strip():
                return {"text": "I didn't receive any message."}
                
            response = self.model.generate_content(prompt)
            if hasattr(response, 'text'):
                return {"text": response.text}
            else:
                return {"text": "I'm sorry, I couldn't generate a response for that. It might have been filtered."}
        except Exception as e:
            error_msg = str(e)
            print(f"Error generating content: {error_msg}")
            return {"text": f"Error: {error_msg}"}
