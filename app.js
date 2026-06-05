import { db } from "./firebase-config.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_CODE =
"CRAFTXFF2026";

window.createLink = async () => {

const url =
document.getElementById("longUrl").value;

if(!url){
alert("Enter URL");
return;
}

const pass =
prompt("Enter password");

if(pass !== "1234"){
alert("Wrong Password");
return;
}

let code =
document.getElementById("customCode").value;

if(!code){
code =
Math.random()
.toString(36)
.substring(2,8);
}

await addDoc(
collection(db,"links"),
{
url,
code,
clicks:0,
createdAt:Date.now()
}
);

document.getElementById("result")
.innerHTML =
`https://yourdomain.com/${code}`;
};

window.openAdmin = async () => {

const code =
prompt("Admin Secret");

if(code !== ADMIN_CODE){
alert("Invalid");
return;
}

const snap =
await getDocs(
collection(db,"links")
);

for(const d of snap.docs){
await deleteDoc(
doc(db,"links",d.id)
);
}

alert("All Links Deleted");
};