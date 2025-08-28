import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { ref, push, onValue } from "firebase/database";

function App() {
  const [posti, setPosti] = useState([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorie, setCategorie] = useState([
    "Toscana - Firenze",
    "Toscana - Siena",
    "Lazio - Roma",
    "Extra Italia"
  ]);
  const [nuovaCategoria, setNuovaCategoria] = useState("");
  const [filtro, setFiltro] = useState("");

  // Legge i posti dal database in tempo reale
  useEffect(() => {
    const postiRef = ref(database, "posti");
    onValue(postiRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.values(data);
        setPosti(lista);
      } else {
        setPosti([]);
      }
    });
  }, []);

  // Aggiunge un nuovo posto
  const aggiungiPosto = () => {
    if (nome && categoria) {
      const postiRef = ref(database, "posti");
      push(postiRef, { nome, categoria });
      setNome("");
      setCategoria("");
    }
  };

  // Aggiunge una nuova categoria
  const aggiungiCategoria = () => {
    if (nuovaCategoria && !categorie.includes(nuovaCategoria)) {
      setCategorie([...categorie, nuovaCategoria]);
      setNuovaCategoria("");
    }
  };

  const postiFiltrati = filtro ? posti.filter(p => p.categoria === filtro) : posti;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista Posti da Visitare</h1>

      {/* Aggiungi posto */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome posto"
          className="border p-2 mr-2"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <select
          className="border p-2 mr-2"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        >
          <option value="">Seleziona categoria</option>
          {categorie.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={aggiungiPosto} className="bg-blue-500 text-white px-4 py-2">
          Aggiungi
        </button>
      </div>

      {/* Aggiungi categoria */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nuova categoria"
          className="border p-2 mr-2"
          value={nuovaCategoria}
          onChange={e => setNuovaCategoria(e.target.value)}
        />
        <button onClick={aggiungiCategoria} className="bg-green-500 text-white px-4 py-2">
          Aggiungi Categoria
        </button>
      </div>

      {/* Filtro */}
      <div className="mb-4">
        <select
          className="border p-2"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categorie.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Lista posti */}
      <ul className="list-disc pl-5">
        {postiFiltrati.map((p, index) => (
          <li key={index} className="mb-1">{p.nome} - <span className="italic">{p.categoria}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
