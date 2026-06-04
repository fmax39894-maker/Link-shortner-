import { db } from "./firebase-config.js";

import {
doc,
setDoc,
getDoc,
getDocs,
deleteDoc,
collection
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const PASSWORD = "aeroshots is best";

const urlInput =
document.getElementById("url");

const result =
document.getElementById("result");

function makeCode(){

const chars =
"ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

let code="";

for(let i=0;i<3;i++){

code += chars[
Math.floor(
Math.random()*chars.length
)
];

}

return code;

}

async function cleanExpired(){

const snap =
await getDocs(
collection(db,"links")
);

const now = Date.now();

for(const d of snap.docs){

const data = d.data();

if(now > data.expireAt){

await deleteDoc(
doc(db,"links",d.id)
);

}

}

}

cleanExpired();

document
.getElementById("createBtn")
.onclick = async ()=>{

const longUrl =
urlInput.value.trim();

if(!longUrl){
alert("Enter URL");
return;
}

const pass =
prompt("Password");

if(pass !== PASSWORD){
alert("Wrong password");
return;
}

let code = makeCode();

await setDoc(
doc(db,"links",code),
{
url:longUrl,
createdAt:Date.now(),
expireAt:
Date.now() +
30*24*60*60*1000
}
);

const shortLink =
location.origin +
"/?go=" +
code;

result.innerHTML =

`<a href="${shortLink}">
${shortLink}
</a>`;

};

document
.getElementById("deleteAll")
.onclick = async ()=>{

const pass =
prompt("Admin Password");

if(pass !== PASSWORD){
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

alert("Deleted");

};

const params =
new URLSearchParams(
location.search
);

const go =
params.get("go");

if(go){

const ref =
await getDoc(
doc(db,"links",go)
);

if(ref.exists()){

window.location.href =
ref.data().url;

}

}