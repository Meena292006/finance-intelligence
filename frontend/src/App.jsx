import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Alerts from "./pages/Alerts";
import CursorSparks from "./components/CursorSparks";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-container">
      <CursorSparks />
      <Sidebar activePage={page} setPage={setPage} />

      <main className="main-content">
        {page === "dashboard" && <Dashboard />}
        {page === "chat" && <Chat />}
        {page === "alerts" && <Alerts />}
      </main>
    </div>
  );
}
