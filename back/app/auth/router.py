from fastapi import APIRouter, HTTPException
from app.auth.schemas import SignupRequest, LoginRequest
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token
)

from fastapi import Depends
from app.auth.security import get_current_user

from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.auth import crud


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/signup")
async def signup(
    data: SignupRequest,
    db: AsyncSession = Depends(get_db),
):
    existing_user = await crud.get_user_by_username(
        db, data.username
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists",
        )

    password_hash = hash_password(data.password)

    await crud.create_user(
        db,
        username=data.username,
        password_hash=password_hash,
    )

    return {"message": "User created"}


@router.post("/login")
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    user = await crud.get_user_by_username(
        db, data.username
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not verify_password(
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


# for test only - delete later
@router.get("/_debug/users")
async def list_users(
    db: AsyncSession = Depends(get_db),
):
    return await crud.get_all_users(db)


@router.get("/me")
def me(username: str = Depends(get_current_user)):
    return {"username": username}
