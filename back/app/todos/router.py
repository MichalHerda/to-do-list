from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.auth.security import get_current_user
from app.auth.crud import get_user_by_username
from app.todos.schemas import TodoCreate, TodoUpdate, TodoOut
from app.todos import crud
from app.categories.crud import get_category_by_id


router = APIRouter(
    prefix="/todos",
    tags=["todos"],
)


@router.post("/", response_model=TodoOut)
def create_todo(
    data: TodoCreate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    if data.category_id is not None:
        category = get_category_by_id(
            db,
            category_id=data.category_id,
            user=user,
        )
        if not category:
            raise HTTPException(
                status_code=400,
                detail="Invalid category",
            )

    return crud.create_todo(
        db,
        user=user,
        title=data.title,
        description=data.description or "",
        category_id=data.category_id,
        due_date=data.due_date,
    )


@router.get("/", response_model=List[TodoOut])
def list_todos(
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    return crud.get_todos_for_user(db, user)


@router.patch("/{todo_id}", response_model=TodoOut)
def update_todo(
    todo_id: int,
    data: TodoUpdate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    todo = crud.get_todo_by_id(
        db,
        todo_id=todo_id,
        user=user,
    )
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    if data.category_id is not None:
        category = get_category_by_id(
            db,
            category_id=data.category_id,
            user=user,
        )
        if not category:
            raise HTTPException(
                status_code=400,
                detail="Invalid category",
            )

    return crud.update_todo(db, todo=todo, data=data)


@router.delete("/{todo_id}")
def delete_todo(
    todo_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    todo = crud.get_todo_by_id(
        db,
        todo_id=todo_id,
        user=user,
    )
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    crud.delete_todo(db, todo=todo)
    return {"message": "Todo deleted"}
