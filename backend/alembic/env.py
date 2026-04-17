"""
alembic/env.py — Alembic migration environment

Two key customizations from the default:
  1. DATABASE_URL comes from our pydantic-settings (reads .env) — not alembic.ini
  2. target_metadata points to our Base so Alembic can auto-generate migrations
     by comparing ORM models to the actual database schema

How to use:
  # Generate a migration after changing a model:
  alembic revision --autogenerate -m "add users table"

  # Apply all pending migrations:
  alembic upgrade head

  # Roll back one step:
  alembic downgrade -1
"""

from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# Import our app's config and Base so Alembic knows the DB URL and all models.
# Importing the model files here ensures they register with Base.metadata.
from app.core.config import settings
from app.core.database import Base
import app.models.user  # noqa: F401 — registers User with Base.metadata
import app.models.conversation  # noqa: F401 — registers Conversation + Message

alembic_config = context.config

if alembic_config.config_file_name is not None:
    fileConfig(alembic_config.config_file_name)

# Point Alembic at the same metadata object that our ORM models are registered on.
# This enables --autogenerate: Alembic diffs models vs DB and writes the migration.
target_metadata = Base.metadata

# Override the sqlalchemy.url in alembic.ini with our settings value.
# This means you never have to hardcode credentials in alembic.ini.
alembic_config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)


def run_migrations_offline() -> None:
    url = alembic_config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        alembic_config.get_section(alembic_config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
