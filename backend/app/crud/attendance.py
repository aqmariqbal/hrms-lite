from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import HTTPException

def mark_attendance(db: Session, attendance: schemas.AttendanceCreate):
    record = models.Attendance(**attendance.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_attendance_by_employee(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()

def get_attendance_by_date(db: Session, date):
    return db.query(models.Attendance).filter(
        models.Attendance.date == date
    ).all()

def count_present_days(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.status == "Present"
    ).count()
