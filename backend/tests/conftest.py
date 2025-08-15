import os
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.database import get_db, get_client

TEST_DB_NAME = "fs_users_db_test"

@pytest.fixture(scope="session", autouse=True)
def _set_test_env():
    os.environ["MONGODB_DB"] = TEST_DB_NAME

@pytest.fixture(scope="session")
def client():
    # Inicializa TestClient una sola vez
    with TestClient(app) as c:
        yield c

@pytest.fixture(autouse=True)
def clean_db():
    # Limpia la colección users antes de cada test
    db = get_db()
    db["users"].delete_many({})
    yield
    db["users"].delete_many({})

@pytest.fixture(scope="session", autouse=True)
def drop_test_db_on_finish():
    yield
    # Al finalizar toda la sesión de tests, borrar la DB de pruebas
    client = get_client()
    client.drop_database(TEST_DB_NAME)
