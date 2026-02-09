import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  markAttendance,
  getAttendanceByEmployee,
  getAttendanceSummary,
} from "./api";
import "./index.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [selectedEmp, setSelectedEmp] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  const [attendanceForm, setAttendanceForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  // Load employees
  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Employee submit
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateEmployee(editingId, form);
    } else {
      await addEmployee(form);
    }

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });
    setEditingId(null);
    loadEmployees();
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department,
    });
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  // Attendance
  const loadAttendance = async (empId) => {
    const records = await getAttendanceByEmployee(empId);
    const sum = await getAttendanceSummary(empId);
    setAttendance(records);
    setSummary(sum.present_days);
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    await markAttendance(attendanceForm);
    loadAttendance(attendanceForm.employee_id);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>HRMS Lite</h1>
        <p>Employee & Attendance Management</p>
      </header>

      {/* ================= EMPLOYEE SECTION ================= */}
      <div className="card">
        <h2>{editingId ? "Update Employee" : "Add Employee"}</h2>

        <form className="form" onSubmit={handleEmployeeSubmit}>
          <input
            placeholder="Employee ID"
            value={form.employee_id}
            disabled={editingId !== null}
            required
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
          />
          <input
            placeholder="Full Name"
            value={form.full_name}
            required
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            placeholder="Department"
            value={form.department}
            required
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <button className="primary-btn">
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>

      {/* ================= EMPLOYEE LIST ================= */}
      <div className="card">
        <h2>Employees</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td className="actions">
                  <button
                    className="secondary-btn"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="danger-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ATTENDANCE SECTION ================= */}
      <div className="card">
        <h2>Mark Attendance</h2>

        <form className="form" onSubmit={handleAttendanceSubmit}>
          <select
            required
            onChange={(e) => {
              setSelectedEmp(e.target.value);
              setAttendanceForm({
                ...attendanceForm,
                employee_id: e.target.value,
              });
              loadAttendance(e.target.value);
            }}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            required
            onChange={(e) =>
              setAttendanceForm({
                ...attendanceForm,
                date: e.target.value,
              })
            }
          />

          <select
            onChange={(e) =>
              setAttendanceForm({
                ...attendanceForm,
                status: e.target.value,
              })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button className="primary-btn">Mark Attendance</button>
        </form>
      </div>

      {/* ================= SUMMARY ================= */}
      {summary !== null && (
        <div className="card summary">
          <h3>Total Present Days</h3>
          <span>{summary}</span>
        </div>
      )}

      {/* ================= ATTENDANCE TABLE ================= */}
      {attendance.length > 0 && (
        <div className="card">
          <h2>Attendance Records</h2>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td
                    className={
                      a.status === "Present"
                        ? "status-present"
                        : "status-absent"
                    }
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
