import apiClient from "./client";

export const listTasks = () => apiClient.get("/tasks").then((res) => res.data);

export const createTask = (task) =>
  apiClient.post("/tasks", task).then((res) => res.data);

export const updateTask = (id, task) =>
  apiClient.put(`/tasks/${id}`, task).then((res) => res.data);

export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);
