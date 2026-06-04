import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDn9YUbhmjtjMWfMhZwm-t0h4hpRoIWb7o",
  authDomain: "shortner-b4523.firebaseapp.com",
  projectId: "shortner-b4523",
  storageBucket: "shortner-b4523.firebasestorage.app",
  messagingSenderId: "372535207637",
  appId: "1:372535207637:web:46510f9a25109c7164645c",

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);