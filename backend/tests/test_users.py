def _register_and_login(client):
    client.post("/api/api/register", json={
        "full_name": "Alpha",
        "email": "alpha@example.com",
        "password": "StrongPass1"
    })
    r = client.post("/api/api/login", json={
        "email": "alpha@example.com",
        "password": "StrongPass1"
    })
    return r.json()["access_token"]

def test_users_unauthorized(client):
    r = client.get("/api/api/users")
    assert r.status_code == 403 or r.status_code == 401  # HTTPBearer devuelve 403 si falta header

def test_users_authorized(client):
    token = _register_and_login(client)
    r = client.get("/api/api/users", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    body = r.json()
    assert "users" in body
    assert isinstance(body["users"], list)
    assert len(body["users"]) == 1
    assert body["users"][0]["email"] == "alpha@example.com"
