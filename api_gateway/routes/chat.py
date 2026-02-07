import pandas as pd
from fastapi import APIRouter
from api_gateway.schemas import ChatRequest
from llm_layer import GeminiClient

router = APIRouter()
client = GeminiClient()

@router.post("", summary="Send a chat message")
async def chat(req: ChatRequest):
    import os
    # Create absolute path to data file
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    csv_path = os.path.join(base_dir, "data", "raw", "transactions.csv")
    
    # Load transaction data
    df = pd.read_csv(csv_path)
    transactions = df.to_dict(orient="records")
    
    # Create context string
    context = "\n".join([f"Txn {t['txn_id']}: {t['amount']} on {t['category']} at {t['merchant']} on {t['timestamp']}" for t in transactions])
    
    # Enhanced prompt with context
    # Enhanced prompt with system instructions and context
    system_instruction = (
        "You are a helpful and intelligent financial assistant designed to analyze user transactions "
        "and provide actionable insights. "
        "Answer the user's question based strictly on the provided transaction history. "
        "If the answer cannot be derived from the transactions, politely state so. "
        "Keep your response concise and friendly."
    )
    prompt = f"{system_instruction}\n\nTransaction History:\n{context}\n\nUser Question: {req.message}"
    
    resp = client.generate(prompt)
    return {"reply": resp.get("text", "")}
