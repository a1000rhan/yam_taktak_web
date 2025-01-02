import axios from "axios";

console.log("🚀 ~ baseURL:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  // baseURL: "https://ma3lomatkw.com/api",
});

export default API;
