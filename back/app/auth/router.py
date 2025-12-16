from fastapi import APIRouter
from app.auth.schemas import SignupRequest, LoginRequest
from app.auth.security import hash_password


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
    return {
        "message": f"user {data.username} logged in"
    }
