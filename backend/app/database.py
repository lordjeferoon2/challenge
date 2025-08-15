from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

def get_client() -> AsyncIOMotorClient:
    global client
    if client is None:
        client = AsyncIOMotorClient(settings.mongodb_uri)
    return client

def get_db():
    return get_client()[settings.mongodb_db]

def close_client():
    global client
    if client is not None:
        client.close()
        client = None
