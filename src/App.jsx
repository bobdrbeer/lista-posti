// src/App.jsx
import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { ref, push, onValue } from "firebase/database";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  // 🔹 Carica i dati da Firebase all'avvio
  useEffect(() => {
    const itemsRef = ref(database, "items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedItems = data ? Object.values(data) : [];
      setItems(loadedItems);
    });
  }, []);

  // 🔹 Aggiunge un nuovo elemento
  const handleAdd = () => {
    if (input.trim() === "") return;
    const itemsRef = ref(database, "items");
    push(itemsRef, input);
    setInput("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📍 Lista dei posti</h1>
      
      <div style={{ marginBottom: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aggiungi un posto"
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Aggiungi
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
