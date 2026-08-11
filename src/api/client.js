import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-app-q5ju.onrender.com/api",
  withCredentials: true, // send + receive the httpOnly cookie
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    error.message = message;
    return Promise.reject(error);
  }
);

export default api;