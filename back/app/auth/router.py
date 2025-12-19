from fastapi import APIRouter
from app.auth.schemas import SignupRequest, LoginRequest
from app.auth.security import hash_password
from app.auth.security import verify_password


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
        return {"error": "Invalid credentials"}

    if not verify_password(data.password, user["password_hash"]):
        return {"error": "Invalid credentials"}

    return {
        "message": f"user {data.username} logged in"
    }


# for test only - delete later
@router.get("/_debug/users")
def list_users():
    return fake_users_db
