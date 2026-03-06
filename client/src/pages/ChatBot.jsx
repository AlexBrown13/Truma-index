import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";

// -----------------------------
//   API FUNCTIONS — IN FILE
// -----------------------------

async function sendMessage(userId, conversationId, text) {
  const res = await fetch(`http://localhost:8000/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, conversationId, text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

// -----------------------------
//    GENERATE USER ID LOCALLY
// -----------------------------
function getUserId() {
  let id = localStorage.getItem("pcl5_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("pcl5_user_id", id);
  }
  return id;
}

// -----------------------------
//            ChatBot
// -----------------------------
export default function ChatBot() {
  const userId = getUserId();
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([
    { role: "bot", text: "שלום. אפשר להתחיל לענות על השאלון." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const listRef = useRef(null);

  // scroll
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // send message
  async function onSend() {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await sendMessage(userId, conversationId, text);
      setMessages((prev) => [...prev, { role: "bot", text: res.message }]);
      if (!conversationId) {
        setConversationId(res.conversationId);
      }
      setDone(res.done);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "שגיאה בשליחה. נסה/י שוב." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <h2>שאלון PCL-5 בשיחה חופשית</h2>

        <div className="chat">
          <div className="messages" ref={listRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="inputRow">
            <input
              type="text"
              placeholder="כתוב/כתבי תשובה..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              disabled={loading || done}
            />

            <button
              onClick={onSend}
              disabled={loading || done || !input.trim()}
            >
              שליחה
            </button>
          </div>
        </div>
      </div>
    </>
  );
}




// import { useState, useEffect, useRef } from "react";

// function PclAssessment() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sessionId, setSessionId] = useState(null);
//   const [finished, setFinished] = useState(false);

//   const bottomRef = useRef(null);

//   useEffect(() => {
//     startConversation();
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const startConversation = async () => {
//     const res = await fetch("http://localhost:5500/start", {
//       method: "POST",
//     });

//     const data = await res.json();
//     console.log("data start", data);
//     setSessionId(data.session_id);

//     setMessages([
//       {
//         role: "bot",
//         text: data.message,
//       },
//     ]);
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || finished) return;

//     const userMessage = input;
//     setInput("");

//     setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

//     try {
//       const res = await fetch("http://localhost:5500/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           answer: userMessage,
//         }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [...prev, { role: "bot", text: data.message }]);

//       if (!data.done && data.next_question) {
//         setTimeout(() => {
//           setMessages((prev) => [
//             ...prev,
//             {
//               role: "bot",
//               text: data.next_question,
//             },
//           ]);
//         }, 600);
//       }

//       if (data.done) {
//         setFinished(true);
//       }
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "אירעה שגיאה בחיבור לשרת",
//         },
//       ]);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={{ textAlign: "center" }}>שיחה בנושא טראומה</h2>

//       <div style={styles.chatBox}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={msg.role === "user" ? styles.userMessage : styles.botMessage}
//           >
//             {msg.text}
//           </div>
//         ))}

//         <div ref={bottomRef} />
//       </div>

//       {!finished && (
//         <div style={styles.inputArea}>
//           <button style={styles.button} onClick={sendMessage}>
//             שלח
//           </button>

//           <input
//             style={styles.input}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="כתוב כאן..."
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "40px auto",
//     fontFamily: "Arial",
//   },

//   chatBox: {
//     height: "500px",
//     overflowY: "auto",
//     border: "1px solid #ccc",
//     padding: "15px",
//     borderRadius: "10px",
//     marginBottom: "10px",
//     background: "#fafafa",
//   },

//   userMessage: {
//     textAlign: "right",
//     marginBottom: "10px",
//     background: "#DCF8C6",
//     padding: "10px 14px",
//     borderRadius: "15px",
//     maxWidth: "70%",
//     marginLeft: "auto",
//   },

//   botMessage: {
//     textAlign: "right",
//     marginBottom: "10px",
//     background: "#F1F0F0",
//     padding: "10px 14px",
//     borderRadius: "15px",
//     maxWidth: "70%",
//   },

//   inputArea: {
//     display: "flex",
//     gap: "10px",
//   },

//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "10px",
//     border: "1px solid #ccc",
//     direction: "rtl",
//   },

//   button: {
//     padding: "10px 20px",
//     borderRadius: "10px",
//     border: "none",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     cursor: "pointer",
//   },
// };

// export default PclAssessment;
