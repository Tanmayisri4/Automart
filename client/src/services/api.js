import axios from "axios";

const base = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: base.endsWith("/api") ? base : `${base}/api`,
});

export default API;