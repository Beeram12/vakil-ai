from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings as s
from app.core.logger import setup_logger

logger = setup_logger(__name__)

# URL.create() builds the connection URL safely.
# It handles special characters in the password (like @, #, %) automatically,
# which breaks when you embed them directly in an f-string URL.
db_url = URL.create(
    drivername="postgresql+psycopg2",
    username=s.DB_USER,
    password=s.DB_PASSWORD,   # @ or any special char is safe here
    host=s.DB_HOST,
    port=s.DB_PORT,
    database=s.DB_NAME,
    query={"sslmode": "require"},  # Supabase requires SSL
)

logger.info("Creating database engine → host=%s port=%s db=%s", s.DB_HOST, s.DB_PORT, s.DB_NAME)

engine = create_engine(
    db_url,
    pool_size=5,        # keep 5 connections open at all times
    max_overflow=10,    # allow up to 10 extra when pool is full (max 15 total)
    pool_timeout=30,    # wait max 30s for a free connection before raising an error
    pool_recycle=1800,  # replace connections older than 30 min (prevents stale connection errors)
    pool_pre_ping=True, # test each connection with SELECT 1 before using it
)

SessionLocal = sessionmaker(
    autocommit=False,  # you must call session.commit() explicitly to save changes
    autoflush=False,   # SQLAlchemy won't auto-sync pending changes before queries
    bind=engine,
)


class Base(DeclarativeBase):
    # All ORM models inherit from this.
    # SQLAlchemy uses it to track every table across the app.
    pass


def get_db():
    # FastAPI dependency — call this with Depends(get_db) in any route.
    # Gives the route a DB session, then closes it when the request finishes.
    db = SessionLocal()
    try:
        logger.debug("Opening DB session")
        yield db
    except Exception as e:
        logger.error("DB session error: %s", e)
        db.rollback()
        raise
    finally:
        logger.debug("Closing DB session")
        db.close()


def check_db_connection() -> bool:
    # Call this at startup to verify the DB is reachable.
    # Returns True if connected, False if not.
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("Database connection successful")
        return True
    except Exception as e:
        logger.error("Database connection failed: %s", e)
        return False
