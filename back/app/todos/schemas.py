from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    category_id: Optional[int] = None
    due_date: Optional[datetime] = None


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    category_id: Optional[int] = None
    due_date: Optional[datetime] = None


class TodoOut(BaseModel):
    id: int
    title: str
    description: str
    completed: bool
    category_id: Optional[int]
    due_date: Optional[datetime]
