from fastapi import APIRouter

router = APIRouter()

@router.get("/", summary="Get recent insights")
async def insights():
    return {"insights": []}
