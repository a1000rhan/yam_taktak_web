import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const API = axios.create({
  // baseURL: "http://localhost:3030/api",
  // baseURL: "https://e64a-178-61-142-203.ngrok-free.app/api",
  baseURL: `${apiUrl}/api`,
});

export default API;
