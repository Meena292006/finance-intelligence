import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
print(f"Using API Key: {api_key[:10]}...")
genai.configure(api_key=api_key)

try:
    print("Listing models...")
    models = genai.list_models()
    for m in models:
        print(f" - {m.name} ({m.supported_generation_methods})")
except Exception as e:
    print(f"Error: {e}")
