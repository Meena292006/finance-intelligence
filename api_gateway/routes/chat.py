from fastapi import APIRouter
from api_gateway.schemas import ChatRequest
from llm_layer import GeminiClient

router = APIRouter()
client = GeminiClient()

@router.post("/", summary="Send a chat message")
async def chat(req: ChatRequest):
    resp = client.generate(req.message)
    return {"reply": resp.get("text", "")}
