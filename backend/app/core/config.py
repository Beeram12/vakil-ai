"""
config.py — Application settings

pydantic-settings reads values from your .env file automatically.
Every setting here corresponds to a key in .env.example.

Why pydantic-settings?
  - Validates types at startup (e.g. DATABASE_URL must be a string, not missing)
  - One place for all config — no scattered os.getenv() calls
  - Works identically in dev (.env file) and prod (Railway env vars)
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    SECRET_KEY: str

    # ── Database ──────────────────────────────────────────────────────────
    DATABASE_URL: str

    # ── Google OAuth ──────────────────────────────────────────────────────
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/auth/google/callback"

    # ── Pinecone ──────────────────────────────────────────────────────────
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str = "vakil-legal"
    PINECONE_ENVIRONMENT: str = "us-east-1"

    # ── Google Gemini ─────────────────────────────────────────────────────
    GOOGLE_API_KEY: str

    # ── LangSmith ─────────────────────────────────────────────────────────
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = "vakil-ai-dev"

    # ── CORS ──────────────────────────────────────────────────────────────
    FRONTEND_URL: str = "http://localhost:3000"

    # Tells pydantic-settings to look for a .env file in the backend/ directory.
    # In production (Railway), these come from env vars instead — same code, no change needed.
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


# Module-level singleton — import `settings` anywhere in the app.
# FastAPI's dependency injection will also use this via get_settings().
settings = Settings()
