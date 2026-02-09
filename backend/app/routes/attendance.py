from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas
from app.crud import attendance as attendance_crud
from datetime import date

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/")
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return attendance_crud.mark_attendance(db, attendance)

@router.get("/employee/{employee_id}")
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    return attendance_crud.get_attendance_by_employee(db, employee_id)

@router.get("/date/{date}")
def get_attendance_by_date(date: date, db: Session = Depends(get_db)):
    return attendance_crud.get_attendance_by_date(db, date)

@router.get("/summary/{employee_id}")
def attendance_summary(employee_id: int, db: Session = Depends(get_db)):
    return {
        "present_days": attendance_crud.count_present_days(db, employee_id)
    }
