from fastapi import APIRouter, HTTPException
from app.auth.schemas import SignupRequest, LoginRequest
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token
)

from fastapi import Depends
from app.auth.security import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

fake_users_db = {}


@router.post("/signup")
def signup(data: SignupRequest):
    if data.username in fake_users_db:
        return {"error": "User already exists"}

    password_hash = hash_password(data.password)

    fake_users_db[data.username] = {
        "username": data.username,
        "password_hash": password_hash,
    }

    return {
        "message": f"user {data.username} created"
    }


@router.post("/login")
def login(data: LoginRequest):
    user = fake_users_db.get(data.username)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user["username"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# for test only - delete later
@router.get("/_debug/users")
def list_users():
    return fake_users_db


@router.get("/me")
def me(username: str = Depends(get_current_user)):
    return {"username": username}
