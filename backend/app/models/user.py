import uuid
from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone


class User(Base):
    __tablename__ = "users"

    # uuid as primar key
    id: Mapped[str] = mapped_column(String,
                                    primary_key=True,
                                    default=lambda: str(uuid.uuid4))

    # for google's OAuth and signup,login
    google_id: Mapped[str] = mapped_column(String,
                                           unique=True,
                                           nullable=False,
                                           index=True)
    email: Mapped[str] = mapped_column(String,
                                       unique=True,
                                       nullable=False,
                                       index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String, nullable=True)

    # date,time
    create_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # One user → many conversations (defined on Conversation model as back_populates)
    conversations: Mapped[list["Conversation"]] = relationship(
        "Conversation", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email}>"
