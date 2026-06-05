import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDmwP2JO7r03EhYBFYjxeDhVsW95RksVmk",
  authDomain: "shortner-ad4c6.firebaseapp.com",
  databaseURL: "https://shortner-ad4c6-default-rtdb.firebaseio.com",
  projectId: "shortner-ad4c6",
  storageBucket: "shortner-ad4c6.firebasestorage.app",
  messagingSenderId: "155714841542",
  appId: "1:155714841542:web:d4a0a9f2fd0a26c47360c7",

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);