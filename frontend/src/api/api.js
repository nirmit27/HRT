// Handling API calls

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// CRUD ops.
export const fetchEmployees = () => API.get("/crud/all");

export const createEmployee = (data) => API.post("/crud/create", data);

export const updateEmployee = (empId, updatedData) =>
  API.post("/crud/update", [empId, updatedData]);

export const deleteEmployee = (empId) => API.post(`/crud/delete/${empId}`);
