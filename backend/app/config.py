from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str
    mongodb_db: str
    jwt_secret: str
    jwt_algorithm: str
    jwt_expire_minutes: int
    frontend_origins: str

    class Config:
        env_file = ".env"

settings = Settings()
