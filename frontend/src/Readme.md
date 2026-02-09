HRMS Lite – Full Stack Project Documentation
1. Project Overview
HRMS Lite is a beginner-friendly Human Resource Management System built as a full stack project. It allows an admin to manage employees and their attendance records. The project is designed to demonstrate core full stack development skills including backend APIs, database integration, and frontend UI development.


2. Features Implemented
- Employee Management (Add, View, Update, Delete employees)
- Attendance Management (Mark Present/Absent)
- View attendance records by employee
- Basic dashboard summaries
- REST APIs with FastAPI
- Interactive frontend using React


3. Tech Stack Used
Frontend:
- React (Vite)
- JavaScript
- HTML, CSS

Backend:
- Python 3.11
- FastAPI
- SQLAlchemy

Database:
- PostgreSQL

Tools:
- VS Code
- pgAdmin
- Git & GitHub


4. Software Requirements
Before running the project, install the following software:

1. Python 3.11 (Add Python to PATH during installation)
2. Node.js (LTS version)
3. PostgreSQL
4. pgAdmin
5. VS Code


5. How to Run the Project Locally (Step-by-Step)

Step 1: Clone the Repository
Open terminal or command prompt and run:
git clone <your-github-repo-url>
cd HRMS-Lite

Step 2: Backend Setup
1. Open VS Code
2. Open the backend folder
3. Create a virtual environment:
   python -m venv venv
4. Activate virtual environment:
   venv\Scripts\activate
5. Install dependencies:
   pip install fastapi uvicorn sqlalchemy psycopg2 pydantic email-validator

Step 3: Database Setup
1. Open pgAdmin
2. Create a new database named: hrms_lite
3. Update database credentials in database.py file
4. Tables will be created automatically when backend runs

Step 4: Run Backend Server
In backend folder terminal, run:
uvicorn app.main:app --reload

Backend will run at:
http://127.0.0.1:8000

Swagger API Docs:
http://127.0.0.1:8000/docs

Step 5: Frontend Setup
1. Open frontend folder in VS Code
2. Install dependencies:
   npm install
3. Start frontend server:
   npm run dev

Frontend will run at:
http://localhost:5173


6. Application Workflow

1. Admin adds employees using frontend form
2. Employee data is stored in PostgreSQL database
3. Admin marks attendance for employees
4. Attendance records can be viewed and filtered
5. Frontend communicates with backend APIs


7. Assumptions and Limitations
- Authentication is not implemented
- Single admin system
- UI kept simple for clarity
- Suitable for learning and internship demonstration


8. Future Enhancements
- Login and role-based access
- Monthly attendance reports
- Salary management
- Deployment on cloud
