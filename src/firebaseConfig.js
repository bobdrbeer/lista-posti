import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "LA_TUA_API_KEY",
  authDomain: "IL_TUO_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://IL_TUO_PROJECT_ID.firebaseio.com",
  projectId: "IL_TUO_PROJECT_ID",
  storageBucket: "IL_TUO_PROJECT_ID.appspot.com",
  messagingSenderId: "IL_TUO_MESSAGING_SENDER_ID",
  appId: "IL_TUO_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };