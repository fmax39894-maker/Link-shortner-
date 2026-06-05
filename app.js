import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  increment,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Redirect logic
const code = window.location.pathname.slice(1);

if (code && code !== "index.html") {
  redirectLink(code);
}

async function redirectLink(code) {

  const q = query(
    collection(db, "links"),
    where("code", "==", code)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    document.body.innerHTML =
      "<h2>Link not found</h2>";
    return;
  }

  const docRef = snap.docs[0];

  await updateDoc(docRef.ref, {
    clicks: increment(1)
  });

  const data = docRef.data();

  window.location.href = data.url;
}

window.createLink = async function () {

  const longUrl =
    document.getElementById("longUrl").value.trim();

  if (!longUrl) {
    alert("Enter URL");
    return;
  }

  let code =
    Math.random()
      .toString(36)
      .substring(2, 8);

  await addDoc(
    collection(db, "links"),
    {
      code,
      url: longUrl,
      clicks: 0,
      createdAt: Date.now()
    }
  );

  const shortLink =
    `${window.location.origin}/${code}`;

  document.getElementById("result").innerHTML =
    `
    <input
      value="${shortLink}"
      readonly
      style="width:100%;padding:10px"
    >
    `;
};