from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import EmailStr
from ..schemas.user_schema import UserCreate, UserPublic
from ..schemas.auth_schema import LoginRequest, TokenResponse
from ..database import get_db
from ..auth.hashing import hash_password, verify_password
from ..auth.jwt_handler import create_access_token
from ..models.user_model import UserInDB
from bson import ObjectId

router = APIRouter(prefix="/api", tags=["auth"])

@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db=Depends(get_db)):
    users = db["users"]

    # Normalizar email (minúsculas y sin espacios)
    email_normalized = payload.email.strip().lower()

    # Verificar si ya existe
    existing = await users.find_one({"email": email_normalized})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El email ya está registrado"
        )

    # Documento a insertar
    doc = {
        "full_name": payload.full_name,
        "email": email_normalized,
        "password_hash": hash_password(payload.password),
        "phone": payload.phone,
    }

    try:
        result = await users.insert_one(doc)
    except Exception as e:
        # Captura errores de índice único si existe
        if "E11000 duplicate key error" in str(e):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El email ya está registrado"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al registrar el usuario"
        )

    return UserPublic(
        id=str(result.inserted_id),
        full_name=payload.full_name,
        email=email_normalized,
        phone=payload.phone,
    )

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db=Depends(get_db)):
    users = db["users"]
    user = await users.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")

    token = create_access_token(str(user["_id"]))
    return TokenResponse(access_token=token)
