from fastapi import APIRouter
from pydantic import BaseModel
from llm_layer.ollama_client import OllamaClient
import csv
from collections import defaultdict

router = APIRouter()
client = OllamaClient()


class ChatRequest(BaseModel):
    message: str
    user_id: str  # required for personalization


# ---------- Read only this user's transactions ----------
import os

def read_user_transactions(user_id: str):
    """Read only this user's transactions from correct CSV path"""
    transactions = []

    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        csv_path = os.path.join(base_dir, "data", "raw", "transactions.csv")  # ✅ correct path

        if not os.path.exists(csv_path):
            print("CSV not found at:", csv_path)
            return []

        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get("user_id") == user_id:
                    transactions.append(row)

    except Exception as e:
        print("CSV read error:", e)

    return transactions


# ---------- Analyze spending numerically ----------
def analyze_spending(transactions):
    total = 0.0
    categories = defaultdict(float)

    for txn in transactions:
        amount = float(txn.get("amount", 0))
        category = txn.get("category", "Other")

        total += amount
        categories[category] += amount

    if total == 0:
        return "No spending data available for this user."

    # percentage calculation
    category_percent = {
        cat: round((amt / total) * 100, 2) for cat, amt in categories.items()
    }

    # highest spending category
    highest_category = max(categories, key=categories.get)

    summary = f"""
Total spending: ₹{total:.2f}

Category totals:
{dict(categories)}

Category percentages:
{category_percent}

Highest spending category:
{highest_category} → ₹{categories[highest_category]:.2f}
"""

    return summary


# ---------- Chat endpoint ----------
@router.post("")
def chat(req: ChatRequest):
    try:
        # 1️⃣ Get this user's past transactions
        transactions = read_user_transactions(req.user_id)

        # 2️⃣ Perform numeric spending analysis
        summary = analyze_spending(transactions)

        # 3️⃣ Strong prompt forcing REAL financial reasoning
        prompt = f"""
You are an advanced AI personal finance advisor.

STRICT RULES:
- You MUST analyze the numeric spending data below.
- You MUST mention exact rupee amounts and percentages.
- You MUST identify overspending categories.
- You MUST give personalized, data-driven advice.
- DO NOT give generic textbook tips.
- Provide 3–5 short, specific recommendations.

USER SPENDING ANALYSIS:
{summary}

USER QUESTION:
{req.message}

Now give clear, personalized financial advice based ONLY on this data.
"""

        # 4️⃣ Ask Ollama
        reply = client.generate(prompt)

        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Error generating advice: {str(e)}"}
