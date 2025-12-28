from sqlalchemy.orm import Session
from app.models import Todo, User


def create_todo(
    db: Session,
    *,
    user: User,
    title: str,
    description: str,
    category_id: int | None,
    due_date,
) -> Todo:
    todo = Todo(
        title=title,
        description=description,
        user_id=user.id,
        category_id=category_id,
        due_date=due_date,
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def get_todos_for_user(
    db: Session,
    user: User,
):
    return (
        db.query(Todo)
        .filter(Todo.user_id == user.id)
        .all()
    )


def get_todo_by_id(
    db: Session,
    *,
    todo_id: int,
    user: User,
) -> Todo | None:
    return (
        db.query(Todo)
        .filter(
            Todo.id == todo_id,
            Todo.user_id == user.id,
        )
        .first()
    )


def update_todo(
    db: Session,
    *,
    todo: Todo,
    data,
) -> Todo:
    for field, value in data.dict(exclude_unset=True).items():
        setattr(todo, field, value)

    db.commit()
    db.refresh(todo)
    return todo


def delete_todo(
    db: Session,
    *,
    todo: Todo,
):
    db.delete(todo)
    db.commit()
