from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.auth.security import get_current_user
from app.todos.schemas import TodoCreate, TodoUpdate, TodoOut

router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

fake_todos_db = {}
todo_id_counter = 1


@router.post("/", response_model=TodoOut)
def create_todo(
    data: TodoCreate,
    username: str = Depends(get_current_user)
):
    global todo_id_counter

    user_todos = fake_todos_db.setdefault(username, [])

    todo = {
        "id": todo_id_counter,
        "title": data.title,
        "description": data.description or "",
        "completed": False,
        "category_id": data.category_id,
    }

    todo_id_counter += 1
    user_todos.append(todo)

    return todo


@router.get("/", response_model=List[TodoOut])
def list_todos(username: str = Depends(get_current_user)):
    return fake_todos_db.get(username, [])


@router.patch("/{todo_id}", response_model=TodoOut)
def update_todo(
    todo_id: int,
    data: TodoUpdate,
    username: str = Depends(get_current_user)
):
    todos = fake_todos_db.get(username, [])

    for todo in todos:
        if todo["id"] == todo_id:
            if data.title is not None:
                todo["title"] = data.title
            if data.description is not None:
                todo["description"] = data.description
            if data.completed is not None:
                todo["completed"] = data.completed
            if data.category_id is not None:
                todo["category_id"] = data.category_id

            return todo

    raise HTTPException(status_code=404, detail="Todo not found")


@router.delete("/{todo_id}")
def delete_todo(
    todo_id: int,
    username: str = Depends(get_current_user)
):
    todos = fake_todos_db.get(username, [])

    for i, todo in enumerate(todos):
        if todo["id"] == todo_id:
            todos.pop(i)
            return {"message": "Todo deleted"}

    raise HTTPException(status_code=404, detail="Todo not found")
