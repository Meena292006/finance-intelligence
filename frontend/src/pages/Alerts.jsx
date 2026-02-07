import { useEffect, useState } from "react";
import { getAlerts } from "../api/alertsApi";
import AlertCard from "../components/AlertCard";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(data => {
      if (data && data.alerts) {
        setAlerts(data.alerts);
      } else {
        console.error("Invalid alerts data:", data);
        setAlerts([]);
      }
    }).catch(err => {
      console.error("Failed to fetch alerts:", err);
      setAlerts([]);
    });
  }, []);

  return (
    <div className="page">
      <h3>Live Alerts</h3>
      {alerts.map((a, i) => (
        <AlertCard key={i} alert={a} />
      ))}
    </div>
  );
}
