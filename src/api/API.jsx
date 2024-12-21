import axios from "axios";
// const apiUrl = process.env.REACT_APP_API_URL;
const API = axios.create({
  // baseURL: "http://localhost:3030/api",
  baseURL: "https://ma3lomatkw.com/api",
});

export default API;
