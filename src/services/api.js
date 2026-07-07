const API = "http://127.0.0.1:8000";

export async function getVehicles() {
    const res = await fetch(`${API}/api/vehicles/`);
    return res.json();
}

export async function getAnalytics() {
    const res = await fetch(`${API}/api/analytics/`);
    return res.json();
}

export async function getAlerts() {
    const res = await fetch(`${API}/api/alerts/`);
    return res.json();
}

export async function getTelemetry() {
    const res = await fetch(`${API}/api/telemetry/`);
    return res.json();
}

export async function analyzeVehicle(vehicleId) {
    const res = await fetch(`${API}/api/ai/analyze`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            vehicle_id: vehicleId,
        }),
    });

    return res.json();
}