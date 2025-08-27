// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBhIurUf6-cFTq9toA11V8ss8W80yXWA4c",

  authDomain: "lista-posti.firebaseapp.com",

  projectId: "lista-posti",

  storageBucket: "lista-posti.firebasestorage.app",

  messagingSenderId: "205182260418",

  appId: "1:205182260418:web:cf1d8b0e60727be1ac575b"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

import { database } from "./firebaseConfig";
import { ref, push, onValue } from "firebase/database";