import React, { useState, useEffect } from "react";

export default function IdentifyPersona() {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const wellocmeMessage = {
        role: "bot",
        content: "שלום, אני כאן להבין איזה סוג מידע על טראומה מעניין אותך"
    }
    setMessages([wellocmeMessage])
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return;

    // הוספת הודעת המשתמש לממשק
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5500/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationId: conversationId,
        }),
      });

      const data = await response.json();

      console.log("data = ", data);

      // שמירה של conversationId אם חדש
      if (!conversationId) setConversationId(data.conversationId);

      // הוספת תשובת הבוט
      setMessages((prev) => [...prev, { role: "bot", content: data.message }]);

      // אם יש persona + reason, מציגים בסיום השיחה
      if (data.persona) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `פרסונה: ${data.persona}\nסיבה: ${data.reason}`,
          },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>צ'אט על טראומה</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "1rem",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "0.5rem 0" }}>
            <b>
              {msg.role === "user"
                ? "אתה"
                : msg.role === "bot"
                ? "בוט"
                : "מערכת"}
              :
            </b>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="כתוב כאן..."
        style={{ width: "80%", padding: "0.5rem" }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
      >
        שלח
      </button>
    </div>
  );
}
