import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../api/chatApi";
import Loader from "../components/Loader";
import TopNav from "../components/TopNav";
import { Send, User, Bot } from 'lucide-react';

export default function Chat() {
  const [q, setQ] = useState("");

  // Load initial messages from LocalStorage or use default
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [
      { sender: 'bot', text: "Hey there! I'm FinanceIQ, your personal money buddy. 💰 Ask me about your spending, budgets, or savings!" }
    ];
  });

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save to LocalStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  async function ask() {
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setQ("");
    setLoading(true);

    try {
      const res = await askQuestion(userMsg.text);
      const botMsg = { sender: 'bot', text: res.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { sender: 'bot', text: "⚠️ Oops, I'm having trouble connecting to my brain right now. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <TopNav title="AI Financial Buddy" />

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0', background: 'rgba(10, 11, 24, 0.7)' }}>

        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              {msg.sender === 'bot' && (
                <div style={{
                  minWidth: '35px', height: '35px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                }}>
                  <Bot size={18} color="white" />
                </div>
              )}

              <div style={{
                maxWidth: '70%',
                padding: '12px 18px',
                borderRadius: '18px',
                borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '18px',
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '18px',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                lineHeight: '1.5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                backdropFilter: 'blur(10px)',
                fontSize: '0.95rem'
              }}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  minWidth: '35px', height: '35px', borderRadius: '50%',
                  background: '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={18} color="#94a3b8" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{
                minWidth: '35px', height: '35px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.7
              }}>
                <Bot size={18} color="white" />
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '10px 15px',
                borderRadius: '18px',
                borderTopLeftRadius: '4px',
                color: '#94a3b8',
                fontSize: '0.9rem'
              }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            alignItems: 'center'
          }}>
            <input
              className="chat-input"
              placeholder="Ask FinanceIQ..."
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
                paddingLeft: '15px',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={ask}
              disabled={loading || !q.trim()}
              style={{
                background: q.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: q.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
