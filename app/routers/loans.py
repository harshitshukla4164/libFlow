from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin, get_current_user
from app.database import get_db

router = APIRouter(prefix="/loans", tags=["loans"])


@router.post("", response_model=schemas.LoanRead, status_code=status.HTTP_201_CREATED)
def create_loan(
    loan: schemas.LoanCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    book = crud.get_book_by_id(db, loan.book_id)
    member = crud.get_member_by_id(db, loan.member_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    try:
        return crud.create_loan(db, book, member, loan.due_date)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("", response_model=list[schemas.LoanRead])
def read_loans(
    member_id: int | None = None,
    status: str | None = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return crud.get_loans(db, member_id=member_id, status=status)


@router.get("/{loan_id}", response_model=schemas.LoanRead)
def read_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    loan = crud.get_loan_by_id(db, loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return loan


@router.post("/{loan_id}/return", response_model=schemas.LoanRead)
def return_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    loan = crud.get_loan_by_id(db, loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    book = crud.get_book_by_id(db, loan.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    try:
        return crud.return_book(db, loan, book)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/overdue", response_model=list[schemas.OverdueLoanRead])
def overdue_loans(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return crud.get_overdue_loans(db)
