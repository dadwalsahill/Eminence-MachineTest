import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Function to handle authenticated requests (automatically sends token)
const authApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Public APIs (No Token Required)
export const register = async (data) => {
  return await api.post("/users/signup", data);
};

export const loginUser = async (data) => {
  return await api.post("/users/signin", data, { withCredentials: true });
};
export const logOutUser = async (data) => {
  return await api.post("/users/logout", data, { withCredentials: true });
};

// Authenticated APIs (Token Required, sent via cookies)
export const verifyToken = async () => {
  return await authApi.get("/users/verify-token");
};

export const getTasks = async () => {
  return await api.get("/tasks/", { withCredentials: true });
};

export const getTask = async (id) => {
  return await authApi.get(`/tasks/${id}`, { withCredentials: true });
};

export const getCompletedTasks = async () => {
  return await authApi.get(`/tasks/completed`, { withCredentials: true });
};

export const getIncompleteTasks = async () => {
  return await authApi.get(`/tasks/incomplete`, { withCredentials: true });
};

export const createTask = async (taskData) => {
  return await authApi.post("/tasks/create", taskData, {
    withCredentials: true,
  });
};

export const updateTask = async (taskId, taskData) => {
  return await authApi.put(`/tasks/update/${taskId}`, taskData, {
    withCredentials: true,
  });
};

export const updateTaskStatus = async (taskId, statusData) => {
  return await authApi.put(`/tasks/update-status/${taskId}`, statusData, {
    withCredentials: true,
  });
};

export const deleteTask = async (id) => {
  return await authApi.delete(`/tasks/delete/${id}`, { withCredentials: true });
};
