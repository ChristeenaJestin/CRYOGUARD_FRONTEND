const API = "http://localhost:8000";

export async function getVehicles() {
    const res = await fetch(`${API}/api/vehicles`);
    return res.json();
}

export async function getDashboard() {
    const res = await fetch(`${API}/api/dashboard`);
    return res.json();
}

export async function getAlerts() {
    const res = await fetch(`${API}/api/alerts`);
    return res.json();
}

export async function getAnalytics() {
    const res = await fetch(`${API}/api/analytics`);
    return res.json();
}