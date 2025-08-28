// src/App.jsx
import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { ref, push, onValue } from "firebase/database";

function App() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["Toscana", "Lazio", "Italia estera"]);
  const [selectedFilter, setSelectedFilter] = useState("");

  // 🔹 Carica i posti da Firebase in tempo reale
  useEffect(() => {
    const itemsRef = ref(database, "items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedItems = data ? Object.values(data) : [];
      setItems(loadedItems);
    });
  }, []);

  // 🔹 Aggiunge un nuovo posto
  const handleAdd = () => {
    if (!input || !category) return;
    const itemsRef = ref(database, "items");
    push(itemsRef, { name: input, category });
    if (!categories.includes(category)) setCategories([...categories, category]);
    setInput("");
    setCategory("");
  };

  // 🔹 Aggiunge una nuova categoria dinamica
  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // 🔹 Filtra i posti in base alla categoria
  const filteredItems = selectedFilter
    ? items.filter((item) => item.category === selectedFilter)
    : items;

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>📍 Lista dei posti</h1>

      {/* Input nuovo posto */}
      <div style={{ marginBottom: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nome luogo"
          style={{ padding: 8, marginRight: 10 }}
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
          style={{ padding: 8, marginRight: 10 }}
        />

        <button onClick={handleAdd} style={{ padding: 8, marginRight: 10 }}>
          Aggiungi posto
        </button>
        <button onClick={handleAddCategory} style={{ padding: 8 }}>
          Aggiungi categoria
        </button>
      </div>

      {/* Filtro */}
      <div style={{ marginBottom: 20 }}>
        <label>Filtra per categoria: </label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="">Tutte</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Lista posti */}
      <ul>
        {filteredItems.map((item, i) => (
          <li key={i}>
            {item.name} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
