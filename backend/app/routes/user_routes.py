from fastapi import APIRouter, Depends
from ..auth.dependencies import get_current_user_id
from ..schemas.user_schema import UserList, UserPublic
from ..database import get_db

router = APIRouter(prefix="/api", tags=["users"])

@router.get("/users", response_model=UserList)
async def list_users(_: str = Depends(get_current_user_id), db=Depends(get_db)):
    users = db["users"]
    cursor = users.find({}, {"password_hash": 0})  # excluir hash
    results = []
    async for u in cursor:
        results.append(
            UserPublic(
                id=str(u["_id"]),
                full_name=u["full_name"],
                email=u["email"],
                phone=u.get("phone"),
            )
        )
    return UserList(users=results)
