import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { firebaseConfig } from "./credenciales.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"


const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);