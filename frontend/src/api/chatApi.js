import { API_BASE } from "../config";

export async function askQuestion(q) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: q })
  });
  return res.json();
}
