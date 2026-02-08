import { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function useLiveData() {
  const [stats, setStats] = useState({ total: 0, avg: 0, count: 0, credit_score: 803 });
  const [transactions, setTransactions] = useState([]);
  const [trend, setTrend] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/insights`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        
        if (data.error) {
          console.error("Backend error:", data.error);
          return;
        }

        if (data.stats) setStats(data.stats);
        if (data.recent) setTransactions(data.recent);
        if (data.trend) setTrend(data.trend);
        if (data.categories) setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch live data:", err);
      }
    };

    fetchData(); // Fetch immediately
    const interval = setInterval(fetchData, 3000); // Polling every 3s

    return () => clearInterval(interval);
  }, []);

  return { stats, transactions, trend, categories };
}
