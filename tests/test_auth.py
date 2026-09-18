from datetime import timedelta

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_and_login_user():
    register_payload = {
        "username": "adminuser",
        "email": "admin@example.com",
        "password": "StrongPass123!",
        "role": "admin",
    }

    register_response = client.post("/auth/register", json=register_payload)
    assert register_response.status_code == 201, register_response.json()

    login_response = client.post(
        "/auth/login",
        data={"username": register_payload["username"], "password": register_payload["password"]},
    )
    assert login_response.status_code == 200, login_response.json()
    data = login_response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    me_response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {data['access_token']}"},
    )
    assert me_response.status_code == 200, me_response.json()
    assert me_response.json()["username"] == "adminuser"


def test_admin_only_book_create_and_duplicate_member_email_rejected():
    member_payload = {
        "username": "memberone",
        "email": "memberone@example.com",
        "password": "StrongPass123!",
        "role": "member",
    }
    member_register = client.post("/auth/register", json=member_payload)
    assert member_register.status_code == 201

    member_login = client.post(
        "/auth/login",
        data={"username": member_payload["username"], "password": member_payload["password"]},
    )
    member_token = member_login.json()["access_token"]

    member_book = {
        "title": "Python Basics",
        "author": "John Doe",
        "isbn": "9781234567890",
        "category": "Programming",
        "total_copies": 2,
        "available_copies": 2,
    }

    member_create = client.post(
        "/books",
        json=member_book,
        headers={"Authorization": f"Bearer {member_token}"},
    )
    assert member_create.status_code == 403

    admin_payload = {
        "username": "adminbookmgr",
        "email": "bookmgr@example.com",
        "password": "StrongPass123!",
        "role": "admin",
    }
    admin_register = client.post("/auth/register", json=admin_payload)
    assert admin_register.status_code == 201

    admin_login = client.post(
        "/auth/login",
        data={"username": admin_payload["username"], "password": admin_payload["password"]},
    )
    admin_token = admin_login.json()["access_token"]

    admin_create = client.post(
        "/books",
        json=member_book,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert admin_create.status_code == 201, admin_create.json()

    duplicate_email_member = {
        "full_name": "Member Two",
        "email": "memberone@example.com",
        "phone": "123456789",
        "membership_number": "M-9001",
    }
    duplicate_email_response = client.post(
        "/members",
        json=duplicate_email_member,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert duplicate_email_response.status_code == 400, duplicate_email_response.json()


def test_duplicate_active_loan_is_blocked():
    admin_payload = {
        "username": "loanadmin",
        "email": "loanadmin@example.com",
        "password": "StrongPass123!",
        "role": "admin",
    }
    client.post("/auth/register", json=admin_payload)
    admin_token = client.post(
        "/auth/login",
        data={"username": admin_payload["username"], "password": admin_payload["password"]},
    ).json()["access_token"]

    book_payload = {
        "title": "Loan Rule Book",
        "author": "Jane Reader",
        "isbn": "9789876543210",
        "category": "Fiction",
        "total_copies": 1,
        "available_copies": 1,
    }
    create_book = client.post(
        "/books",
        json=book_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert create_book.status_code == 201, create_book.json()

    member_payload = {
        "username": "loanmember",
        "email": "loanmember@example.com",
        "password": "StrongPass123!",
        "role": "member",
    }
    client.post("/auth/register", json=member_payload)
    member_token = client.post(
        "/auth/login",
        data={"username": member_payload["username"], "password": member_payload["password"]},
    ).json()["access_token"]

    member_data = {
        "full_name": "Loan Member",
        "email": "loanmember2@example.com",
        "phone": "987654321",
        "membership_number": "LM-1001",
    }
    member_response = client.post(
        "/members",
        json=member_data,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert member_response.status_code == 201, member_response.json()

    loan_payload = {
        "book_id": 1,
        "member_id": member_response.json()["id"],
        "due_date": "2099-01-10T00:00:00",
    }
    first_loan = client.post("/loans", json=loan_payload, headers={"Authorization": f"Bearer {member_token}"})
    assert first_loan.status_code == 201, first_loan.json()

    duplicate_loan = client.post("/loans", json=loan_payload, headers={"Authorization": f"Bearer {member_token}"})
    assert duplicate_loan.status_code == 400, duplicate_loan.json()
