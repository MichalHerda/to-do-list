from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends

from app.auth.schemas import SignupRequest, LoginRequest
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)
from app.database import get_db
from app.auth import crud


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db),
):
    existing_user = crud.get_user_by_username(
        db, data.username
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists",
        )

    password_hash = hash_password(data.password)

    crud.create_user(
        db,
        username=data.username,
        password_hash=password_hash,
    )

    return {"message": "User created"}


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_username(
        db, data.username
    )

    if not user or not verify_password(
        data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    access_token = create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# for test - delete later:
@router.get("/_debug/users")
def list_users(
    db: Session = Depends(get_db),
):
    return crud.get_all_users(db)


@router.get("/me")
def me(username: str = Depends(get_current_user)):
    return {"username": username}
