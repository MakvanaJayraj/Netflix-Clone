import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBBInIOh0OnAHdeAr2jezY2ZGwfzmd-UKI",
  authDomain: "netflix-clone-c52c6.firebaseapp.com",
  projectId: "netflix-clone-c52c6",
  storageBucket: "netflix-clone-c52c6.firebasestorage.app",
  messagingSenderId: "63599924240",
  appId: "1:63599924240:web:26686617eb8cff68332695"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
try {
   const res = await createUserWithEmailAndPassword(auth,email,password);
   const user = res.user;
   await addDoc(collection(db,'user'),{
    uid:user.uid,
    name,
    authProvider:'local',
    email,
   });
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" ")); 
}
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
}

const logout = ()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};