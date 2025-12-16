from fastapi import APIRouter
from app.auth.schemas import SignupRequest, LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/signup")
def signup(data: SignupRequest):
    return {
        "message": f"user {data.username} created"
    }


@router.post("/login")
def login(data: LoginRequest):
    return {
        "message": f"user {data.username} logged in"
    }
