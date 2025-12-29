from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # Relationships
    todos = relationship(
        "Todo",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    categories = relationship(
        "Category",
        back_populates="user",
        cascade="all, delete-orphan",
    )
