import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3030/api",
  // baseURL: "https://e64a-178-61-142-203.ngrok-free.app/api",
  // baseURL: "https://api.ma3lomatkw.com/api",
});

export default API;
