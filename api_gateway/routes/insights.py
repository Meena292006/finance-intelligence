import pandas as pd
from fastapi import APIRouter

router = APIRouter()

@router.get("", summary="Get recent insights")
async def insights():
    try:
        import os
        # Create absolute path to data file
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        csv_path = os.path.join(base_dir, "data", "raw", "transactions.csv")
        
        # Load transaction data from CSV
        if not os.path.exists(csv_path):
            return {"error": f"File not found: {csv_path}"}
            
        df = pd.read_csv(csv_path)
        transactions = df.to_dict(orient="records")
        
        # Compute stats
        total = float(df['amount'].sum())
        avg = float(df['amount'].mean())
        count = int(len(df))
        
        # Recent transactions (last 10 or all)
        recent = transactions[-10:]
        
        return {"stats": {"total": total, "avg": avg, "count": count}, "recent": recent}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
