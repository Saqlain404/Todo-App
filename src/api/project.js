import api from "./client";

export const getProjects = () => api.get("/projects").then((res) => res.data);
export const createProject = (name) => api.post("/projects", {name}).then((res) => res.data);
export const renameProject = (id, name) => api.put(`/projects/${id}`, {name}).then((res) => res.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((res) => res.data);