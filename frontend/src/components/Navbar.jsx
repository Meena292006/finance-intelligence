export default function Navbar({ setPage }) {
  return (
    <nav className="nav">
      <h2>Real‑Time Finance AI</h2>
      <div>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("chat")}>AI Chat</button>
        <button onClick={() => setPage("alerts")}>Alerts</button>
      </div>
    </nav>
  );
}
