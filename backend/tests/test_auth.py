def test_register_success(client):
    payload = {
        "full_name": "Jane Doe",
        "email": "jane@example.com",
        "password": "StrongPass1",
        "phone": "+51987654321"
    }
    r = client.post("/api/api/register", json=payload)
    assert r.status_code == 201
    data = r.json()
    assert data["email"] == "jane@example.com"
    assert "id" in data
    assert "password" not in data

def test_register_duplicate_email(client):
    p = {
        "full_name": "User One",
        "email": "dup@example.com",
        "password": "StrongPass1"
    }
    r1 = client.post("/api/api/register", json=p)
    assert r1.status_code == 201
    r2 = client.post("/api/api/register", json=p)
    assert r2.status_code == 409

def test_register_invalid_password(client):
    bad = {
        "full_name": "Weak User",
        "email": "weak@example.com",
        "password": "weak",  # inválido: no mayúscula/numero/8 chars
    }
    r = client.post("/api/api/register", json=bad)
    assert r.status_code == 422  # Pydantic validation error

def test_login_success(client):
    client.post("/api/api/register", json={
        "full_name": "John Smith",
        "email": "john@example.com",
        "password": "StrongPass1"
    })
    r = client.post("/api/api/login", json={
        "email": "john@example.com",
        "password": "StrongPass1"
    })
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(client):
    # usuario no existe
    r = client.post("/api/api/login", json={
        "email": "nope@example.com",
        "password": "StrongPass1"
    })
    assert r.status_code == 401
