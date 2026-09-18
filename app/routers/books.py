from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin, get_current_user
from app.database import get_db
from app.models import Book

router = APIRouter(prefix="/books", tags=["books"])


@router.post("", response_model=schemas.BookRead, status_code=status.HTTP_201_CREATED)
def create_book(
    book: schemas.BookCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    existing = db.query(Book).filter(Book.isbn == book.isbn).first()
    if existing:
        raise HTTPException(status_code=400, detail="Book with this ISBN already exists")
    return crud.create_book(db, book.model_dump())


@router.get("", response_model=List[schemas.BookRead])
def read_books(
    q: str | None = None,
    author: str | None = None,
    category: str | None = None,
    isbn: str | None = None,
    available_only: bool = False,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.get_books(
        db,
        skip=skip,
        limit=limit,
        q=q,
        author=author,
        category=category,
        isbn=isbn,
        available_only=available_only,
    )


@router.get("/{book_id}", response_model=schemas.BookRead)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.put("/{book_id}", response_model=schemas.BookRead)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    db_book = crud.get_book_by_id(db, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.update_book(db, db_book, book.model_dump(exclude_unset=True))


@router.delete("/{book_id}", response_model=schemas.BookRead)
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    db_book = crud.get_book_by_id(db, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.delete_book(db, db_book)
