from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app import models
from app.routes import employee, attendance

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HRMS Lite",
    description="Employee & Attendance Management System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# UPDATED CORS
origins = [
    "http://localhost:5173",             # Local development
    "https://hrmsonline.netlify.app",    # Deployed Netlify frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(employee.router)
app.include_router(attendance.router)

@app.get("/")
def home():
    return {"message": "HRMS Lite backend running"}