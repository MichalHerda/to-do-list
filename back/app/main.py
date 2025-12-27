from fastapi import FastAPI
from app.auth.router import router as auth_router
from app.todos.router import router as todos_router
from app.categories.router import router as categories_router
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine                           # noqa: F401
from app.models import User, Category, Todo                     # noqa: F401

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(todos_router)
app.include_router(categories_router)
