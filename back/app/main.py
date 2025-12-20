from fastapi import FastAPI
from app.auth.router import router as auth_router
from app.todos.router import router as todos_router
from app.categories.router import router as categories_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(todos_router)
app.include_router(categories_router)
