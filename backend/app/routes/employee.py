from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas
from app.crud import employee as employee_crud

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

# ✅ CREATE employee
@router.post("/", response_model=schemas.EmployeeResponse)
def add_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    return employee_crud.create_employee(db, employee)


# ✅ GET all employees
@router.get("/", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return employee_crud.get_all_employees(db)


# ✅ GET employee by ID (NEW & REQUIRED)
@router.get("/{employee_id}", response_model=schemas.EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = employee_crud.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


# ✅ DELETE employee
@router.delete("/{employee_id}")
def remove_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = employee_crud.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee_crud.delete_employee(db, employee_id)
    return {"message": "Employee deleted successfully"}

@router.put("/{employee_id}", response_model=schemas.EmployeeResponse)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_db)
):
    return employee_crud.update_employee(db, employee_id, employee)
