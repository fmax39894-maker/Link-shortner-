
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore,doc,setDoc,getDoc,getDocs,deleteDoc,collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const CREATE_PASSWORD='create123';
const ADMIN_PASSWORD='admin123';

const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

function randomCode(){
 const chars='ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
 let s='';
 for(let i=0;i<5;i++) s+=chars[Math.floor(Math.random()*chars.length)];
 return s;
}

async function getUnique(){
 let id;
 do{id=randomCode();}
 while((await getDoc(doc(db,'links',id))).exists());
 return id;
}

async function cleanup(){
 const snap=await getDocs(collection(db,'links'));
 const now=Date.now();
 for(const d of snap.docs){
  const data=d.data();
  if(data.expireAt && now>data.expireAt){
   await deleteDoc(doc(db,'links',d.id));
  }
 }
}
cleanup();

createBtn.onclick=async()=>{
 const url=document.getElementById('url').value.trim();
 if(!url) return alert('Enter URL');
 if(prompt('Creator Password')!==CREATE_PASSWORD) return;
 status.textContent='Creating...';
 const id=await getUnique();
 await setDoc(doc(db,'links',id),{
   url:url,
   createdAt:Date.now(),
   expireAt:Date.now()+30*24*60*60*1000
 });
 const shortUrl=location.origin+'/?go='+id;
 result.innerHTML=`<b>${shortUrl}</b><br><button id="copyBtn">Copy Link</button>`;
 document.getElementById('copyBtn').onclick=()=>navigator.clipboard.writeText(shortUrl);
 status.textContent='Done';
};

adminBtn.onclick=async()=>{
 if(prompt('Admin Password')!==ADMIN_PASSWORD) return;
 const snap=await getDocs(collection(db,'links'));
 for(const d of snap.docs){
   await deleteDoc(doc(db,'links',d.id));
 }
 alert('All links deleted');
};

const code=new URLSearchParams(location.search).get('go');
if(code){
 const ref=await getDoc(doc(db,'links',code));
 if(ref.exists()) location.href=ref.data().url;
 document.body.innerHTML='<h2 style="color:white">Link not found or expired</h2>';
}
