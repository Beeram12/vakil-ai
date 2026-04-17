"""
database.py — SQLAlchemy setup

Three things live here:
  1. engine      — the actual connection to PostgreSQL (one per process)
  2. SessionLocal — a factory that creates DB sessions (one per request)
  3. Base        — the parent class all ORM models inherit from

Why SQLAlchemy?
  - Lets you write Python classes (models) instead of raw SQL
  - Handles connection pooling automatically
  - Works with Alembic for schema migrations

Why not async?
  psycopg2-binary is a synchronous driver. For CP1 this is fine.
  We can upgrade to asyncpg + async SQLAlchemy later if needed.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

# create_engine() sets up the connection pool.
# pool_pre_ping=True: before reusing an idle connection, SQLAlchemy sends
# a cheap "SELECT 1" to check it's still alive. Prevents "connection gone stale" errors
# which are common on Railway where idle connections get dropped.
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# SessionLocal is not a session itself — it's a class you call to get a session.
# autocommit=False: changes don't go to DB until you explicitly call session.commit()
# autoflush=False:  changes don't flush to DB before each query (better control)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """
    All ORM model classes inherit from this Base.
    It keeps a registry of all tables so Alembic can auto-generate migrations.
    """
    pass


def get_db():
    """
    FastAPI dependency — yields a DB session for the duration of one request,
    then closes it automatically (even if an exception occurs).

    Usage in a route:
        @router.get("/something")
        def my_route(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
