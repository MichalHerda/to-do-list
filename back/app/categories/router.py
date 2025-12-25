from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.auth.security import get_current_user
from app.categories.schemas import CategoryCreate, CategoryOut, CategoryUpdate

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

fake_categories_db = {}
category_id_counter = 1


@router.post("/", response_model=CategoryOut)
def create_category(
    data: CategoryCreate,
    username: str = Depends(get_current_user)
):
    global category_id_counter

    user_categories = fake_categories_db.setdefault(username, [])

    category = {
        "id": category_id_counter,
        "name": data.name
    }

    category_id_counter += 1
    user_categories.append(category)

    return category


@router.get("/", response_model=List[CategoryOut])
def list_categories(username: str = Depends(get_current_user)):
    return fake_categories_db.get(username, [])


@router.patch("/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: int,
    data: CategoryUpdate,
    username: str = Depends(get_current_user)
):
    categories = fake_categories_db.get(username, [])

    for category in categories:
        if category["id"] == category_id:
            category["name"] = data.name
            return category

    raise HTTPException(status_code=404, detail="Category not found")


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    username: str = Depends(get_current_user)
):
    categories = fake_categories_db.get(username, [])

    for i, category in enumerate(categories):
        if category["id"] == category_id:
            categories.pop(i)
            return {"message": "Category deleted"}

    raise HTTPException(status_code=404, detail="Category not found")
