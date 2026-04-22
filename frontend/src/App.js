import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [memory, setMemory] = useState({
    facts: [],
    topics: [],
    vectors: []
  });

  const loadMemory = async () => {
    try {
      const res = await axios.get("/api/memory");
      setMemory(res.data);
    } catch {}
  };

  useEffect(() => {
    loadMemory();
  }, []);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {

      const res = await axios.post("/api/chat", {
        message: input
      });

      const aiMsg = {
        role: "ai",
        text: res.data.reply
      };

      setMessages(prev => [...prev, aiMsg]);

      loadMemory();

    } catch {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "AI Error" }
      ]);
    }

    setLoading(false);
  };

  return (

    <div className="app">

      <div className="chat-area">

        <div className="chat-header">
          🤖 Memora AI
        </div>

        <div className="messages">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "user-msg" : "ai-msg"}
            >
              {msg.text}
            </div>
          ))}

          {loading && <div className="ai-msg">AI thinking...</div>}

        </div>

        <div className="input-bar">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything... I remember your context 😉"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

      {/* MEMORY DASHBOARD */}
      <div className="memory-panel">

        <h3>Semantic → 🧠 Interests</h3>
        <div className="card">
          {memory.topics.map((t, i) => (
            <span key={i} className="tag">{t}</span>
          ))}
        </div>

        <h3>Episodic → 🧍 Personal Info</h3>
        <div className="card">
          {memory.facts.map((f, i) => (
            <p key={i}>{f}</p>
          ))}
        </div>

      <h3>🔍 Context Memory</h3>
<div className="card">
  {memory.vectors.slice(-3).map((v, i) => (
    <p key={i}>{v}</p>
  ))}
</div>

<h3>⚙️ Procedural Memory</h3>
<div className="card">
  <p>Stores interaction patterns and improves responses over time</p>
</div>

      </div>

    </div>
  );
}

export default App;