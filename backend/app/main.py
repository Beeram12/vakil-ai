"""
main.py — FastAPI application entry point

This is where FastAPI is created, middleware is attached, and all routers
are registered. Think of it as the "wiring" file — it doesn't contain
business logic, just assembles the parts.

To run locally:
    cd backend
    uvicorn app.main:app --reload

The --reload flag restarts the server automatically whenever you save a file.
"""

from backend.app.api.routes import auth, chat
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from backend.app.api.routes import health

app = FastAPI(
    title="Vakil AI",
    description="AI-powered Indian legal assistant",
    version="0.1.0",
    # In production, hide the interactive API docs behind auth or disable entirely.
    # For now, docs are enabled so you can test endpoints at http://localhost:8000/docs
    docs_url="/docs" if settings.APP_ENV == "development" else None,
    redoc_url=None,
)

# ── CORS ─────────────────────────────────────────────────────────────────────
# CORS (Cross-Origin Resource Sharing) controls which origins (domains) can
# call your API from a browser. Without this, your Next.js frontend at
# localhost:3000 would be blocked from calling localhost:8000.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,  # needed for cookies / Authorization header
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
# Each router is a mini-FastAPI that groups related routes.
# The prefix is prepended to every route in that router.
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "Vakil AI API is running", "docs": "/docs"}
