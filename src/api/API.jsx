import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://e64a-178-61-142-203.ngrok-free.app/api",
  // baseURL: "https://e64a-178-61-142-203.ngrok-free.app/api",
});

export default API;
