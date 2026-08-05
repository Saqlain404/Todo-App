import api from "./client";

export const signup = (data) => api.post("/auth/signup", data).then((res) => res.data); 
export const login = (data) => api.post("/auth/login", data).then((res) => res.data);
export const logout = () => api.post("/auth/logout").then((res) => res.data);
export const getMe = () => api.get("/auth/me").then((res) => res.data);