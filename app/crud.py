from datetime import datetime

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models import Book, Loan, Member


# Book CRUD

def create_book(db: Session, book_data: dict) -> Book:
    book = Book(**book_data)
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


def get_books(db: Session, skip: int = 0, limit: int = 100, q: str | None = None, author: str | None = None,
             category: str | None = None, isbn: str | None = None, available_only: bool = False):
    query = db.query(Book).filter(Book.is_active == True)

    if q:
        query = query.filter(
            or_(
                Book.title.ilike(f"%{q}%"),
                Book.author.ilike(f"%{q}%"),
                Book.isbn.ilike(f"%{q}%"),
            )
        )
    if author:
        query = query.filter(Book.author.ilike(f"%{author}%"))
    if category:
        query = query.filter(Book.category.ilike(f"%{category}%"))
    if isbn:
        query = query.filter(Book.isbn.ilike(f"%{isbn}%"))
    if available_only:
        query = query.filter(Book.available_copies > 0)

    return query.offset(skip).limit(limit).all()


def get_book_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def get_book_by_isbn(db: Session, isbn: str):
    return db.query(Book).filter(Book.isbn == isbn).first()


def update_book(db: Session, db_book: Book, update_data: dict):
    for field, value in update_data.items():
        if value is not None:
            setattr(db_book, field, value)
    db.commit()
    db.refresh(db_book)
    return db_book


def delete_book(db: Session, db_book: Book):
    db_book.is_active = False
    db.commit()
    db.refresh(db_book)
    return db_book


# Member CRUD

def create_member(db: Session, member_data: dict) -> Member:
    member = Member(**member_data)
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


def get_members(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Member).filter(Member.is_active == True).offset(skip).limit(limit).all()


def get_member_by_id(db: Session, member_id: int):
    return db.query(Member).filter(Member.id == member_id).first()


def get_member_by_email(db: Session, email: str):
    return db.query(Member).filter(Member.email == email).first()


def update_member(db: Session, db_member: Member, update_data: dict):
    for field, value in update_data.items():
        if value is not None:
            setattr(db_member, field, value)
    db.commit()
    db.refresh(db_member)
    return db_member


def delete_member(db: Session, db_member: Member):
    db_member.is_active = False
    db.commit()
    db.refresh(db_member)
    return db_member


# Loan CRUD

def create_loan(db: Session, book: Book, member: Member, due_date: datetime):
    if book.available_copies < 1:
        raise ValueError("No available copies left for this book")

    existing_active = (
        db.query(Loan)
        .filter(Loan.book_id == book.id, Loan.member_id == member.id, Loan.is_returned == False)
        .first()
    )
    if existing_active:
        raise ValueError("This member already has an active loan for this book")

    loan = Loan(book_id=book.id, member_id=member.id, due_date=due_date)
    db.add(loan)
    book.available_copies -= 1
    db.commit()
    db.refresh(loan)
    return loan


def get_loans(db: Session, member_id: int | None = None, status: str | None = None):
    query = db.query(Loan)
    if member_id is not None:
        query = query.filter(Loan.member_id == member_id)
    if status == "active":
        query = query.filter(Loan.is_returned == False)
    elif status == "returned":
        query = query.filter(Loan.is_returned == True)
    elif status == "overdue":
        query = query.filter(Loan.is_returned == False, Loan.due_date < datetime.utcnow())
    return query.all()


def get_loan_by_id(db: Session, loan_id: int):
    return db.query(Loan).filter(Loan.id == loan_id).first()


def calculate_fine(loan: Loan) -> float:
    if loan.is_returned:
        return float(loan.fine_amount)

    if loan.due_date and loan.due_date < datetime.utcnow():
        overdue_days = (datetime.utcnow() - loan.due_date).days
        if overdue_days > 0:
            return overdue_days * 5.0
    return 0.0


def return_book(db: Session, loan: Loan, book: Book):
    if loan.is_returned:
        raise ValueError("This book has already been returned")

    loan.is_returned = True
    loan.returned_at = datetime.utcnow()
    loan.fine_amount = str(calculate_fine(loan))
    book.available_copies += 1
    db.commit()
    db.refresh(loan)
    db.refresh(book)
    return loan


def get_overdue_loans(db: Session):
    overdue = db.query(Loan).filter(Loan.is_returned == False, Loan.due_date < datetime.utcnow()).all()
    for loan in overdue:
        loan.fine_amount = str(calculate_fine(loan))
    return overdue
