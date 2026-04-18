from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── App ───────────────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    SECRET_KEY: str = "change-me-in-production"

    # ── Database ──────────────────────────────────────────────────────────────
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int 
    DB_NAME: str

    # ── Google OAuth ──────────────────────────────────────────────────────────
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/auth/google/callback"

    # ── Pinecone ──────────────────────────────────────────────────────────────
    PINECONE_API_KEY: str = ""
    PINECONE_INDEX_NAME: str = "vakil-legal"
    PINECONE_ENVIRONMENT: str = "us-east-1"

    # ── Google Gemini ─────────────────────────────────────────────────────────
    GOOGLE_API_KEY: str = ""

    # ── LangSmith ─────────────────────────────────────────────────────────────
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = "vakil-ai-dev"

    # ── CORS ──────────────────────────────────────────────────────────────────
    FRONTEND_URL: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
