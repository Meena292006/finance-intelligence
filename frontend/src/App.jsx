import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Alerts from "./pages/Alerts";
import CursorSparks from "./components/CursorSparks";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <CursorSparks />
      <Navbar setPage={setPage} />
      {page === "dashboard" && <Dashboard />}
      {page === "chat" && <Chat />}
      {page === "alerts" && <Alerts />}
    </>
  );
}
