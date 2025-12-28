from logging.config import fileConfig
import os
from dotenv import load_dotenv

from sqlalchemy import pool                                 # noqa
from sqlalchemy import create_engine                        # noqa
from alembic import context

# Import modeli i bazy
from app.database import Base, engine as sync_engine
target_metadata = Base.metadata

from app.models import User, Category, Todo  # noqa

# Załaduj zmienne środowiskowe z .env
load_dotenv()

# Alembic Config object
config = context.config

# Configure logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata modeli SQLAlchemy (do autogenerowania migracji)
target_metadata = Base.metadata


# ---- OFFLINE MODE ----
def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = os.environ.get("DATABASE_URL")
    if not url:
        raise RuntimeError("DATABASE_URL is not set in .env")

    # Offline: używamy sync driver
    url_sync = url.replace("postgresql://", "postgresql+psycopg2://")

    context.configure(
        url=url_sync,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


# ---- ONLINE MODE ----
def run_migrations_online():
    """Run migrations w 'online' mode z sync_engine."""
    connectable = sync_engine

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
