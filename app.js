import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const CREATE_PASSWORD='create123';
const ADMIN_PASSWORD='admin123';

const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

function code(){
 const chars='ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
 let s='';
 for(let i=0;i<5;i++) s+=chars[Math.floor(Math.random()*chars.length)];
 return s;
}

async function uniqueCode(){
 let c;
 do{ c=code(); } while((await getDoc(doc(db,'links',c))).exists());
 return c;
}

document.getElementById('createBtn').onclick=async()=>{
 const url=document.getElementById('url').value.trim();
 if(!url) return alert('Enter URL');
 if(prompt('Create Password')!==CREATE_PASSWORD) return;
 const id=await uniqueCode();
 await setDoc(doc(db,'links',id),{
   url,
   expireAt: Date.now()+30*24*60*60*1000
 });
 const link=location.origin+'/?go='+id;
 document.getElementById('result').innerHTML=`<b>${link}</b><br><button onclick="navigator.clipboard.writeText('${link}')">Copy</button>`;
};

document.getElementById('deleteAll').onclick=async()=>{
 if(prompt('Admin Password')!==ADMIN_PASSWORD) return;
 const snap=await getDocs(collection(db,'links'));
 for(const d of snap.docs) await deleteDoc(doc(db,'links',d.id));
 alert('Deleted');
};

const go=new URLSearchParams(location.search).get('go');
if(go){
 const ref=await getDoc(doc(db,'links',go));
 if(ref.exists()) location.href=ref.data().url;
}
