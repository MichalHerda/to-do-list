from sqlalchemy.orm import Session
from app.models import Category, User


def create_category(
    db: Session,
    *,
    name: str,
    user: User,
) -> Category:
    category = Category(
        name=name,
        user_id=user.id,
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def get_categories_for_user(
    db: Session,
    user: User,
):
    return (
        db.query(Category)
        .filter(Category.user_id == user.id)
        .all()
    )


def get_category_by_id(
    db: Session,
    category_id: int,
    user: User,
) -> Category | None:
    return (
        db.query(Category)
        .filter(
            Category.id == category_id,
            Category.user_id == user.id,
        )
        .first()
    )


def update_category(
    db: Session,
    *,
    category: Category,
    name: str,
) -> Category:
    category.name = name
    db.commit()
    db.refresh(category)
    return category


def delete_category(
    db: Session,
    *,
    category: Category,
):
    db.delete(category)
    db.commit()
