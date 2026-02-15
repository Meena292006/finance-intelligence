from pydantic import BaseModel
from typing import Any, Dict

class ChatRequest(BaseModel):
    message: str
    context: Dict[str, Any] = {}

class ChatResponse(BaseModel):
    reply: str

class Budget(BaseModel):
    category: str
    limit: float
    spent: float = 0.0
    remaining: float = 0.0
    status: str = "Good"  # Good, Warning, Exceeded

class FinancialContext(BaseModel):
    total_income: float = 0.0
    total_expense: float = 0.0
    savings: float = 0.0
    budgets: list[Budget] = []
    recent_transactions: list[Dict[str, Any]] = []
