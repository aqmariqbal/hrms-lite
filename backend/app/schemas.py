from pydantic import BaseModel, EmailStr
from datetime import date

#employee schemas
class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeUpdate(BaseModel):
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        from_attributes = True



# Attendance Schemas


class AttendanceCreate(BaseModel):
    employee_id: int      # FK → Employee.id
    date: date
    status: str           # Present / Absent


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    status: str

    class Config:
        from_attributes = True
