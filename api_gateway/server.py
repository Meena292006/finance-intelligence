from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api_gateway.routes.chat import router as chat_router
from api_gateway.routes.alerts import router as alerts_router
from api_gateway.routes.insights import router as insights_router

app = FastAPI(title="API Gateway", redirect_slashes=False)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5175", "http://localhost:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(alerts_router, prefix="/alerts", tags=["alerts"])
app.include_router(insights_router, prefix="/insights", tags=["insights"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api_gateway.server:app", host="127.0.0.1", port=8000, reload=True)
