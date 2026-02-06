from fastapi import APIRouter

router = APIRouter()

@router.get("/", summary="List active alerts")
async def list_alerts():
    return {"alerts": []}

@router.post("/", summary="Create an alert")
async def create_alert(payload: dict):
    return {"status": "created", "payload": payload}
