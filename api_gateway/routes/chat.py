from fastapi import APIRouter
from pydantic import BaseModel
from llm_layer.ollama_client import OllamaClient
import csv
from collections import defaultdict

router = APIRouter()
client = OllamaClient()


class ChatRequest(BaseModel):
    message: str
    user_id: str = "u1"  # Default to u1 for now


# ---------- Read only this user's transactions ----------
import os
import json

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

# ---------- Read budgets ----------

def read_user_budgets(user_id: str):
    """Read user budgets from JSON"""
    budgets = []
    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        json_path = os.path.join(base_dir, "data", "raw", "budgets.json")
        
        if not os.path.exists(json_path):
            return []
            
        with open(json_path, "r", encoding="utf-8") as f:
            all_budgets = json.load(f)
            budgets = [b for b in all_budgets if b.get("user_id") == user_id]
            
    except Exception as e:
        print("Budget read error:", e)
        
    return budgets

# ---------- Analyze finances (Income, Expernse, Budgets) ----------
def analyze_finances(transactions, budgets):
    income = 0.0
    expense = 0.0
    categories = defaultdict(float)
    
    # 1. Process transactions
    for txn in transactions:
        amount = float(txn.get("amount", 0))
        txn_type = txn.get("type", "Expense") # Default to Expense if missing
        category = txn.get("category", "Other")
        
        if txn_type == "Income":
            income += amount
        else:
            expense += amount
            categories[category] += amount

    savings = income - expense
    
    # 2. Process Budgets
    budget_analysis = []
    for b in budgets:
        cat = b.get("category")
        limit = float(b.get("limit", 0))
        
        if cat == "Overall":
            spent = expense
        else:
            spent = categories.get(cat, 0.0)
            
        remaining = limit - spent
        status = "✅ Within Budget"
        if spent > limit:
            status = "❌ Exceeded"
        elif spent > 0.9 * limit:
            status = "⚠️ Near Limit"
            
        budget_analysis.append({
            "category": cat,
            "limit": limit,
            "spent": spent,
            "remaining": remaining,
            "status": status
        })

    # 3. Text Summary
    summary = f"""
FINANCIAL OVERVIEW:
- Total Income: ₹{income:.2f}
- Total Expenses: ₹{expense:.2f}
- Net Savings: ₹{savings:.2f}

CATEGORY BREAKDOWN:
{dict(categories)}

BUDGET STATUS:
"""
    for b in budget_analysis:
        summary += f"- {b['category']}: Spent ₹{b['spent']:.2f} / ₹{b['limit']:.2f} ({b['status']}). Remaining: ₹{b['remaining']:.2f}\n"

    return summary

# ---------- Chat endpoint ----------
@router.post("")
def chat(req: ChatRequest):
    try:
        # 1️⃣ Fetch Data
        transactions = read_user_transactions(req.user_id)
        budgets = read_user_budgets(req.user_id)

        # 2️⃣ Analyze
        context = analyze_finances(transactions, budgets)

        # 3️⃣ Prompt
        prompt = f"""
You are "FinanceIQ", a smart and friendly financial best friend.

DATA CONTEXT:
{context}

USER QUESTION:
"{req.message}"

INSTRUCTIONS:
1. **Be Short & Crisp**: valid insights in 2-3 sentences max. No long paragraphs.
2. **Friendly Tone**: Talk like a supportive friend (e.g., "Wow, great saving!" or "Careful with that spending!").
3. **Data-Driven**: Always use the exact numbers from the context.
4. **Actionable Recommendations**: Always end with 1 specific, easy tip based on their spending.
5. **Formatting**: Use emojis (💰, 📉, 🚨) to make it engaging.

YOUR RESPONSE:
"""

        # 4️⃣ Generate
        reply = client.generate(prompt)

        return {"reply": reply}


    except Exception as e:
        return {"reply": f"Error generating advice: {str(e)}"}
