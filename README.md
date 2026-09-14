# Library Management Backend

This project is a beginner-friendly backend for a library management system built with FastAPI and SQLite.

## Features

- CRUD for books
- CRUD for members
- Borrow and return tracking
- JWT authentication with admin/member roles
- REST API with automatic docs
- SQLite database

## Setup

1. Create a virtual environment
2. Install dependencies
3. Run the app

## Run

```bash
uvicorn app.main:app --reload
```

Then open:
- http://127.0.0.1:8000/docs

## Auth endpoints

- POST /auth/register
- POST /auth/login
- GET /auth/me

## Project structure

- app/main.py: app entry
- app/config.py: settings
- app/database.py: DB engine/session
- app/models.py: SQLAlchemy models
- app/schemas.py: validation schemas
- app/auth.py: JWT and password logic
- app/crud.py: database logic
- app/routers/: API routes
