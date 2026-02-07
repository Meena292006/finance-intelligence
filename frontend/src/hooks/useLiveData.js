import { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function useLiveData() {
  const [stats, setStats] = useState({ total: 0, avg: 0, count: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE}/insights`);
      const data = await res.json();
      setStats(data.stats);
      setTransactions(data.recent);
    }, 2000); // real-time illusion

    return () => clearInterval(interval);
  }, []);

  return { stats, transactions };
}
