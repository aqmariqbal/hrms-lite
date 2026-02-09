from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app import models, schemas


#CREATE employee (with duplicate check)
def create_employee(db: Session, employee: schemas.EmployeeCreate):
    existing = db.query(models.Employee).filter(
        (models.Employee.email == employee.email) |
        (models.Employee.employee_id == employee.employee_id)
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with same email or employee ID already exists"
        )

    new_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


# GET all employees
def get_all_employees(db: Session):
    return db.query(models.Employee).all()


# GET employee by ID (REQUIRED – was missing)
def get_employee_by_id(db: Session, employee_id: int):
    return db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()


# DELETE employee
def delete_employee(db: Session, employee_id: int):
    employee = get_employee_by_id(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()
def update_employee(db: Session, employee_id: int, employee: schemas.EmployeeUpdate):
    db_employee = get_employee_by_id(db, employee_id)

    if not db_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # Optional: email uniqueness check
    existing = db.query(models.Employee).filter(
        models.Employee.email == employee.email,
        models.Employee.id != employee_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already in use by another employee"
        )

    db_employee.full_name = employee.full_name
    db_employee.email = employee.email
    db_employee.department = employee.department

    db.commit()
    db.refresh(db_employee)
    return db_employee
