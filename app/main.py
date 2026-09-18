from fastapi import FastAPI

from app.database import Base, engine
from app.routers import auth, books, loans, members

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Library Management API",
    description="Backend for a library management system",
    version="1.0.0",
)

app.include_router(auth.router)
app.include_router(books.router)
app.include_router(members.router)
app.include_router(loans.router)


@app.get("/")
def health_check():
    return {"message": "Library management API is running"}
