from datetime import datetime, timedelta, timezone
from jose import jwt
from ..config import settings

def create_access_token(subject: str) -> str:
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=settings.jwt_expire_minutes)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
