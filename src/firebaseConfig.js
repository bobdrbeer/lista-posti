// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "LA_TUA_API_KEY",
  authDomain: "IL_TUO_PROGETTO.firebaseapp.com",
  databaseURL: "https://IL_TUO_PROGETTO.firebaseio.com",
  projectId: "IL_TUO_PROGETTO",
  storageBucket: "IL_TUO_PROGETTO.appspot.com",
  messagingSenderId: "IL_TUO_SENDER_ID",
  appId: "IL_TUO_APP_ID"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni il database
export const database = getDatabase(app);
