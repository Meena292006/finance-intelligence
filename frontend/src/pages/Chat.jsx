import { useState } from "react";
import { askQuestion } from "../api/chatApi";
import Loader from "../components/Loader";
import TopNav from "../components/TopNav";
import { Send } from 'lucide-react';

export default function Chat() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!q.trim()) return;

    setLoading(true);
    setAns("");
    try {
      const res = await askQuestion(q);
      setAns(res.reply || "Thinking...");
    } catch (err) {
      console.error("Chat error:", err);
      setAns("Sorry, I couldn't reach the financial advisor. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <TopNav title="AI Financial Advisor" />

      <div className="card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
          {!ans && !loading && (
            <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-dim)' }}>
              <div className="sphere" style={{ width: '100px', height: '100px', margin: '0 auto 20px' }} />
              <h3>How can I help with your finances today?</h3>
              <p>Ask about your spending, set budgets, or get investment insights.</p>
            </div>
          )}

          {ans && (
            <div className="answer" style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid var(--border)',
              lineHeight: '1.8'
            }}>
              <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>AI Advisor:</div>
              {ans}
            </div>
          )}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Loader />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '15px', background: '#0a0b18', padding: '10px', borderRadius: '15px', border: '1px solid var(--border)' }}>
          <input
            className="chat-input"
            placeholder="Ask about your Amazon spending..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && ask()}
            disabled={loading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'white',
              outline: 'none',
              paddingLeft: '15px'
            }}
          />
          <button
            className="icon-btn"
            onClick={ask}
            disabled={loading}
            style={{ background: 'var(--primary)', color: 'white', borderRadius: '12px' }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
