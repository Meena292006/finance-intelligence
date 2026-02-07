import { API_BASE } from "../config";

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts/`);
  return res.json();
}
