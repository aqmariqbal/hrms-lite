const BASE_URL = "http://127.0.0.1:8000";

/* =======================
   EMPLOYEE APIs
======================= */

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
};

export const addEmployee = async (employee) => {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
};

export const updateEmployee = async (id, employee) => {
  const res = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
};

export const deleteEmployee = async (id) => {
  await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
};


/* =======================
   ATTENDANCE APIs
======================= */

export const markAttendance = async (attendance) => {
  const res = await fetch(`${BASE_URL}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attendance),
  });
  return res.json();
};

export const getAttendanceByEmployee = async (employeeId) => {
  const res = await fetch(
    `${BASE_URL}/attendance/employee/${employeeId}`
  );
  return res.json();
};

export const getAttendanceSummary = async (employeeId) => {
  const res = await fetch(
    `${BASE_URL}/attendance/summary/${employeeId}`
  );
  return res.json();
};
