import pandas as pd
from fastapi import APIRouter

router = APIRouter()

@router.get("/", summary="List active alerts")
async def list_alerts():
    import os
    # Create absolute path to data file
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    csv_path = os.path.join(base_dir, "data", "raw", "transactions.csv")
    
    # Load transaction data
    df = pd.read_csv(csv_path)
    
    # Sample alerts based on transactions
    alerts = []
    if df['amount'].max() > 1000:
        alerts.append({"id": 1, "message": "High-value transaction detected", "severity": "high"})
    if df['category'].value_counts().idxmax() == 'Food':
        alerts.append({"id": 2, "message": "Frequent food spending", "severity": "medium"})
    if len(df) > 3:
        alerts.append({"id": 3, "message": "Multiple transactions in short period", "severity": "low"})
    
    return {"alerts": alerts}

@router.post("", summary="Create an alert")
async def create_alert(payload: dict):
    return {"status": "created", "payload": payload}
