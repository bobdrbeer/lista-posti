// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 🔹 Inserisci qui le tue credenziali Firebase
const firebaseConfig = {

  apiKey: "AIzaSyBhIurUf6-cFTq9toA11V8ss8W80yXWA4c",

  authDomain: "lista-posti.firebaseapp.com",

  databaseURL: "https://lista-posti-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "lista-posti",

  storageBucket: "lista-posti.firebasestorage.app",

  messagingSenderId: "205182260418",

  appId: "1:205182260418:web:cf1d8b0e60727be1ac575b"

};


// 🔹 Inizializza Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Esporta il database
export const database = getDatabase(app);