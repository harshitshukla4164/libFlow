from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin, get_current_user
from app.database import get_db

router = APIRouter(prefix="/members", tags=["members"])


@router.post("", response_model=schemas.MemberRead, status_code=status.HTTP_201_CREATED)
def create_member(
    member: schemas.MemberCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    existing = crud.get_member_by_email(db, member.email)
    if existing:
        raise HTTPException(status_code=400, detail="Member with this email already exists")
    return crud.create_member(db, member.model_dump())


@router.get("", response_model=List[schemas.MemberRead])
def read_members(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return crud.get_members(db, skip=skip, limit=limit)


@router.get("/{member_id}", response_model=schemas.MemberRead)
def read_member(member_id: int, db: Session = Depends(get_db)):
    member = crud.get_member_by_id(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


@router.put("/{member_id}", response_model=schemas.MemberRead)
def update_member(member_id: int, member: schemas.MemberUpdate, db: Session = Depends(get_db)):
    db_member = crud.get_member_by_id(db, member_id)
    if not db_member:
        raise HTTPException(status_code=404, detail="Member not found")
    return crud.update_member(db, db_member, member.model_dump(exclude_unset=True))


@router.delete("/{member_id}", response_model=schemas.MemberRead)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    db_member = crud.get_member_by_id(db, member_id)
    if not db_member:
        raise HTTPException(status_code=404, detail="Member not found")
    return crud.delete_member(db, db_member)
