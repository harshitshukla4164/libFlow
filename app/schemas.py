from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    author: str = Field(..., min_length=1, max_length=200)
    isbn: str = Field(..., min_length=10, max_length=20)
    category: str = Field(..., min_length=1, max_length=100)
    total_copies: int = Field(..., ge=1)
    available_copies: int = Field(..., ge=0)

    @field_validator("available_copies")
    @classmethod
    def validate_available(cls, value: int, info):
        total = info.data.get("total_copies")
        if total is not None and value > total:
            raise ValueError("available_copies cannot be greater than total_copies")
        return value


class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    author: Optional[str] = Field(None, min_length=1, max_length=200)
    isbn: Optional[str] = Field(None, min_length=10, max_length=20)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    total_copies: Optional[int] = Field(None, ge=1)
    available_copies: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None


class BookRead(BookBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class MemberBase(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    membership_number: str = Field(..., min_length=3, max_length=50)


class MemberCreate(MemberBase):
    pass


class MemberUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1, max_length=200)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20)
    membership_number: Optional[str] = Field(None, min_length=3, max_length=50)
    is_active: Optional[bool] = None


class MemberRead(MemberBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class LoanBase(BaseModel):
    book_id: int
    member_id: int
    due_date: datetime


class LoanCreate(LoanBase):
    pass


class LoanRead(LoanBase):
    id: int
    borrowed_at: datetime
    due_date: datetime
    returned_at: Optional[datetime] = None
    is_returned: bool
    fine_amount: str = "0.00"

    class Config:
        from_attributes = True


class OverdueLoanRead(BaseModel):
    loan_id: int
    member_id: int
    book_id: int
    due_date: datetime
    fine_amount: str

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    role: str = Field(default="member", pattern="^(admin|member)$")


class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
