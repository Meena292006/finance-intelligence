from pydantic import BaseModel
from typing import Any, Dict

class ChatRequest(BaseModel):
    message: str
    context: Dict[str, Any] = {}

class ChatResponse(BaseModel):
    reply: str
