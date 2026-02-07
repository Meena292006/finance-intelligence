import { API_BASE } from "../config";

export async function getInsights() {
  const res = await fetch(`${API_BASE}/insights`);
  return res.json();
}
