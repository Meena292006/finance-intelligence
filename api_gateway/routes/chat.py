import pandas as pd
from fastapi import APIRouter
import os
from api_gateway.schemas import ChatRequest
from llm_layer import GeminiClient

router = APIRouter()
client = GeminiClient()

@router.post("", summary="Send a chat message")
async def chat(req: ChatRequest):
    try:
        # Get absolute path to the project root
        current_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
        csv_path = os.path.join(project_root, "data", "raw", "transactions.csv")
        
        if not os.path.exists(csv_path):
            return {"reply": "I'm sorry, I couldn't find your transaction history to answer that."}
            
        # Load transaction data
        df = pd.read_csv(csv_path)
        if df.empty:
            return {"reply": "You don't have any transactions yet. How can I help you today?"}
            
        transactions = df.to_dict(orient="records")
        
        # Create context string
        context = "\n".join([f"Txn {t.get('txn_id')}: {t.get('amount')} on {t.get('category')} at {t.get('merchant')} on {t.get('timestamp')}" for t in transactions])
        
        system_instruction = (
            "You are a helpful and intelligent financial assistant designed to analyze user transactions "
            "and provide actionable insights. "
            "Answer the user's question based strictly on the provided transaction history. "
            "If the answer cannot be derived from the transactions, politely state so. "
            "Keep your response concise and friendly."
        )
        prompt = f"{system_instruction}\n\nTransaction History:\n{context}\n\nUser Question: {req.message}"
        
        resp = client.generate(prompt)
        return {"reply": resp.get("text", "I'm sorry, I'm having trouble thinking right now.")}
    except Exception as e:
        print(f"Chat route error: {e}")
        return {"reply": f"An error occurred: {str(e)}"}
