from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class UserInDB(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    full_name: str
    email: EmailStr
    password_hash: str
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
