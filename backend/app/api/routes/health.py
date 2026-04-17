"""
health.py — Simple uptime check endpoint

Railway and Vercel both hit /health to decide if your service is alive.
This also verifies the DB connection is reachable on startup.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Returns 200 if the app is running and PostgreSQL is reachable.
    Returns 500 (raised by SQLAlchemy) if the DB is down.
    """
    db.execute(text("SELECT 1"))  # cheap query that just tests connectivity
    return {"status": "ok", "database": "connected"}
