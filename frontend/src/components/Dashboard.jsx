// Employee Dashboard [DRAFT]

import React, { useEffect, useState } from "react";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    Employee_ID: "",
    First_Name: "",
    Last_Name: "",
    DOB: "",
    Aadhaar: "",
    PAN: "",
    DL: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load all records
  const loadEmployees = async () => {
    const { data } = await fetchEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Form data handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateEmployee(editingId, formData);
    } else {
      await createEmployee(Object.values(formData));
    }
    setFormData({
      EmployeeID: "",
      First_Name: "",
      Last_Name: "",
      DOB: "",
      Aadhaar: "",
      PAN: "",
      DL: "",
    });
    setEditingId(null);
    loadEmployees();
  };

  const handleEdit = (emp) => {
    setEditingId(emp.Employee_ID);
    setFormData(emp);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">HR Tracker</h1>

      {/* Form section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              required={field !== "DL"}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Employee records table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              {Object.keys(formData).map((header) => (
                <th key={header} className="px-4 py-2">
                  {header}
                </th>
              ))}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.Employee_ID} className="border-b hover:bg-gray-50">
                {Object.keys(formData).map((key) => (
                  <td key={key} className="px-4 py-2">
                    {emp[key]}
                  </td>
                ))}
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.Employee_ID)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="100%" className="text-center py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
