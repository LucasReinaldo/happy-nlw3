import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "http://192.168.0.129:3001",
});

export default api;