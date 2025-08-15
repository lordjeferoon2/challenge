from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
import re

PASSWORD_REGEX = re.compile(r"^(?=.*[A-Z])(?=.*\d).{8,}$")
PHONE_REGEX = re.compile(r"^\+?[0-9\s\-]{7,15}$")

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str
    phone: Optional[str] = None

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str):
        if not PASSWORD_REGEX.match(v):
            raise ValueError("La contraseña debe tener mínimo 8 caracteres, al menos 1 mayúscula y 1 número.")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]):
        if v and not PHONE_REGEX.match(v):
            raise ValueError("El teléfono no tiene un formato válido.")
        return v

class UserPublic(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    phone: Optional[str] = None

class UserList(BaseModel):
    users: list[UserPublic]
