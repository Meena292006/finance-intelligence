import { useState } from "react";
import { askQuestion } from "../api/chatApi";

export default function Chat() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");

  async function ask() {
    const res = await askQuestion(q);
    setAns(res.reply);
  }

  return (
    <div className="page">
      <h3>Ask the Finance AI</h3>

      <input
        className="chat-input"
        placeholder="Can I afford a movie tonight?"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="chat-button" onClick={ask}>Ask</button>

      {ans && <div className="answer">{ans}</div>}
    </div>
  );
}
