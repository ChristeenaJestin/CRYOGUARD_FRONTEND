import axios from "axios";

const API = axios.create({
  baseURL: "https://coldchain-ai-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// Vehicles
// ==========================
export const getVehicles = async () => {
  const res = await API.get("/api/vehicles/");
  return res.data;
};

// ==========================
// Telemetry
// ==========================
export const getTelemetry = async () => {
  const res = await API.get("/api/telemetry/");
  return res.data;
};

// ==========================
// Alerts
// ==========================
export const getAlerts = async () => {
  const res = await API.get("/api/alerts/");
  return res.data;
};

// ==========================
// Analytics
// ==========================
export const getAnalytics = async () => {
  const res = await API.get("/api/analytics/");
  return res.data;
};

// ==========================
// Health
// ==========================
export const getHealth = async () => {
  const res = await API.get("/api/health/");
  return res.data;
};

// ==========================
// AI Analysis
// ==========================
export const analyzeVehicle = async (data) => {
  const res = await API.post("/api/ai/analyze", data);
  return res.data;
};

export default API;