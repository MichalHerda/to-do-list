from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.auth.security import get_current_user
from app.auth.crud import get_user_by_username
from app.categories.schemas import (
    CategoryCreate,
    CategoryOut,
    CategoryUpdate,
)
from app.categories import crud


router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)


@router.post("/", response_model=CategoryOut)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    return crud.create_category(
        db,
        name=data.name,
        user=user,
    )


@router.get("/", response_model=List[CategoryOut])
def list_categories(
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    return crud.get_categories_for_user(db, user)


@router.patch("/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    category = crud.get_category_by_id(db, category_id, user)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    return crud.update_category(
        db,
        category=category,
        name=data.name,
    )


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_user),
):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    category = crud.get_category_by_id(db, category_id, user)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    crud.delete_category(db, category=category)
    return {"message": "Category deleted"}
